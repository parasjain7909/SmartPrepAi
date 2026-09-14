const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")
const interviewReportModel = require("../models/interviewReport.model")
const studyPlanModel = require("../models/studyPlan.model")

/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 */
async function registerUserController(req, res) {

    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [ { username }, { email } ]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists with this email address or username"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)


    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}


/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */
async function loginUserController(req, res) {

    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)
    res.status(200).json({
        message: "User loggedIn successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token

    if (token) {
        await tokenBlacklistModel.create({ token })
    }

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })
}

/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access private
 */
async function getMeController(req, res) {

    const user = await userModel.findById(req.user.id)



    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

/**
 * @name getProfileController
 * @description get the current user's profile info along with aggregated stats.
 * @access private
 */
async function getProfileController(req, res) {

    const user = await userModel.findById(req.user.id)

    const [ reportsCount, studyPlans ] = await Promise.all([
        interviewReportModel.countDocuments({ user: req.user.id }),
        studyPlanModel.find({ user: req.user.id }).select("tasks createdAt")
    ])

    const totalTasks = studyPlans.reduce((sum, plan) => sum + plan.tasks.length, 0)
    const completedTasks = studyPlans.reduce((sum, plan) => sum + plan.tasks.filter(t => t.status === "completed").length, 0)
    const overallCompletion = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    res.status(200).json({
        message: "Profile fetched successfully",
        profile: {
            id: user._id,
            username: user.username,
            email: user.email,
            stats: {
                reportsGenerated: reportsCount,
                studyPlansCreated: studyPlans.length,
                totalTasks,
                completedTasks,
                overallCompletion
            }
        }
    })

}


/**
 * @name changePasswordController
 * @description change the current user's password, expects currentPassword and newPassword in the request body.
 * @access private
 */
async function changePasswordController(req, res) {

    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
        return res.status(400).json({
            message: "Please provide current and new password"
        })
    }

    if (newPassword.length < 6) {
        return res.status(400).json({
            message: "New password must be at least 6 characters long"
        })
    }

    const user = await userModel.findById(req.user.id)

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Current password is incorrect"
        })
    }

    const hash = await bcrypt.hash(newPassword, 10)
    user.password = hash
    await user.save()

    res.status(200).json({
        message: "Password changed successfully"
    })

}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController,
    getProfileController,
    changePasswordController
}
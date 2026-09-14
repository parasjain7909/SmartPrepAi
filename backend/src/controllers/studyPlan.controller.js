const studyPlanModel = require("../models/studyPlan.model")
const interviewReportModel = require("../models/interviewReport.model")
const { generateStudyPlan } = require("../services/ai.service")

async function generateStudyPlanController(req, res) {
    const { interviewReportId, targetRole, skillLevel, hoursPerDay, deadlineDays } = req.body

    if (!targetRole || !skillLevel || !hoursPerDay || !deadlineDays) {
        return res.status(400).json({
            message: "targetRole, skillLevel, hoursPerDay and deadlineDays are required."
        })
    }

    if (deadlineDays < 1 || deadlineDays > 90) {
        return res.status(400).json({ message: "deadlineDays must be between 1 and 90." })
    }

    if (hoursPerDay < 1 || hoursPerDay > 16) {
        return res.status(400).json({ message: "hoursPerDay must be between 1 and 16." })
    }

    let missingSkills = []
    let existingSkills = []
    let linkedReport = null

    if (interviewReportId) {
        linkedReport = await interviewReportModel.findOne({ _id: interviewReportId, user: req.user.id })

        if (!linkedReport) {
            return res.status(404).json({ message: "Interview report not found." })
        }

        missingSkills = linkedReport.skillGaps.map(gap => gap.skill)
    }

    let tasks
    try {
        tasks = await generateStudyPlan({
            targetRole,
            skillLevel,
            hoursPerDay,
            deadlineDays,
            existingSkills,
            missingSkills
        })
    } catch (error) {
        return res.status(502).json({
            message: "Failed to generate study plan from AI. Please try again."
        })
    }

    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(startDate.getDate() + Number(deadlineDays))

    const studyPlan = await studyPlanModel.create({
        user: req.user.id,
        interviewReport: linkedReport ? linkedReport._id : undefined,
        targetRole,
        skillLevel,
        hoursPerDay,
        startDate,
        endDate,
        existingSkills,
        missingSkills,
        tasks: tasks.map(t => ({
            title: t.title,
            description: t.description,
            skill: t.skill,
            day: t.day,
            estimatedHours: t.estimatedHours,
            priority: t.priority,
            status: "pending",
            completedAt: null
        }))
    })

    res.status(201).json({
        message: "Study plan generated successfully.",
        studyPlan
    })
}
async function getStudyPlanByIdController(req, res) {
    const { studyPlanId } = req.params

    const studyPlan = await studyPlanModel.findOne({ _id: studyPlanId, user: req.user.id })

    if (!studyPlan) {
        return res.status(404).json({ message: "Study plan not found." })
    }

    res.status(200).json({
        message: "Study plan fetched successfully.",
        studyPlan
    })
}

async function getAllStudyPlansController(req, res) {
    const studyPlans = await studyPlanModel
        .find({ user: req.user.id })
        .sort({ createdAt: -1 })
        .select("targetRole skillLevel hoursPerDay startDate endDate tasks createdAt")

    res.status(200).json({
        message: "Study plans fetched successfully.",
        studyPlans
    })
}

async function toggleTaskStatusController(req, res) {
    const { studyPlanId, taskId } = req.params

    const studyPlan = await studyPlanModel.findOne({ _id: studyPlanId, user: req.user.id })

    if (!studyPlan) {
        return res.status(404).json({ message: "Study plan not found." })
    }

    const task = studyPlan.tasks.id(taskId)

    if (!task) {
        return res.status(404).json({ message: "Task not found in this study plan." })
    }

    if (task.status === "completed") {
        task.status = "pending"
        task.completedAt = null
    } else {
        task.status = "completed"
        task.completedAt = new Date()
    }

    await studyPlan.save()

    res.status(200).json({
        message: "Task status updated successfully.",
        studyPlan
    })
}

module.exports = { generateStudyPlanController, getStudyPlanByIdController, getAllStudyPlansController, toggleTaskStatusController }
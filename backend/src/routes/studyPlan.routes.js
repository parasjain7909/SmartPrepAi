const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const studyPlanController = require("../controllers/studyPlan.controller")

const studyPlanRouter = express.Router()

/**
 * @route POST /api/study-plan/
 * @description generate a new personalized study plan based on target role, skill level, available hours and deadline. Optionally links to an existing interview report to pull missing skills automatically.
 * @access private
 */
studyPlanRouter.post("/", authMiddleware.authUser, studyPlanController.generateStudyPlanController)
/**
 * @route GET /api/study-plan/
 * @description get all study plans of the logged in user.
 * @access private
 */
studyPlanRouter.get("/", authMiddleware.authUser, studyPlanController.getAllStudyPlansController)

/**
 * @route GET /api/study-plan/:studyPlanId
 * @description get a single study plan by id.
 * @access private
 */
studyPlanRouter.get("/:studyPlanId", authMiddleware.authUser, studyPlanController.getStudyPlanByIdController)

/**
 * @route PATCH /api/study-plan/:studyPlanId/task/:taskId
 * @description toggle a task's completion status between pending and completed.
 * @access private
 */
studyPlanRouter.patch("/:studyPlanId/task/:taskId", authMiddleware.authUser, studyPlanController.toggleTaskStatusController)

module.exports = studyPlanRouter
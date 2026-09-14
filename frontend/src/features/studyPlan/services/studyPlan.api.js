import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})


/**
 * @description Service to generate a personalized study plan based on target role, skill level, available hours and deadline.
 */
export const generateStudyPlan = async ({ interviewReportId, targetRole, skillLevel, hoursPerDay, deadlineDays }) => {

    const response = await api.post("/api/study-plan/", {
        interviewReportId,
        targetRole,
        skillLevel,
        hoursPerDay,
        deadlineDays
    })

    return response.data

}
/**
 * @description Service to get a study plan by id.
 */
export const getStudyPlanById = async (studyPlanId) => {
    const response = await api.get(`/api/study-plan/${studyPlanId}`)
    return response.data
}


/**
 * @description Service to get all study plans of the logged in user.
 */
export const getAllStudyPlans = async () => {
    const response = await api.get("/api/study-plan/")
    return response.data
}


/**
 * @description Service to toggle a task's completion status.
 */
export const toggleTaskStatus = async ({ studyPlanId, taskId }) => {
    const response = await api.patch(`/api/study-plan/${studyPlanId}/task/${taskId}`)
    return response.data
}
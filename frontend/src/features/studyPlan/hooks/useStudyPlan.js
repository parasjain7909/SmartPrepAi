import { generateStudyPlan, getStudyPlanById, getAllStudyPlans, toggleTaskStatus } from "../services/studyPlan.api"
import { useContext } from "react"
import { StudyPlanContext } from "../studyPlan.context"


export const useStudyPlan = () => {

    const context = useContext(StudyPlanContext)

    if (!context) {
        throw new Error("useStudyPlan must be used within a StudyPlanProvider")
    }

    const { loading, setLoading, studyPlan, setStudyPlan, studyPlans, setStudyPlans } = context

    const createStudyPlan = async ({ interviewReportId, targetRole, skillLevel, hoursPerDay, deadlineDays }) => {
        setLoading(true)
        let response = null
        try {
            response = await generateStudyPlan({ interviewReportId, targetRole, skillLevel, hoursPerDay, deadlineDays })
            setStudyPlan(response.studyPlan)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return response?.studyPlan
    }

    const getPlanById = async (studyPlanId) => {
        setLoading(true)
        let response = null
        try {
            response = await getStudyPlanById(studyPlanId)
            setStudyPlan(response.studyPlan)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return response?.studyPlan
    }

    const getPlans = async () => {
        setLoading(true)
        let response = null
        try {
            response = await getAllStudyPlans()
            setStudyPlans(response.studyPlans)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return response?.studyPlans
    }

    const toggleTask = async ({ studyPlanId, taskId }) => {
        let response = null
        try {
            response = await toggleTaskStatus({ studyPlanId, taskId })
            setStudyPlan(response.studyPlan)
        } catch (error) {
            console.log(error)
        }
        return response?.studyPlan
    }

    return { loading, studyPlan, studyPlans, createStudyPlan, getPlanById, getPlans, toggleTask }

}
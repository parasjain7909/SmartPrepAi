import { createContext, useState } from "react"

export const StudyPlanContext = createContext(null)

export const StudyPlanProvider = ({ children }) => {
    const [ loading, setLoading ] = useState(false)
    const [ studyPlan, setStudyPlan ] = useState(null)
    const [ studyPlans, setStudyPlans ] = useState([])

    return (
        <StudyPlanContext.Provider value={{ loading, setLoading, studyPlan, setStudyPlan, studyPlans, setStudyPlans }}>
            {children}
        </StudyPlanContext.Provider>
    )
}
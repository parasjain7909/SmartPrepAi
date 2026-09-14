import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/interview.context.jsx"
import { StudyPlanProvider } from "./features/studyPlan/studyPlan.context.jsx"

function App() {

  return (
    <AuthProvider>
      <InterviewProvider>
        <StudyPlanProvider>
          <RouterProvider router={router} />
        </StudyPlanProvider>
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App
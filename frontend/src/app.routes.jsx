import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import Landing from "./features/home/pages/landingPage";
import StudyPlan from "./features/studyPlan/pages/StudyPlan";
import StudyPlanResult from "./features/studyPlan/pages/StudyPlanResult";
import Profile from "./features/auth/pages/Profile";
import AppLayout from "./components/AppLayout";

import Resources from "./features/resource/pages/Resources";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        element: <Protected><AppLayout /></Protected>,
        children: [
            {
                path: "/home",
                element: <Home />
            },
            {
                path: "/interview/:interviewId",
                element: <Interview />
            },
            {
                path: "/study-plan",
                element: <StudyPlan />
            },
            {
                path: "/study-plan/:studyPlanId",
                element: <StudyPlanResult />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
    path: "/resources",
    element: <Resources />
},
        ]
    }
])
import { Routes,Route } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Projects from "../pages/Projects.jsx";
import ProjectDetails from "../pages/ProjectDetails.jsx";
import Tasks from "../pages/Tasks.jsx";
import Profile from "../pages/Profile.jsx";
import NotFound from "../pages/NotFound.jsx";
import TaskDetails from "../pages/TaskDetails.jsx";
import ProjectMembers from "../pages/ProjectMembers.jsx";
import ProjectNotes from "../pages/ProjectNotes.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import VerifyEmail from "../pages/VerifyEmail.jsx";


export default function AppRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
             <Route path="/verify-email/:token" element={<VerifyEmail />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
             <Route path="/projects/:id/members" element={<ProjectMembers />} />
             <Route path="/projects/:id/notes" element={<ProjectNotes />} /> 
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/:id" element={<TaskDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

import Hero from "./pages/Hero";
import Projects from './pages/Projects';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { Route, Routes } from 'react-router-dom';
import ProjectDetail from "./pages/ProjectDetail";
import MentorsPage from "./pages/MentorsPage"
import PremiumPage from "./pages/Premium";
import MentorDetail from "./pages/MentorDetail";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ProtectedRoute from "./pages/ProtectedRoute";






function App() {
  return (

    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/mentors" element={<MentorsPage />} />
      <Route path="/mentor/:id" element={<MentorDetail />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="/premium" element={<PremiumPage />} />
      <Route path="/accounts/login" element={<LoginPage />} />
      <Route path="/accounts/signup" element={<SignupPage />} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />   
      
    </Routes>

  );


}

export default App;

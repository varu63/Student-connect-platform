
import Hero from"./pages/Hero";
import Projects from './pages/Projects';
import Discusspage from './pages/Discusspage'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { Route , Routes } from 'react-router-dom';
import ProjectDetail from "./pages/ProjectDetail";
import MentorsPage from "./pages/MentorsPage"
import Navbar from "./compontes/Navbar";
import Footer from "./compontes/Footer";
import PremiumPage from "./pages/Premium";




function App() {
  return(
    
  <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/mentors" element={<MentorsPage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/premium" element={<PremiumPage/>} />
        <Route path="/accounts/login" element={<LoginPage />} />
        <Route path="/accounts/signup" element={<SignupPage />} />
 
  </Routes>
 
  );
 
  
}

export default App;

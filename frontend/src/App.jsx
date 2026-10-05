import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import all pages
import Home from './pages/Home';
import About from './pages/About';
import Faculty from './pages/Faculty';
import Academics from './pages/Academics';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Achievements from './pages/Achievements';
const AchievementDetail = React.lazy(() => import('./pages/AchievementDetail'));
import Announcements from './pages/Announcements';
import Contact from './pages/Contact';

// Auth & Admin imports
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/admin/Login';
import DashboardLayout from './pages/admin/DashboardLayout';
import DashboardHome from './pages/admin/DashboardHome';
import UserManagement from './pages/admin/UserManagement';
import SettingsManager from './pages/admin/SettingsManager';
import DepartmentManager from './pages/admin/DepartmentManager';

// Lazy load heavy public routes
const Placements = React.lazy(() => import('./pages/Placements'));
const Projects = React.lazy(() => import('./pages/Projects'));
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const Research = React.lazy(() => import('./pages/Research'));
const Alumni = React.lazy(() => import('./pages/Alumni'));
const AlumniDetail = React.lazy(() => import('./pages/AlumniDetail'));
const Downloads = React.lazy(() => import('./pages/Downloads'));

// Lazy load heavy admin routes
const AchievementsManager = React.lazy(() => import('./pages/admin/AchievementsManager'));
const HomeSliderManager = React.lazy(() => import('./pages/admin/HomeSliderManager'));
const FacultyManager = React.lazy(() => import('./pages/admin/FacultyManager'));
const AcademicsManager = React.lazy(() => import('./pages/admin/AcademicsManager'));
const SyllabusManager = React.lazy(() => import('./pages/admin/SyllabusManager'));
const EventsManager = React.lazy(() => import('./pages/admin/EventsManager'));
const ProjectsManager = React.lazy(() => import('./pages/admin/ProjectsManager'));
const AnnouncementsManager = React.lazy(() => import('./pages/admin/AnnouncementsManager'));
const PlacementsManager = React.lazy(() => import('./pages/admin/PlacementsManager'));
const ResearchManager = React.lazy(() => import('./pages/admin/ResearchManager'));
const GalleryManager = React.lazy(() => import('./pages/admin/GalleryManager'));
const AlumniManager = React.lazy(() => import('./pages/admin/AlumniManager'));
const DownloadsManager = React.lazy(() => import('./pages/admin/DownloadsManager'));
const ContactMessagesManager = React.lazy(() => import('./pages/admin/ContactMessagesManager'));
const RecruitersManager = React.lazy(() => import('./pages/admin/RecruitersManager'));

function App() {
  return (
    <AuthProvider>
      <Router>
      <div className="min-h-screen flex flex-col font-sans">
        {/* Only show Navbar for non-admin pages */}
        <Routes>
          <Route path="/admin/*" element={null} />
          <Route path="*" element={<Navbar />} />
        </Routes>
        <main className="flex-grow">
          <React.Suspense fallback={<div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy"></div></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/academics" element={<Academics />} />
              
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/achievements/:id" element={<AchievementDetail />} />
              <Route path="/placements" element={<Placements />} />
              
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/research" element={<Research />} />
              
              <Route path="/alumni" element={<Alumni />} />
              <Route path="/alumni/:id" element={<AlumniDetail />} />
              <Route path="/downloads" element={<Downloads />} />
              
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Admin Login */}
              <Route path="/admin/login" element={<Login />} />
              
              {/* Protected Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                  <Route index element={<DashboardHome />} />
                  <Route path="department" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOD']} />}>
                    <Route index element={<DepartmentManager />} />
                  </Route>
                  <Route path="faculty" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOD']} />}>
                    <Route index element={<FacultyManager />} />
                  </Route>
                  <Route path="academics" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOD']} />}>
                    <Route index element={<AcademicsManager />} />
                  </Route>
                  <Route path="syllabus" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOD', 'FACULTY']} />}>
                    <Route index element={<SyllabusManager />} />
                  </Route>
                  <Route path="events" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOD', 'FACULTY']} />}>
                    <Route index element={<EventsManager />} />
                  </Route>
                  <Route path="projects" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOD', 'FACULTY']} />}>
                    <Route index element={<ProjectsManager />} />
                  </Route>
                  <Route path="announcements" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOD', 'FACULTY']} />}>
                    <Route index element={<AnnouncementsManager />} />
                  </Route>
                  <Route path="placements" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOD']} />}>
                    <Route index element={<PlacementsManager />} />
                  </Route>
                  <Route path="research" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOD', 'FACULTY']} />}>
                    <Route index element={<ResearchManager />} />
                  </Route>
                  <Route path="gallery" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOD', 'FACULTY']} />}>
                    <Route index element={<GalleryManager />} />
                  </Route>
                  <Route path="alumni" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOD']} />}>
                    <Route index element={<AlumniManager />} />
                  </Route>
                  <Route path="downloads" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOD', 'FACULTY']} />}>
                    <Route index element={<DownloadsManager />} />
                  </Route>
                  <Route path="recruiters" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOD']} />}>
                    <Route index element={<RecruitersManager />} />
                  </Route>
                  <Route path="messages" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOD']} />}>
                    <Route index element={<ContactMessagesManager />} />
                  </Route>
                  <Route path="settings" element={<ProtectedRoute requiredRole="SUPER_ADMIN" />}>
                    <Route index element={<SettingsManager />} />
                  </Route>
                  <Route path="achievements" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOD', 'FACULTY']} />}>
                    <Route index element={<AchievementsManager />} />
                  </Route>
                  <Route path="home-slider" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'HOD']} />}>
                    <Route index element={<HomeSliderManager />} />
                  </Route>
                  
                  {/* Super Admin Only */}
                  <Route path="users" element={<ProtectedRoute requiredRole="SUPER_ADMIN" />}>
                    <Route index element={<UserManagement />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </React.Suspense>
        </main>
        {/* Only show Footer for non-admin pages */}
        <Routes>
          <Route path="/admin/*" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;

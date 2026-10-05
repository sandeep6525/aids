import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, Users, BookOpen, Calendar, Award, 
  Briefcase, FolderGit2, Image as ImageIcon, Download, 
  MessageSquare, Settings, LogOut, Menu, X, Book
} from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" />, roles: ['SUPER_ADMIN', 'HOD', 'FACULTY'] },
    { name: 'Department', path: '/admin/department', icon: <BookOpen className="w-5 h-5" />, roles: ['SUPER_ADMIN', 'HOD'] },
    { name: 'Syllabus', path: '/admin/syllabus', icon: <Book className="w-5 h-5" />, roles: ['SUPER_ADMIN', 'HOD', 'FACULTY'] },
    { name: 'Home Slider', path: '/admin/home-slider', icon: <ImageIcon className="w-5 h-5" />, roles: ['SUPER_ADMIN', 'HOD'] },
    { name: 'Faculty', path: '/admin/faculty', icon: <Users className="w-5 h-5" />, roles: ['SUPER_ADMIN', 'HOD'] },
    { name: 'Events', path: '/admin/events', icon: <Calendar className="w-5 h-5" />, roles: ['SUPER_ADMIN', 'HOD', 'FACULTY'] },
    { name: 'Achievements', path: '/admin/achievements', icon: <Award className="w-5 h-5" />, roles: ['SUPER_ADMIN', 'HOD', 'FACULTY'] },
    { name: 'Placements', path: '/admin/placements', icon: <Briefcase className="w-5 h-5" />, roles: ['SUPER_ADMIN', 'HOD'] },
    { name: 'Projects', path: '/admin/projects', icon: <FolderGit2 className="w-5 h-5" />, roles: ['SUPER_ADMIN', 'HOD', 'FACULTY'] },
    { name: 'Gallery', path: '/admin/gallery', icon: <ImageIcon className="w-5 h-5" />, roles: ['SUPER_ADMIN', 'HOD'] },
    { name: 'Downloads', path: '/admin/downloads', icon: <Download className="w-5 h-5" />, roles: ['SUPER_ADMIN', 'HOD'] },
    { name: 'Recruiters', path: '/admin/recruiters', icon: <Briefcase className="w-5 h-5" />, roles: ['SUPER_ADMIN', 'HOD'] },
    { name: 'Messages', path: '/admin/messages', icon: <MessageSquare className="w-5 h-5" />, roles: ['SUPER_ADMIN', 'HOD'] },
    { name: 'Users & Roles', path: '/admin/users', icon: <Users className="w-5 h-5" />, roles: ['SUPER_ADMIN'] },
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" />, roles: ['SUPER_ADMIN'] },
  ];

  const allowedNavItems = navItems.filter(item => item.roles.includes(user?.role));

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-brand-primary text-white">
      <div className="p-6 flex items-center border-b border-navy-light">
        <div className="w-8 h-8 bg-brand-accent rounded flex items-center justify-center text-white font-bold mr-3 shadow">AI</div>
        <div>
          <h2 className="text-lg font-bold leading-tight">Admin Portal</h2>
          <p className="text-xs text-gray-400 capitalize">{user?.role.replace('_', ' ')}</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {allowedNavItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive ? 'bg-brand-accent text-white shadow' : 'text-gray-300 hover:bg-brand-secondary hover:text-white'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-navy-light">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-300 rounded-md hover:bg-red-900/50 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-bg-main">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col w-64">
          <SidebarContent />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <SidebarContent />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="lg:hidden flex items-center justify-between bg-white border-b border-border-subtle px-4 py-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-brand-primary rounded flex items-center justify-center text-brand-accent font-bold mr-3">AI</div>
            <h1 className="text-lg font-bold text-brand-primary">Admin Portal</h1>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-gray-500 hover:text-gray-700">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-bg-main">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

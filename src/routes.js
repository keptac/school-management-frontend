import { Navigate } from 'react-router-dom';
import StudentDashboardLayout from 'src/components/student/StudentDashboardLayout';

import MainLayout from 'src/components/MainLayout';

// Pages
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import Register from 'src/pages/Register';

import TeacherDashboardLayout from 'src/components/teacher/TeacherDashboardLayout';
import TeacherDashboard from 'src/pages/teacher/TeacherDashboard';

import Account from 'src/pages/student/Account';
import Chat from 'src/pages/student/Chat';
import Dashboard from 'src/pages/student/Dashboard';
import Library from 'src/pages/student/Library';
import VirtualClass from 'src/pages/student/VirtualClass';
import ProgressReport from './pages/teacher/ProgressReport';
import AddTeacherClass from './pages/teacher/TeacherClasses';

import SubjectContent from './pages/student/SubjectContent';

import SchoolAdminDashboardLayout from './components/schoolAdmin/SchoolAdminLayout';
import AdminDashboard from './pages/schooladmin/Dashboard';
import AddSubject from './pages/schooladmin/Subjects';
import AddStudents from './pages/schooladmin/Students';
import AddClass from './pages/schooladmin/Classes';
import AddNotice from './pages/schooladmin/NoticeBoard';
import StaffLogin from './pages/StaffLogin';
import NewStudentRegister from './pages/NewStudentRegister';
import PaymentClass from './pages/schooladmin/Payments';
import TeacherSubjectDetails from './pages/teacher/SubjectDetails';
import ReportingDashboard from './pages/teacher/ReportingDashboard';
import TeachingResources from './pages/teacher/TeachingResources';
import StudentWork from './pages/teacher/StudentWork';
import TeacherVirtualClass from './pages/teacher/TeacherVirtualClass';

const routes = [
  // Student Routes
  {
    path: 'student',
    element: <StudentDashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'chat', element: <Chat /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'library', element: <Library /> },
      { path: 'virtual-class', element: <VirtualClass /> },
      { path: 'subject', element: <SubjectContent /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },

  // Teacher Routes
  {
    path: 'teacher',
    element: <TeacherDashboardLayout />,
    children: [
      { path: 'dashboard', element: <TeacherDashboard /> },
      { path: 'reporting', element: <ReportingDashboard /> },
      { path: 'report', element: <ProgressReport /> },
      { path: 'classes', element: <AddTeacherClass /> },
      { path: 'teaching-resources', element: <TeachingResources /> },
      { path: 'student-work', element: <StudentWork /> },
      { path: 'subject-student-records', element: <TeacherSubjectDetails /> },
      { path: 'virtual-classes', element: <TeacherVirtualClass /> },
      { path: 'virtual-classroom', element: <TeacherSubjectDetails /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },

  // School Admin Routes
  {
    path: 'school-admin',
    element: <SchoolAdminDashboardLayout />,
    children: [
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'subjects', element: <AddSubject /> },
      { path: 'classes', element: <AddClass /> },
      { path: 'students', element: <AddStudents /> },
      { path: 'tuition', element: <PaymentClass /> },
      { path: 'notices', element: <AddNotice /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },

  // Default Routes
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'staff', element: <StaffLogin /> },
      { path: 'register', element: <Register /> },
      { path: 'new-registration', element: <NewStudentRegister /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/staff" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;

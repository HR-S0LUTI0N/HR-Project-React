import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import AdminDashboardLayout from './layouts/admin_dashboard';
import ManagerDashboardLayout from './layouts/manager_dashboard';
import PersonnelDashboardLayout from './layouts/personnel_dashboard';
import FounderDashboardLayout from './layouts/founder_dashboard';
import SimpleLayout from './layouts/simple';

import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ForgotPasswordSuccesful from './pages/ForgotPassword/ForgotPasswordSuccesful';
import RegisterSuccesful from './pages/RegisterSuccesful';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/PersonnelPage/DashboardAppPage';
import SignUp from './pages/SignUp';
import VisitorMainPage from './pages/Visitor-Main-Page/Home';
import DashboardAppPageDefault from './pages/ManagerPage/DashboardAppPageDefault';
import CompanyDetailPage from './pages/Visitor-Company-Detail-Page/CompanyDetailPage';
import RegisterVisitor from './pages/registerVisitor';
import RegisterManager from './pages/registerManager';
import UserProfile from './pages/userprofile';
import AddPersonelPage from './pages/AddPersonel/AddPersonePage';
import Admin from './pages/Admin/admin';


import AddCompanyPage from './pages/AddCompany/AddCompanyPage'
import ForgotPasswordChange from './pages/ForgotPasswordChange'
import ConfirmManager from './pages/ConfirmManager'
import ForgotPasswordReplace from './pages/ForgotPasswordReplace'
import ManagerBuyoutPage from './pages/ManagerBuyoutPage'
import PermissionRequest from './pages/PersonnelPage/PermissionRequest';
import AddExpensePage from './pages/AddExpense/AddExpensePage'
import AddManagerPage from './pages/AddManager/AddManagerPage';
import ExpenseConfirmationPage from './pages/ExpenseConfirmationPage/ExpenseConfirmationPage';



export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'default-app', element: <DashboardAppPageDefault /> },
        { path: 'registerManager', element: <RegisterManager /> },
        { path: 'registerVisitor', element: <RegisterVisitor /> },
        { path: 'profile', element: <UserPage /> },
        { path: 'userProfile', element: <UserProfile /> },
        { path: 'add-personnel', element: <AddPersonelPage /> },
        { path: 'add-company', element: <AddCompanyPage /> },
        { path: 'admin', element: <Admin /> },
        { path: 'expense-demand', element: <AddExpensePage /> },
      ],
    },
    {
      path: '/admin',
      element: <AdminDashboardLayout />,
      children: [
        { element: <Navigate to="/admin/control" />, index: true },
        { path: 'add-company', element: <AddCompanyPage /> },
        { path: 'panel', element: <Admin /> },
      ],
    },
    {
      path: '/manager',
      element: <ManagerDashboardLayout />,
      children: [
        { element: <Navigate to="/manager/panel" />, index: true },
        { path: 'add-personnel', element: <AddPersonelPage /> },
        { path: 'personnel/panel', element: <DashboardAppPage /> },
        { path: 'panel', element: <DashboardAppPageDefault /> },
        { path: 'userprofile', element: <UserProfile /> },
        { path: 'expense-demand', element: <AddExpensePage /> },
        { path: 'expense-confirmation-page', element: <ExpenseConfirmationPage /> }
      ],
    },
    {
      path: '/personnel',
      element: <PersonnelDashboardLayout />,
      children: [
        { element: <Navigate to="/personnel/panel" />, index: true },
        { path: 'panel', element: <DashboardAppPage /> },
        { path: 'userprofile', element: <UserProfile /> },
        { path: 'permission-request', element: <PermissionRequest /> },
        { path: 'expense-demand', element: <AddExpensePage /> },
      ],
    },
    {
      path: '/founder',
      element: <FounderDashboardLayout />,
      children: [
        { element: <Navigate to="/founder/panel" />, index: true },
        { path: 'add-personnel', element: <AddPersonelPage /> },
        { path: 'add-manager', element: <AddManagerPage /> },
        { path: 'personnel/panel', element: <DashboardAppPage /> },
        { path: 'panel', element: <DashboardAppPageDefault /> },
        { path: 'userprofile', element: <UserProfile /> },
        { path: 'expense-confirmation-page', element: <ExpenseConfirmationPage /> }
      ],
    },
    {
      path: 'visitor',
      element: <VisitorMainPage />,
    },
    {
      path: 'company',
      element: <CompanyDetailPage />,
    },
    {
      path: 'sign-up',
      element: <SignUp />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'forgotpassword',
      element: <ForgotPassword />,
    },
    {
      path: 'forgotpasswordsuccesful',
      element: <ForgotPasswordSuccesful />,
    },
    {
      path: 'register-succesful',
      element: <RegisterSuccesful />,
    },
    {
      path: 'registerVisitor',
      element: <RegisterVisitor />,
    },
    {
      path: 'registerManager',
      element: <RegisterManager />,
    },
    {
      path: 'userProfile',
      element: <UserProfile />,
    },
    {
      path: 'admin',
      element: <Admin />,
    },
    {
      path: 'forgotpassword-notification',
      element: <ForgotPasswordChange />,
    },
    {
      path: 'confirm-manager',
      element: <ConfirmManager />,
    },
    {
      path: 'forgotpassword-replace/:token',
      element: <ForgotPasswordReplace />,
    },
    {
      path: 'company-buyout-page',
      element: <ManagerBuyoutPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

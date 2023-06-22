import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ForgotPasswordSuccesful from './pages/ForgotPassword/ForgotPasswordSuccesful'
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
import AddPersonelPage from './pages/AddPersonel/AddPersonePage'
import Admin from './pages/Admin/admin';
import AddCompanyPage from './pages/AddCompany/AddCompanyPage'
import ForgotPasswordChange from './pages/ForgotPasswordChange'

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
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'userProfile', element: <UserProfile /> },
        { path: 'add-personnel', element: <AddPersonelPage /> },
        { path: 'add-company', element: <AddCompanyPage /> },
        { path: 'admin', element: <Admin /> },
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
      element: <ForgotPasswordChange />
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

import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import SignUp from './pages/SignUp';
import VisitorMainPage from './pages/Visitor-Main-Page/Home';
import DashboardAppPageDefault from './pages/DashboardAppPageDefault';
import RegisterVisitor from './pages/registerVisitor';
import RegisterManager from './pages/registerManager';
import UserProfile from './pages/userprofile';
// ----------------------------------------------------------------------

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
      ],
    },
    {
      path: 'visitor',
      element: <VisitorMainPage />,
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
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
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

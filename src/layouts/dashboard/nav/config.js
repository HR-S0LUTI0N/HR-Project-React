// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Personnel',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Manager',
    path: '/dashboard/default-app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Add Personnel',
    path: '/dashboard/add-personnel',
    icon: icon('ic_user'),
  },
  {
    title: 'Add Company',
    path: '/dashboard/add-company',
    icon: icon('ic_user'),
  },
  {
    title: 'userProfile',
    path: '/dashboard/userProfile',
    icon: icon('ic_user'),
  },

  {
    title: 'admin',
    path: '/dashboard/admin',
    icon: icon('ic_blog'),
  },
];

export default navConfig;

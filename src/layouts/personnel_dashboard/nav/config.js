// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Personnel',
    path: '/personnel/panel',
    icon: icon('ic_user'),
  },
  {
    title: 'Permission Request',
    path: '/personnel/permission-request',
    icon: icon('ic_user'),
  },
];

export default navConfig;

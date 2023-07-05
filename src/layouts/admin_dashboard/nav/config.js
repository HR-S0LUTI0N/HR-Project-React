// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Add Company',
    path: '/admin/add-company',
    icon: icon('ic_addcompany'),
  },
  {
    title: 'admin',
    path: '/admin/panel',
    icon: icon('ic_admin'),
  },
];

export default navConfig;

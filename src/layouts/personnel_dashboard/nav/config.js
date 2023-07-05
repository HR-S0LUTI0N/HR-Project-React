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
    title: 'Advance Request',
    path: '/personnel/advancerequest',
    icon: icon('ic_advancerequest'),
  },
  {
    title: 'Permission Request',
    path: '/personnel/permission-request',
    icon: icon('ic_permissionrequest'),
  },
  {
    title: 'Expense Demand',
    path: '/personnel/expense-demand',
    icon: icon('ic_expense'),
  },

];

export default navConfig;

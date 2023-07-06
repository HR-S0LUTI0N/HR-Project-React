// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Personnel',
    path: '/manager/personnel/panel',
    icon: icon('ic_personnel'),
  },
  {
    title: 'Manager',
    path: '/manager/panel',
    icon: icon('ic_manager'),
  },
  {
    title: 'Add Personnel',
    path: '/manager/add-personnel',
    icon: icon('ic_addpersonnel'),
  },
  {
    title: 'Advance Request',
    path: '/manager/advancerequest',
    icon: icon('ic_advancerequest'),
  },
  {
    title: 'Expense Request',
    path: '/manager/expense-demand',
    icon: icon('ic_expense'),
  },
  {
    title: 'Day Off Request',
    path: '/manager/permission-request',
    icon: icon('ic_permissionrequest'),
  },
  {
    title: 'Confirm Advance',
    path: '/manager/advance-confirmation-page',
    icon: icon('ic_confirmadvance'),
  },

  {
    title: 'Confirm Expense',
    path: '/manager/expense-confirmation-page',
    icon: icon('ic_confirmexpense'),
  },
  {
    title: 'Confirm Day Off',
    path: '/manager/day-off-permission',
    icon: icon('ic_dayoff'),

  },
];

export default navConfig;

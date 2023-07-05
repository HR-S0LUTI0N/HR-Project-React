// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Personnel',
    path: '/founder/personnel/panel',
    icon: icon('ic_user'),
  },
  {
    title: 'Manager',
    path: '/founder/panel',
    icon: icon('ic_manager'),
  },
  {
    title: 'Add Personnel',
    path: '/founder/add-personnel',
    icon: icon('ic_addpersonnel'),
  },
  {
    title: 'Add Manager',
    path: '/founder/add-manager',
    icon: icon('ic_addmanager'),
  },
  {
    title: 'Advance Request',
    path: '/founder/advancerequest',
    icon: icon('ic_user'),
  },
  {
    title: 'Expense Demand',
    path: '/founder/expense-demand',
    icon: icon('ic_expense'),
  },
  {
    title: 'Confirm Expense',
    path: '/founder/expense-confirmation-page',
    icon: icon('ic_confirmexpense'),
  },
  {
    title: 'Confirm Advance',
    path: '/founder/advance-confirmation-page',
    icon: icon('ic_confirmadvance'),
  },
  {
    title: 'Day Off Permission',
    path: '/founder/day-off-permission',
    icon: icon('ic_dayoff'),
  },
];

export default navConfig;

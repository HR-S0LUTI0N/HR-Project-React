// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Personnel',
    path: '/manager/personnel/panel',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Manager',
    path: '/manager/panel',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Add Personnel',
    path: '/manager/add-personnel',
    icon: icon('ic_user'),
  },
  {
    title: 'Expense Demand',
    path: '/personnel/expense-demand',
    icon: icon('ic_expense'),
  },
];

export default navConfig;

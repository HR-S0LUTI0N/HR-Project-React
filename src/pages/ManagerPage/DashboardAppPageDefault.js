import React, { useState } from 'react';
import axios from 'axios';

import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Table,
  Container,
  Typography,
  Card,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  IconButton,
  TableRow,
  Avatar,
  TableHead,
  Paper,
  Stack,
  Box,
} from '@mui/material';
// components
import ManagerPersonnelTable from './ManagerPersonnelTable';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,

} from '../../sections/@dashboard/app';
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'avatar', label: 'Avatar', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'salary', label: 'Salary', alignRight: false },
  { id: 'salaryDate', label: 'Salary Date', alignRight: false },
  { id: 'remainingDayOff', label: 'Remaining Day Off', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function DashboardAppPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');
  const [managerData, setManagerData] = useState('');
  const [personnelDatas, setPersonnelDatas] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const token = sessionStorage.getItem('token');

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(`http://localhost:9070/api/v1/company/get-manager-dashboard-information/${token}`);
        const data1 = response1.data;
        setManagerData(data1);
      } catch (error) {
        console.log('Error', error);
      }
    };

    fetchData();
  }, []);




  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };



  const theme = useTheme();

  const columns = [
    { id: 'name', label: 'Name', align: 'center', },
    { id: 'company', label: 'Company' },
    { id: 'role', label: 'Role' },
    { id: 'salary', label: 'Salary' },
    { id: 'salaryDate', label: 'Salary Date' },
    { id: 'remainingDayOff', label: 'Remaining Day Off' },
    { id: 'verified', label: 'Date Of Birth' },
    { id: 'status', label: 'Status' },

  ];

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome Manager
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Company Name"
              total={managerData === undefined || managerData.companyName === null ?
                "" : `${managerData.companyName} ${managerData.title}`} icon={'mdi:company'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Personnel Count" total={managerData === undefined || managerData.companyPersonnelCount === null ?
              "" : `${managerData.companyPersonnelCount}`} color="info" icon={'clarity:employee-group-solid'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Sector" total={managerData === undefined || managerData.sector === null ?
              "" : `${managerData.sector}`} color="warning" icon={'carbon:batch-job'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Balance" total={managerData === undefined || managerData.companyBalanceStatus === null ?
              "" : `${managerData.companyBalanceStatus}`} color="error" icon={'majesticons:lira-circle'} />
          </Grid>

          <Grid sx={{ mt: 5, mb: 5 }}>
            <ManagerPersonnelTable />
          </Grid>


          <Grid item sx={{ width: '100%', overflow: 'hidden' }}>
            <AppOrderTimeline
              title="Holiday Dates"
              list={[...Array(`${managerData === undefined || managerData.holidayDates === null ? "" : managerData.holidayDates}`)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [

                  `Holiday: ${managerData === undefined || managerData.holidayDates === null ? "" : managerData.holidayDates}`,

                ][index],
                type: `order${index + 1}`,
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
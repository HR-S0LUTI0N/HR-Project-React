import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { filter } from 'lodash';
import { useState } from 'react';
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
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
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
import USERLIST from '../../_mock/user';

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

  const [rowsPerPage, setRowsPerPage] = useState(5);



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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;
  const theme = useTheme();

  const columns = [
    { id: 'name', label: 'Name', align: 'center', },
    { id: 'company', label: 'Company' },
    { id: 'role', label: 'Role' },
    { id: 'salary', label: 'Salary' },
    { id: 'salaryDate', label: 'Salary Date' },
    { id: 'remainingDayOff', label: 'Remaining Day Off' },
    { id: 'verified', label: 'Verified' },
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
            <AppWidgetSummary title="Company" total="Şirket Ismi ve Title'ı" icon={'mdi:company'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Employee Count" total={1352831} color="info" icon={'clarity:employee-group-solid'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Sector" total="Sector Adı" color="warning" icon={'carbon:batch-job'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Company Balance" total={234} color="error" icon={'majesticons:lira-circle'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>

            <Card sx={{ width: '1500px', height: '590px' }} >
              <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

              <Scrollbar>
                <TableContainer sx={{ minWidth: '500px', maxHeight: '460px' }}>
                  <Table>
                    <TableHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={USERLIST.length}
                      numSelected={selected.length}
                      align="center"
                    >
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell key={column.id} align='center' style={{ width: column.width, backgroundColor: 'white', fontWeight: 'bold', color: 'black' }}>
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { id, name, role, salary, remainingDayOff, salaryDate, status, company, avatarUrl, isVerified } = row;
                        const selectedUser = selected.indexOf(name) !== -1;

                        return (
                          <TableRow >
                            <TableCell component="th" scope="row" align='center'>
                              <Stack direction="row" spacing={4}>
                                <Avatar alt={name} src={avatarUrl} />
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="center">{company}</TableCell>

                            <TableCell align="center">{role}</TableCell>

                            <TableCell align="center">{salary}</TableCell>

                            <TableCell align="center" sx={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {salaryDate.toLocaleDateString()}
                            </TableCell>

                            <TableCell align="center">{remainingDayOff}</TableCell>

                            <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell>

                            <TableCell align="center">
                              <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                            </TableCell>


                          </TableRow>
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>

                    {isNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <Paper
                              sx={{
                                textAlign: 'center',
                              }}
                            >
                              <Typography variant="h6" paragraph>
                                Not found
                              </Typography>

                              <Typography variant="body2">
                                No results found for &nbsp;
                                <strong>&quot;{filterName}&quot;</strong>.
                                <br /> Try checking for typos or using complete words.
                              </Typography>
                            </Paper>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>


                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={USERLIST.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Scrollbar>
            </Card>

          </Grid>




          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Employee Create"
              subheader="Employee Information"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Holiday Dates"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
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
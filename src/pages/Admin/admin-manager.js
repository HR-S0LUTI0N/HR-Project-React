import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { Typography } from '@mui/material';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const columns = [
  { id: 'avatar', label: 'Avatar', width: 80 },
  { id: 'name', label: 'Name', width: 250, align: 'center' },
  { id: 'company', label: 'Company', width: 550, align: 'center' },
  {
    id: 'status',
    label: 'Status',
    width: 350,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(avatar, name, company, status, userId) {
  return { avatar, name, company, status, userId };
}

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const token = sessionStorage.getItem('token');
  const [newAction, setNewAction] = React.useState();
  const [newUserId, setNewUserId] = React.useState('');
  const navigate = useNavigate();
  const roles = sessionStorage.getItem('roles');

  React.useEffect(() => {
    if (token == null) {
      navigate('/404');
    } else if (!roles.includes('ADMIN')) {
      navigate('/404');
    } else {
      fetchManager();
    }
  }, []);
  React.useEffect(() => {
    if (token == null) {
      navigate('/404');
    } else if (!roles.includes('ADMIN')) {
      navigate('/404');
    } else {
      axios
        .put(`http://localhost:9080/api/v1/user-profile/adminchangevisitorstatus/${token}`, {
          userId: newUserId,
          action: newAction,
        })
        .then((response) => response.data)
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        });
    }
  }, [newAction]);

  const fetchManager = async () => {
    try {
      const response = await axios.get(`http://localhost:9080/api/v1/user-profile/find-all-manager-list/${token}`);
      const data = response.data;
      console.log(data);
      const formattedRows = data.map((item) => {
        const row = createData(
          <Avatar alt="Avatar" src={item.avatar} />,
          `${item.name} ${item.middleName == null ? '' : item.middleName} ${item.surname}`,
          item.companyName,
          item.status,
          item.userId
        );
        console.log(row);
        return row;
      });
      setRows(formattedRows);
    } catch (error) {
      console.error('Error Fetching manager:', error);
      toast.error(error.response.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  const updateRows = (newData) => {
    const updatedRows = rows.filter((row) => row.userId !== newData.userId);
    setRows(updatedRows);
  };

  React.useEffect(() => {
    fetchManager();
  }, [newAction]);

  const handleButtonActiveClick = async (userId) => {
    try {
      setNewUserId(userId);
      console.log(userId);
      setNewAction(true);
      await axios.put(`http://localhost:9080/api/v1/user-profile/adminchangevisitorstatus/${token}`, {
        userId,
        action: true,
      });
      fetchManager();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(error.response.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const handleButtonBannedClick = async (userId) => {
    try {
      setNewUserId(userId);
      console.log(userId);
      setNewAction(false);
      await axios.put(`http://localhost:9080/api/v1/user-profile/adminchangevisitorstatus/${token}`, {
        userId,
        action: false,
      });
      fetchManager();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(error.response.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Typography variant="h4" component="h2" mb={2}>
          MANAGER PERMISSIONS
        </Typography>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ width: column.width, fontWeight: 'bold', color: 'black', backgroundColor: 'white' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.id === 'status' ? 'center' : column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}

                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<CheckIcon />}
                      sx={{ marginRight: '1rem', width: 100, color: 'white' }}
                      onClick={() => handleButtonActiveClick(row.userId)}
                    >
                      ACTIVE
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<NotInterestedIcon />}
                      sx={{ marginRight: '1rem', width: 100, color: 'red', border: '1px solid red' }}
                      onClick={() => handleButtonBannedClick(row.userId)}
                    >
                      BANNED
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ToastContainer />
    </Paper>
  );
}

import * as React from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const columns = [
  { id: 'avatar', label: 'Avatar', width: 80 },
  { id: 'name', label: 'Name', width: 100, align: 'center' },
  { id: 'company', label: 'Company', width: 250, align: 'center' },
  { id: 'comment', label: 'Comment', width: 450, align: 'center' },
  {
    id: 'status',
    label: 'Status',
    width: 200,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(avatar, name, company, comment, status) {
  return { avatar, name, company, comment, status };
}

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const token = localStorage.getItem('token');

  React.useEffect(() => {
    fetchManager();
  }, []);

  const fetchManager = async () => {
    try {
      const response = await axios.get(`http://localhost:9080/api/v1/user-profile/find-all-manager-list/${token}`);
      const data = response.data;
      console.log(data);
      const formattedRows = data.map((item) => {
        const row = createData(
          <Avatar alt="Avatar" src={item.avatar} />, // Örnek olarak Avatar bileşeni kullanıldı
          `${item.name} ${item.middleName == null ? '' : item.middleName} ${item.surname}`,
          item.companyId,
          'Örnek comment',
          item.status,
          '',
          ''
        );
        return row;
      });
      setRows(formattedRows);
    } catch (error) {
      console.error('Error Fetching manager:', error);
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
          PERSONEL COMMENTS
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
                        <div style={{ width: column.width, wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </div>
                      </TableCell>
                    );
                  })}

                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<ThumbUpAltIcon />}
                      sx={{
                        marginRight: '1rem',
                        width: 100,
                        color: 'white',
                      }}
                    >
                      <Typography sx={{ fontSize: '13px' }}>CONFIRM</Typography>
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      sx={{
                        marginLeft: 0,
                        marginRight: '1rem',
                        color: 'red',
                        border: '1px solid red',
                        width: 100,
                      }}
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

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
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const columns = [
    { id: 'avatar', label: 'Avatar', },
    { id: 'name', label: 'Name', },
    { id: 'department', label: 'Department', },
    { id: 'role', label: 'Role', },
    { id: 'remainingDaysOff', label: 'Remaining Days Off', },
    { id: 'salary', label: 'Salary', },
    { id: 'salaryDate', label: 'Salary Date', },
    { id: 'dateOfBirth', label: 'Date Of Birth', },
    { id: 'status', label: 'Status', },
];

function createData(avatar, name, department, role, remainingDaysOff, salary, salaryDate, dateOfBirth, status) {
    return { avatar, name, department, role, remainingDaysOff, salary, salaryDate, dateOfBirth, status };
}



export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);
    const token = sessionStorage.getItem('token');
    const roles = sessionStorage.getItem('roles');
    const navigate = useNavigate();

    React.useEffect(() => {
        if (token == null) {
            navigate('/404')
        } else if (!roles.includes('MANAGER')) {
            navigate('/404');
        }
        const fetchData = async () => {

            const response2 = await axios.get(`http://localhost:9080/api/v1/user-profile/get-personnel-profiles-for-manager-dashboard/${token}`)
                .then(response => {

                    const data2 = response2.data;
                    setRows(data2);
                    console.log(data2);
                })
                .catch(error => {
                    console.error('Error:', error);
                })
        };
        fetchData();
    }, []);



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', maxWidth: 1490, ml: 2.8 }}>
            <TableContainer sx={{ maxHeight: 440, width: 1490 }}>
                <Typography variant="h4" component="h2" mb={2}>
                    Personnel List
                </Typography>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align="center" style={{ width: column.width }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows === undefined || rows.length === 0 || rows === null ? "" : rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.index}>
                                    <>
                                        <TableCell key={row.index} align="center" sx={{ width: 120 }}>
                                            <Avatar alt={row.name.toUpperCase()} src={row.avatar} sx={{ bgcolor: '#ffa726' }} />
                                        </TableCell>
                                        <TableCell key={row.index} align="center" sx={{ width: 400 }}>
                                            {row.name} {row.middleName ? row.middleName : ''} {row.surname}
                                        </TableCell>
                                        <TableCell key={row.index} align="center" sx={{ width: 1800 }}>
                                            {row.department}
                                        </TableCell>
                                        <TableCell key={row.index} align="center" sx={{ width: 1800 }}>
                                            {row.roleString}
                                        </TableCell>
                                        <TableCell key={row.index} align="center" sx={{ width: 1800 }}>
                                            {row.remainingDayOffs}
                                        </TableCell>
                                        <TableCell key={row.index} align="center" sx={{ width: 1800 }}>
                                            {row.salary == null ? 0 : row.salary}
                                        </TableCell>
                                        <TableCell key={row.index} align="center" sx={{ width: 1800 }}>
                                            {row.salaryDate == null ? 0 : row.salaryDate}
                                        </TableCell>
                                        <TableCell key={row.index} align="center" sx={{ width: 1800 }}>
                                            {row.dateOfBirth == null ? 0 : row.dateOfBirth}
                                        </TableCell>
                                        <TableCell key={row.index} align="center" sx={{ width: 1800 }}>
                                            {row.estatus}
                                        </TableCell>
                                    </>
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

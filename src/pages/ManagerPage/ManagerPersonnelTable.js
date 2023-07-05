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
    { id: 'jobStartingDate', label: 'Job Starting Date', },
    { id: 'status', label: 'Status', },
];

function createData(avatar, name, department, role, remainingDaysOff, salary, salaryDate, dateOfBirth, jobStartingDate, status) {
    return { avatar, name, department, role, remainingDaysOff, salary, salaryDate, dateOfBirth, jobStartingDate, status };
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
            navigate('/404');
        } else if (!roles.includes('MANAGER')) {
            navigate('/404');
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:9080/api/v1/user-profile/get-personnel-profiles-for-manager-dashboard/${token}`
                );
                const data = response.data;
                console.log(response)
                console.log(data)
                if (Array.isArray(data)) {
                    setRows(data);
                } else {
                    console.error('Invalid data format:', data);
                    setRows([]);
                }
            } catch (error) {
                console.error('Error:', error);
            }
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
            <TableContainer sx={{ maxHeight: 440 }}>
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
                        {rows === undefined ? "" : rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.index}>
                                    <>
                                        <TableCell key={row.index} align="center" sx={{ width: 120 }}>
                                            <Avatar alt={row.name.toUpperCase()} src={row.avatar !== undefined && row.avatar !== null ? row.avatar : `${row.name}`} sx={{ bgcolor: '#ffa726' }} />
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
                                            {row.employeeLeaves}
                                        </TableCell>
                                        <TableCell key={row.index} align="center" sx={{ width: 1800 }}>
                                            {row.wage == null ? 0 : `${row.wage} + TRY`}
                                        </TableCell>
                                        <TableCell key={row.index} align="center" sx={{ width: 1800 }}>
                                            {row.wageDate == null ? 0 : row.wageDate}
                                        </TableCell>
                                        <TableCell key={row.index} align="center" sx={{ width: 1800 }}>
                                            {row.dateOfBirth == null ? 0 : row.dateOfBirth}
                                        </TableCell>
                                        <TableCell key={row.index} align="center" sx={{ width: 1800 }}>
                                            {row.jobStartingDate == null ? 0 : row.jobStartingDate}
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

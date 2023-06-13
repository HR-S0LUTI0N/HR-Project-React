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

const columns = [
    { id: 'avatar', label: 'Avatar', width: 120 },
    { id: 'name', label: 'Name', width: 400 },
    { id: 'comment', label: 'Comment', width: 1800 },
];

function createData(avatar, name, comment, status) {
    return { avatar, name, comment, status };
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
                    Comments
                </Typography>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{ width: column.width }}>
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
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}


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

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
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';
import { Typography, Container } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { useNavigate } from 'react-router-dom';

const columns = [
    { id: 'avatar', label: 'Avatar', width: 20, align: 'center' },
    { id: 'name', label: 'Name', width: 150, align: 'center' },
    { id: 'requestDate', label: 'Date', width: 100, align: 'center' },
    { id: 'advanceRequest', label: 'Amount', width: 100, align: 'center' },
    { id: 'description', label: 'Description', width: 400, align: 'center' },
    {
        id: 'status',
        label: 'Status',
        width: 100,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
];

function createData(avatar, name, advanceRequest, requestDate, description, status, advancedPermissionId) {
    return { avatar, name, advanceRequest, requestDate, description, status, advancedPermissionId };
}

export default function AdvanceConfirmationPage() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);
    const token = sessionStorage.getItem('token');
    const [newActionC, setNewActionC] = React.useState();
    const [newAdvancedPermissionId, setAdvancedPermissionId] = React.useState('');
    const roles = sessionStorage.getItem('roles');

    const navigate = useNavigate();

    React.useEffect(() => {
        if (token == null) {
            navigate('/404');
            console.log('1');
        } else if (!roles.includes('MANAGER')) {
            console.log('2');
            navigate('/404');
        } else {
            fetchManager();
        }
    }, []);



    const fetchManager = async () => {
        try {
            const response = await axios.get(`http://localhost:9080/api/v1/user-profile/find-all-advance-request-list/${token}`);
            const data = response.data;
            console.log(data);
            const formattedRows = data.map((item) => {
                const row = createData(
                    <Avatar alt={item.name.toUpperCase()} src={item.avatar !== undefined && item.avatar !== null ? item.avatar : `${item.name}`} sx={{ bgcolor: '#ffa726' }} />,
                    `${item.name} ${item.middleName == null ? '' : item.middleName} ${item.surname}`,
                    `${item.advanceRequest} ${item.currency}`,
                    item.requestDate,
                    item.description,
                    item.status,
                    item.advancedPermissionId,
                );
                console.log(row);
                return row;
            });
            setRows(formattedRows);
        } catch (error) {
            console.error('Error Fetching manager:', error);
        }
    };

    const updateRows = (newData) => {
        const updatedRows = rows.filter((row) => row.commentId !== newData.commentId);
        setRows(updatedRows);
    };

    React.useEffect(() => {
        fetchManager();
    }, [newActionC]);

    const handleButtonConfirmClick = async (advancedPermissionId) => {

        setAdvancedPermissionId(advancedPermissionId);
        console.log(advancedPermissionId);
        setNewActionC(true);
        await axios.put(`http://localhost:9080/api/v1/user-profile/change-advance-status/${token}`, {
            advancedPermissionId,
            action: true,
        })
            .then((response) => {
                fetchManager();
            })
            .catch((error) => {
                toast.error(error.response.data.message)
                console.error('Error updating status:', error);
            });
    };

    const handleButtonDeleteClick = async (advancedPermissionId) => {
        try {
            setAdvancedPermissionId(advancedPermissionId);
            console.log(advancedPermissionId);
            setNewActionC(false);
            await axios.put(`http://localhost:9080/api/v1/user-profile/change-advance-status/${token}`, {
                advancedPermissionId,
                action: false,
            });
            fetchManager();
        } catch (error) {
            console.error('Error updating status:', error);
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
        <>
            <Container maxWidth="xl">
                <Typography variant="h4" component="h1" gutterBottom>
                    Expense Confirmation Page
                </Typography>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.width }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                    <TableCell align="center" style={{ minWidth: 120 }}>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                                <TableCell align="center">
                                                    {row.status === 'PENDING' && (
                                                        <>
                                                            <Button
                                                                variant="contained"
                                                                color="success"
                                                                sx={{
                                                                    marginRight: '1rem',
                                                                    width: 100,
                                                                    color: 'white',
                                                                }}
                                                                startIcon={<DoneOutlineIcon />}
                                                                onClick={() => handleButtonConfirmClick(row.advancedPermissionId)}
                                                            >
                                                                Confirm
                                                            </Button>
                                                            <Button
                                                                variant="outlined"
                                                                startIcon={<CancelIcon />}
                                                                sx={{
                                                                    marginLeft: 0,
                                                                    marginRight: '1rem',
                                                                    color: 'red',
                                                                    border: '1px solid red',
                                                                    width: 100,
                                                                    '&:hover': {
                                                                        backgroundColor: 'red',
                                                                        color: 'white',
                                                                        border: 'none'

                                                                    },
                                                                }}
                                                                onClick={() => handleButtonDeleteClick(row.advancedPermissionId)}
                                                            >
                                                                Decline
                                                            </Button>
                                                        </>
                                                    )}
                                                    {row.status === 'CONFIRMED' && (
                                                        <Button
                                                            variant="outlined"
                                                            startIcon={<SendIcon />}
                                                            onClick={() => handleButtonDeleteClick(row.advancedPermissionId)}
                                                        >
                                                            Send
                                                        </Button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
            <ToastContainer />

        </>
    );
}


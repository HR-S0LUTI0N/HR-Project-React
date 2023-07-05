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
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import { useNavigate } from 'react-router-dom';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

const columns = [
    { id: 'avatar', label: 'Avatar', width: 50, align: 'center' },
    { id: 'name', label: 'Name', width: 100, align: 'center' },
    { id: 'expenseType', label: 'Type', width: 70, align: 'center' },
    { id: 'billDate', label: 'Date', width: 100, align: 'center' },
    { id: 'amount', label: 'Amount', width: 100, align: 'center' },
    { id: 'billPhoto', label: 'Recipe Photo', width: 100, align: 'center' },
    { id: 'description', label: 'Description', width: 300, align: 'center' },
    {
        id: 'status',
        label: 'Status',
        width: 100,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
];

function createData(avatar, name, expenseType, billDate, amount, description, billPhoto, status, expenseId) {
    return { avatar, name, expenseType, billDate, amount, description, billPhoto, status, expenseId };
}

export default function ExpenseConfirmationPage() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);
    const token = sessionStorage.getItem('token');
    const [newActionC, setNewActionC] = React.useState();
    const [newExpenseId, setNewExpenseId] = React.useState('');
    const roles = sessionStorage.getItem('roles');
    const [showBillPhoto, setShowBillPhoto] = React.useState(false);
    const [img, setImg] = React.useState('');
    const [isImageVisible, setIsImageVisible] = React.useState(false);

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
            const response = await axios.get(`http://localhost:9070/api/v1/expense/find-all-company-expense-list/${token}`);
            const data = response.data;
            console.log(data);
            const formattedRows = data.map((item) => {
                const row = createData(
                    <Avatar alt={item.name.toUpperCase()} src={item.avatar !== undefined && item.avatar !== null ? item.avatar : `${item.name}`} sx={{ bgcolor: '#ffa726' }} />,
                    `${item.name} ${item.middleName == null ? '' : item.middleName} ${item.surname}`,
                    item.expenseType,
                    item.billDate,
                    `${item.amount} ${item.currency}`,
                    item.description,
                    <Button onClick={() => handleDescriptionClick(item.recipePhoto)} sx={{ color: "#ffa726" }}>
                        <DescriptionIcon />
                    </Button>,
                    item.eexpenseStatus,
                    item.expenseId,
                    item.billPhoto
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

    const handleDescriptionClick = (recipePhoto) => {
        console.log(recipePhoto)
        setImg(recipePhoto)
        setShowBillPhoto((prevShowBillPhoto) => !prevShowBillPhoto);
    };

    let billPhotoContent = null;
    if (showBillPhoto) {
        billPhotoContent = (
            <>
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        zIndex: 9999,
                    }}
                    onClick={() => {
                        setShowBillPhoto(false);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setShowBillPhoto(false);
                        }
                    }}
                    role="button"
                    tabIndex={0}
                />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10000,
                    }}
                >
                    <img src={img} alt="Expense Bill" />
                </div>
            </>
        );
    }

    const handleButtonConfirmClick = async (expenseId) => {
        try {
            setNewExpenseId(expenseId);
            console.log(expenseId);
            setNewActionC(true);
            await axios.put(`http://localhost:9070/api/v1/expense/change-expense-status/${token}`, {
                expenseId,
                action: true,
            });
            fetchManager();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleButtonDeleteClick = async (expenseId) => {
        try {
            setNewExpenseId(expenseId);
            console.log(expenseId);
            setNewActionC(false);
            await axios.put(`http://localhost:9070/api/v1/expense/change-expense-status/${token}`, {
                expenseId,
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
                {billPhotoContent}
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
                                                                onClick={() => handleButtonConfirmClick(row.expenseId)}
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
                                                                        backgroundColor: 'red', // Change this to your desired hover color
                                                                        color: 'white', // Change this to the desired text color
                                                                        border: 'none'

                                                                    },
                                                                }}
                                                                onClick={() => handleButtonDeleteClick(row.expenseId)}
                                                            >
                                                                Decline
                                                            </Button>
                                                        </>
                                                    )}
                                                    {row.status === 'CONFIRMED' && (
                                                        <Button
                                                            variant="outlined"
                                                            startIcon={<SendIcon />}
                                                            onClick={() => handleButtonDeleteClick(row.expenseId)}
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
        </>
    );
}


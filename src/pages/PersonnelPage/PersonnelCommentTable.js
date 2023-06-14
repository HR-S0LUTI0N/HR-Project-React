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
    const [comments, setCommentsData] = React.useState([]);

    React.useEffect(() => {
        try {
            axios.get(`http://localhost:9070/api/v1/comment/find-all-active-company-comments/${token}`)
                .then((response) => {
                    const data = response.data;
                    setCommentsData(data);
                    console.log(data)
                })
        } catch (error) {
            console.log('Error', error)
        }
    }, [])



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
                                <TableCell key={column.id} align="center" style={{ width: column.width }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {comments === undefined ? "" : comments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((comment) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={comment.index}>
                                    <>
                                        <TableCell key={comment.index} align="center" sx={{ width: 120 }}>
                                            <Avatar alt={comment.name.toUpperCase()} src={comment.avatar} sx={{ bgcolor: '#ffa726' }} />
                                        </TableCell>
                                        <TableCell key={comment.index} align="center" sx={{ width: 400 }}>
                                            {comment.name}
                                        </TableCell>
                                        <TableCell key={comment.index} align="center" sx={{ width: 1800 }}>
                                            {comment.comment}
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
                count={comments.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

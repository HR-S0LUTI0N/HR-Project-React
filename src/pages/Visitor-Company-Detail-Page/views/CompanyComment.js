import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

const itemsPerPage = 5; // Number of items to display per page

function CompanyComment(props) {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = props.item.slice(startIndex, endIndex);

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Avatar</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Comment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((comment) => (
                            <TableRow key={comment.id}>
                                <TableCell>
                                    <Avatar alt="User Avatar" src={comment.avatarUrl} sx={{ bgcolor: '#B7B7B7' }}>
                                        {comment.name.charAt(0)}
                                    </Avatar>
                                </TableCell>
                                <TableCell sx={{ width: 200 }}>
                                    <Typography variant="body1">{comment.name} {comment.surname}</Typography>
                                </TableCell>
                                <TableCell sx={{ width: 800 }}>
                                    <Typography variant="body1">{comment.comment}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={Math.ceil(props.item.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                shape="rounded"
                sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
            />
        </div>
    );
}

export default CompanyComment;

import React from 'react'
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


const CompanyComment = (props) => {
    return (
        <>
            <ListItem alignItems="flex-start" sx={{ bgcolor: '#616161', marginBottom: 1, borderRadius: '1%' }}>
                <ListItemAvatar>
                    <Avatar alt="UserProfile Avatar" src="/static/images/avatar/1.jpg" sx={{ bgcolor: "#ffa726" }}>{props.item.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography sx={{ color: '#ffa726' }}>
                            {`${props.item.name} ${props.item.surname}`}
                        </Typography>
                    }
                    secondary={
                        <Typography variant="body2" sx={{ color: '#ffffff' }}>
                            {props.item.comment}
                        </Typography>
                    }
                />
            </ListItem >
            <Divider variant="inset" component="li" />
        </>
    )
}

export default CompanyComment;
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';



const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function CompanyCard(props) {
    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        localStorage.setItem('companyId', props.item.companyId);
        console.log(props.item.companyId)
        navigate('/company')
    }

    return (
        <Card sx={{ maxWidth: 800 }}>
            <CardMedia
                sx={{ height: 200 }}
                image={
                    props.item.logo === null
                        ? 'https://images.unsplash.com/photo-1512403754473-27835f7b9984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80'
                        : props.item.logo
                }
                title="company logo"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ color: "#545B77", fontWeight: "bold", bgcolor: "white" }}>
                    {props.item.companyName === undefined
                        ? 'In Maintenance'
                        : `${props.item.companyName} ${props.item.title}`}
                </Typography>
                <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                        <CardActions onClick={handleClick}>
                            <Button size="small" variant="contained" type="onClick" sx={{ color: "#545B77", fontWeight: "bold", bgcolor: "white" }}
                            >Learn More</Button>
                        </CardActions>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ marginLeft: '20px' }}>
                            <Typography variant="body2" color="text.secondary">
                                {props.item.companyCountry === null
                                    ? 'Default'
                                    : `Country: ${props.item.companyCountry}`}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {props.item.companyProvince === null
                                    ? 'Default'
                                    : `Province: ${props.item.companyProvince}`}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
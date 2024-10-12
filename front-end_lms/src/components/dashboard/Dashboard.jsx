// import React from 'react'
import { Typography, Box, Paper, Button, Grid, Divider, List, ListItem, ListItemText } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import PaymentIcon from '@mui/icons-material/Payment';
import Navbar from '../header/NavBar';

const Dashboard = () => {


  const relatedCourses = [
    { title: 'Advanced React', price: 59.99 },
    { title: 'JavaScript Essentials', price: 39.99 },
    { title: 'Full-Stack Development', price: 79.99 },
    { title: 'Node.js Masterclass', price: 69.99 },
    { title: 'CSS and Flexbox Mastery', price: 29.99 },
  ];



  return (
    <>
    <Navbar/>
    <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom textAlign={"center"}>
          Explore Course Here 
        </Typography>
        <Grid container spacing={5} width={"90%"} margin={"auto"} bgcolor={"azure"} height={"70vh"} justifyContent={"space-evenly"} alignItems={"center"} flexWrap={"wrap"}>
          {relatedCourses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} >
              <Paper elevation={1} sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h6">{course.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  ${course.price.toFixed(2)}
                </Typography>
                <Button variant="outlined" sx={{ mt: 2 }} startIcon={<ShoppingCartIcon />}>
                  View Course
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
    </Box>
       
    </>
  );

};

export default Dashboard

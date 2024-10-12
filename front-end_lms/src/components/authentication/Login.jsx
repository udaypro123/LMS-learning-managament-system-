// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Container, Grid, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';


const theme = createTheme();

const Login = () => {

  const navigate=useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Login with:', { email, password });
    navigate("/dashboard")
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
        <Paper elevation={6} style={{ padding: '2rem', marginTop: '10rem' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5">
              LMS Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                // required
                fullWidth
                id="email"
                label="Enter Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                // required
                fullWidth
                name="password"
                label="Enter Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs mb={1} mt={1}>
                  <Link href="#" style={{ textDecoration: 'none', color: theme.palette.primary.main ,  }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" style={{ textDecoration: 'none', color: theme.palette.primary.main,  }}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Login;

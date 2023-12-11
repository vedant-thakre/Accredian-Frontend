import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../Context/AppContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useEffect } from 'react';

const Nav =() => {
    const { isAuthenticated, setIsAuthenticated, setUser, setloading } = useApp();
    const navigate = useNavigate();
    const handleLogout = async () => {
      try {
      const { data } = await axios.get(
        `http://localhost:5050/api/v1/logout`,
        {
          withCredentials: true,
        }
      );

        toast.success(data.message);
        setIsAuthenticated(false);
      }catch (error) {
         toast.error(error.response.data.message);
        setIsAuthenticated(true);
     }
    };

    const homeRoute = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5050/api/v1/home`,
        {
          withCredentials: true,
        }
       );
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }

    const getDetails = async () => {    
      setloading(true);  
      try {
        const { data } = await axios.get(
          `http://localhost:5050/api/v1/profile`,
        {
          withCredentials: true,
        }
       );
        setUser(data.user);
        setloading(false);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1e1e1e' }}>
      <Container maxWidth={'xl'}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Accredian
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              color="inherit"
            >
             A
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', gap: '30px', marginLeft: 'auto' }}>
            <Link to={"/home"} onClick={homeRoute} underline="none" style={{color: 'white'}}>
              Home
            </Link>
            <Link to={"/profile"} onClick={getDetails} underline="none" style={{color: 'white'}}>
              Profile
            </Link>
            {
              isAuthenticated ? 
               <Link onClick={handleLogout}  to={"/login"} underline="none" style={{color: 'white'}}>Logout</Link>
             : 
              <Link to={"/login"} underline="none" style={{color: 'white'}}>
              Login
            </Link > 
            }
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Nav;

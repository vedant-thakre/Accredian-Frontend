import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useApp } from '../Context/AppContext';
import { useTheme } from '@mui/joy/styles';
import { Button, Grid, Paper, TextField, useMediaQuery } from '@mui/material';


const Login = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [showpass, setshowpass] = useState(true);
     const { setIsAuthenticated} = useApp();
    const navigate = useNavigate();

    const [values, setValues] = useState({
      emailOrUsername: '',
      password: ''
    });
    axios.defaults.withCredentials = true;
    const handleChange = (field, value) => {
      setValues({ ...values, [field]: value });
    };

    const paperStyle = {
        padding: isSmallScreen ? "15px 17px 10px 17px" : "15px 30px 15px 30px",
        width: "90%",
        maxWidth: "400px",
        borderRadius: '15px',
    };
    const textfieldStyle = { display: "flex", flexDirection: 'column', gap: '15px' };
    const buttonStyle = { outline: 'none', backgroundColor: '#1e1e1e', marginTop: '20px', borderRadius: '9px', padding: '10px', cursor: 'pointer', fontSize: '16px' };
   
    const geustUserLogin = () => {
      setValues({
          emailOrUsername: 'tempuser@gmail.com',
          password: 'Tempuser@1234',
      });
    }

   
    const handleSubmit = async (e) => {

      e.preventDefault(); 
        try {
            const formData = new FormData();
            formData.append('emailOrUsername', values.emailOrUsername);
            formData.append('password', values.password);
            const response = await axios.post('http://localhost:5050/api/v1/login', formData);

            if (response.status === 201) {
                toast.success(response.data.message);
                setIsAuthenticated(true);
                navigate('/home');
            } else {
                console.error('Error submitting form:', response.statusText);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.error('Error submitting form:', error.message);
        }
    };

    
    return (
        <Grid style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '91vh' }}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align={"center"} marginBottom={"20px"}>
                    <h2 style={{ margin: '0px', fontSize: '25px' }}>Login</h2>
                </Grid>
                <Grid style={textfieldStyle}>
                    <TextField  label='Username or Email' size='small' value={values.emailOrUsername}  name='emailOrUsername' placeholder='Enter username or email' fullWidth required 
                     onChange={(e) => handleChange('emailOrUsername', e.target.value)}
                    />
                    <div style={{position: 'relative'}} fullWidth >
                         { showpass ? <IoMdEyeOff style={{position: 'absolute', zIndex: '30', fontSize: '23px',  top: '8px', right: '10px', cursor: 'pointer'}}
                         onClick={()=>{ setshowpass(!showpass)}}
                         /> :
                         <IoMdEye style={{position: 'absolute' , fontSize: '23px', zIndex: '30', top: '8px', right: '10px',  cursor: 'pointer'}}
                          onClick={()=>{ setshowpass(!showpass)}}
                         />}
                          <TextField label='Password' size='small' value={values.password}  type={!showpass ? `text` : `password`} placeholder='Enter password' 
                          onChange={(e) => handleChange('password', e.target.value)} fullWidth required />
                     </div>
         
                </Grid>
                <Button variant="contained" style={buttonStyle} fullWidth onClick={handleSubmit}>Login</Button>
                <p align='center' style={{ marginTop: '10px', fontSize: '14px' }}> 
                <span style={{ cursor: 'pointer', color: 'red' }} onClick={geustUserLogin}>Guest user</span> | Don't have an account?
                    <span style={{ cursor: 'pointer', color: 'blue' }} onClick={()=>{ navigate('/register')}}> Sign Up</span>
                </p>
            </Paper>
        </Grid>
    );
}

export default Login;

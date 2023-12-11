import React, { useState } from 'react';
import { Button, Grid, Input, Paper, TextField, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Signup = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const [show, setshow] = useState(true);
    
    const [values, setValues] = useState({
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      image: null,
    });

    const paperStyle = {
        padding: isSmallScreen ? "15px 17px 10px 17px" : "15px 30px 15px 30px",
        width: isSmallScreen ? "90%" : 400,
        margin: '100px auto',
        borderRadius: '15px',
    };

    const handleFileChange = (e) => {
      const image = e.target.files[0];
      setValues({ ...values, image });
    };
    
    const textfieldStyle = { display: "flex", flexDirection: 'column', gap: '18px' };
    const customStyles = { border: 'none', outline: 'none', cursor: 'pointer' };
    const buttonStyle = { outline: 'none', backgroundColor: '#1e1e1e', marginTop: '14px', borderRadius: '9px', padding: '8px', cursor: 'pointer', fontSize: '16px' };

    const handleChange = (field, value) => {
      setValues({ ...values, [field]: value });
    };

     const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
      const lowercaseRegex = /[a-z]/;
      const uppercaseRegex = /[A-Z]/;
      const digitRegex = /\d/;
      const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

      const hasLowercase = lowercaseRegex.test(password);
      const hasUppercase = uppercaseRegex.test(password);
      const hasDigit = digitRegex.test(password);
      const hasSpecialChar = specialCharRegex.test(password);

          return hasLowercase && hasUppercase && hasDigit && hasSpecialChar;
      };

    const handleSubmit = async (e) => {

      e.preventDefault(); 

      if (!validateEmail(values.email)) {
        toast.error('Please enter a valid email address');
        return;
      }

       if (!validatePassword(values.password)) {
          toast.error('Your Password is Weak');
          return;
       }

        try {
            const formData = new FormData();
            formData.append('username', values.username);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('confirm_password', values.confirm_password);
            formData.append('image', values.image);
            const response = await axios.post('http://localhost:5050/api/v1/register', formData);

            if (response.status === 201) {
                toast.success(response.data.message);
                navigate('/login');
            } else {
                console.error('Error submitting form:', response.statusText);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.error('Error submitting form:', error.message);
        }
    };

    return (
        <Grid style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align={"center"} marginBottom={"20px"}>
                    <h2 style={{ margin: '0px', fontSize: '25px' }}>Register</h2>
                </Grid>
                <Grid style={textfieldStyle}>
                    <TextField label='Username' size='small' type='text' placeholder='Enter username'
                     onChange={(e) => handleChange('username', e.target.value)} fullWidth required />
                    <TextField label='Email' size='small' type='email' placeholder='Enter email' 
                     onChange={(e) => handleChange('email', e.target.value)} fullWidth required />
                     
                     <div style={{position: 'relative'}} fullWidth >
                         { show ? <IoMdEyeOff style={{position: 'absolute', zIndex: '30', fontSize: '23px',  top: '8px', right: '10px', cursor: 'pointer'}}
                         onClick={()=>{ setshow(!show)}}
                         /> :
                         <IoMdEye style={{position: 'absolute' , fontSize: '23px', zIndex: '30', top: '8px', right: '10px',  cursor: 'pointer'}}
                          onClick={()=>{ setshow(!show)}}
                         />}
                          <TextField label='Password' size='small' type={!show ? `text` : `password`} placeholder='Enter password' 
                          onChange={(e) => handleChange('password', e.target.value)} fullWidth required />
                     </div>
         
                        <TextField label='Confirm Password' size='small' type={!show ? `text` : `password`} placeholder='Confirm password' 
                     onChange={(e) => handleChange('confirm_password', e.target.value)} fullWidth required />
           
                    <Input type='file' style={customStyles} disableUnderline onChange={handleFileChange} />
                </Grid>
                <Button variant="contained" style={buttonStyle} fullWidth onClick={handleSubmit}>Sign Up</Button>
                <p align='center' style={{ marginTop: '4px' }}>Already have an account ?
                    <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => { navigate('/login') }}> Login</span>
                </p>
            </Paper>
        </Grid>
    );
}

export default Signup;

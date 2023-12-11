import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Grid } from '@mui/material';
import { useApp } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Profile = () => {
    const { user, loading, isAuthenticated } = useApp(); 
    const navigate = useNavigate();
    useEffect(() => {        
        if (!isAuthenticated) {
        navigate('/login');
        }
    }, [navigate]);

  return (
    <Grid style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
        { loading ? <Typography>Loding...</Typography> : 
        <Card
      sx={{
        width: 320,
        maxWidth: '100%',
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)' 
      }}
    >
      <CardContent sx={{ alignItems: 'center', textAlign: 'center',  }}>
        <Avatar src={user?.image} sx={{ '--Avatar-size': '7rem' , marginBottom: '10px', boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.4)' }} />
        <Typography level="title-lg">{user?.username}</Typography>
        <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
          Email : { user?.email }
        </Typography>
      </CardContent>
    </Card>}
    </Grid>
  );
}

export default Profile;
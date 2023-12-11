import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../Context/AppContext';
import { Box } from '@mui/material';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Grid } from '@mui/material';
import { LuTwitter } from "react-icons/lu";
import { GrFormNext } from "react-icons/gr";
import { MdContentCopy } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useTheme } from '@mui/joy/styles';


const Home = () => {
  const { setIsAuthenticated } = useApp();
  const theme = useTheme();

   const [quote, setQuote] = useState({
        text : "If you have dream to chase nothing can stop you",
        author : "Leonel Messi",
    })
  const navigate = useNavigate();
   const shareOnTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?text="${quote.text}"%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20
        %20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20
        %20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20-${quote.author}`);
    }

    const copyText = () => {
    toast.success("Text Copied");
    const textToCopy = quote.text;
    setcopy(true);

    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;

    textarea.style.position = 'fixed';
    textarea.style.opacity = 0;

    document.body.appendChild(textarea);
    textarea.select();
   
    document.execCommand('copy');
    document.body.removeChild(textarea);
 } 

  const getQuotes = async () => {
        try {
            const response = await axios.get("https://api.quotable.io/random");
            const { content, author } = response.data;
            setQuote({
                text: content,
                author: author,
        });
        } catch (error) {
            console.log(error);
        }
    }

   

  useEffect(() => {
    const checkCookie = () => {
      const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('token'));
        
      if (!cookieValue) {
        navigate('/login');
      }else{
        setIsAuthenticated(true);
      }
    };
    checkCookie();
  }, []);

  const customStyle = { border: '1px solid black',fontSize: '18px', cursor: 'pointer', padding: '6px', borderRadius: '50%'}

  return (
     <Grid style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '86vh' }}>
       <Box
        sx={{
        width: '100%', // Set width to 100% by default
    [theme.breakpoints.up('sm')]: {
      width: '430px', // Set width to 430px for screens wider than 'sm'
      maxWidth: '100%', // Allow maximum width for screens wider than 'sm'
     
    },
      }}
    >
      <Card variant="outlined"  sx={{
        padding: "25px 30px 25px 30px",
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)', 
      }}>
        <CardContent style={{display: 'flex', flexDirection: 'column', gap: '10px'}} >
          <Typography level="title-md" fontSize={'20px'}>{`"${quote.text}"`}</Typography>
          <div style={{width: '100%', height: '1px', backgroundColor : 'black'}}></div>
          <Box sx={{ display: 'flex' , justifyContent: 'space-between'}}>
            <Typography> - {quote.author }</Typography>
            <Box sx={{ display: 'flex', gap: '14px' }}>
               <MdContentCopy className=' text-xl ' style={customStyle} onClick={copyText}/> 
            <LuTwitter className=' text-xl ' style={customStyle}  onClick={shareOnTwitter}/> 
            <GrFormNext className=' text-xl' style={customStyle} onClick={getQuotes}/>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
    </Grid>
  );
};

export default Home;

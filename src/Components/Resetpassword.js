import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Instagram from '../Icons/instagram.svg';
import { FacebookRounded } from '@mui/icons-material';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { AuthContext } from '../Context/Authcontext';
import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Route, useNavigate, Routes, Navigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
function Resetpassword() {
    const navigate = useNavigate();
    const { resetPassword } = useContext(AuthContext);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setLoading(true)
        const email = data.get('email');
        // console.log(email)
        try {
            let resp=await resetPassword(email);
            console.log(resp)

            setLoading(false);
            // navigate("/", { replace: true });
        }
        catch (err) {
            setError(err.message);
            // console.log(err.message)
            setOpen(true)
            setTimeout(() => {
                setError('')
                setOpen(false)

            }, 5000)
            setLoading(false);
            return;
        }

    };
    const [Error, setError] = useState('');
    const [Loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
  return (
    <div className='forget-box'> <Box className="forget-cont"
    sx={{
        marginTop: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: 1,
        borderColor: 'grey.500',
        width: 400,
        height: 400,
        mx: 'auto', // margin left & right
        my: 1, // margin top & bottom
        py: 0, // padding top & bottom
        px: 0, // padding left & right
        display: 'flex',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: 'md',
    }}
>

    <div className='signup-logo'> <img src={Instagram} /></div>
    <Grid className='reset-text' container justifyContent="center"  alignItems="center" textAlign="center">
            <Grid item>
            Enter your email and we'll send you a link to get back into your account.
            </Grid>
        </Grid>
    <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={4}>
            <Grid item xs={16}>
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    size="small"
                />
            </Grid>



            
            {<Box sx={{
                width: '100%', marginTop: 1,

                alignItems: 'center',
                // border: 1,
                borderColor: 'grey.500',
                size: "small",
                mx: 'auto', // margin left & right
                my: 1, // margin top & bottom
                width: "100%",
                position: "relative",
                left: "0.5rem",

                px: 1, // padding left & right
                height: 45,
                gap: 2,

            }} >
               
                <Collapse in={open}>
                    <Alert severity="error" className='alert1'
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                    setError('');
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 1 }}
                    >
                        {Error}
                    </Alert>
                </Collapse>
            </Box>}



        </Grid>

        <Button
            disabled={Loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            Submit
        </Button>




        <Grid container justifyContent="center" >
            <Grid item>
                <Link to="/Login">
                    Login
                </Link>
            </Grid>
        </Grid>
    </Box>


</Box></div>
  )
}

export default Resetpassword
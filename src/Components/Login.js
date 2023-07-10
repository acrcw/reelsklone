import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarouselProvider, Slider, Slide, Image } from 'pure-react-carousel';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Instagram from '../Icons/instagram.svg';
import { FacebookRounded } from '@mui/icons-material';
import 'pure-react-carousel/dist/react-carousel.es.css';
import img1 from '../Icons/screenshot2.png'
import img2 from '../Icons/screenshot3.png'
import img3 from '../Icons/screenshot4.png'
import { AuthContext } from '../Context/Authcontext';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

import { useTheme } from '@mui/material/styles';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setLoading(true)
        const email = data.get('email');
        const password = data.get('password');
        try {
            await login(email, password);

            setLoading(false);
            navigate("/", { replace: true });
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
    const theme = useTheme();
    const store = useContext(AuthContext)
    console.log(store);


    const [Error, setError] = useState('');
    const [Loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);

    return (


        <div className="login-wrapper">

            <div className='carousel-container'>
                <div className='carousel-images'>
                    <CarouselProvider
                        isPlaying
                        naturalSlideWidth={100}
                        naturalSlideHeight={220}
                        totalSlides={3}
                        hasMasterSpinner
                        infinite={true}
                        dragEnabled={false}
                        touchEnabled={false}
                    >
                        <Slider>
                            <Slide index={0}><Image className="slide-img" src={img1} /></Slide>
                            <Slide index={1}><Image className="slide-img" src={img2} /></Slide>
                            <Slide index={2}><Image className="slide-img" src={img3} /></Slide>
                        </Slider>
                    </CarouselProvider>
                </div>

            </div>


            <Box className="login-cont"
                sx={{
                    marginTop: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: 1,
                    borderColor: 'grey.500',
                    width: 400,
                    height: 500,
                    mx: 'auto', // margin left & right
                    my: 1, // margin top & bottom
                    py: 0, // padding top & bottom
                    px: 1, // padding left & right
                    display: 'flex',
                    gap: 2,
                    borderRadius: 'sm',
                    boxShadow: 'md',
                }}
            >

                <div className='signup-logo'> <img src={Instagram} /></div>
                <Box component="form" validate="true" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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



                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
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
                            <Collapse in={!open}>
                              <Grid container justifyContent="center"  marginTop="1rem" color="#000000">
                        <Grid item>
                            <Link to="/resetpassword">
                                Forgot Password?
                            </Link>
                        </Grid>
                    </Grid>
                    </Collapse>
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
                        Login
                    </Button>

                    <Divider />

                    <Button
                        type="submit"
                        fullWidth

                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >

                        <FacebookRounded /> Login With Facebook

                    </Button>

                    <Grid container justifyContent="center" >
                        <Grid item>
                            <Link to="/Signup">
                                account? Sign up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>


            </Box>



        </div>


    );
}
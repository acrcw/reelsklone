import React, { useCallback, useEffect, useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { storage, db, serverTimestamp, ref, uploadBytesResumable, getDownloadURL, getDoc, setDoc, doc, addDoc, updateDoc } from '../firebase';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import { useDropzone } from 'react-dropzone';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Instagram from '../Icons/instagram.svg';
import { AuthContext } from '../Context/Authcontext';
import { v4 as uuidv4 } from 'uuid';
import { CardMedia } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
const pages = ["Upload", "Refresh"];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Navbar({ props }) {
  const { user, logout } = useContext(AuthContext);
  const [files, setFiles] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handledropzoneOpen = () => {
    setOpen(true);
  };

  const handledropzoneClose = () => {
    setOpen(false);
    setFiles([])
  };

  const [profile, setProfile] = useState('');
  useEffect(() => {
    setProfile(user.photoURL);
  }, [user]) // componenet did mount

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ['image/*','video/*'],
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
      console.log(acceptedFiles);
    }
  });
  const handleupload = async () => {
    console.log(files)

    props[0](!props[1])

    let file = files[0];
    console.log(file.type.split("/")[0])
    let postid = uuidv4();

    const storageRef = ref(storage, `/users/${user.uid}/post-${postid}/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {

        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log(error)
        // setError(error.message)
      },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at', downloadURL);
          // console.log(serverTimestamp())

          const docref = await setDoc(doc(db, "posts", `post-${postid}`,),
            {
              likes: [],
              comments: [],
              postid: `post-${postid}`,
              posturl: `${downloadURL}`,
              username: `${user.displayName}`,
              profilepic: `${user.photoURL}`,
              createdat: serverTimestamp(),
              userid: `${user.uid}`,
              contenttype: `${file.type.split("/")[0]}`
            });

        });
      }
    );
    setOpen(false);
  }

  const handleCloseNavMenu = (target) => {
    console.log(target.textContent)
    if (target.textContent === "Upload") {

      setOpen(true);
    }
    else if (target.textContent === "Refresh") {
      props[0](!props[1])
      // updateUploadState(false)
    }
    setAnchorElNav(null);
  };
  const buttonSX = {
    my: 2, color: 'white', display: 'block', background: "black", ml: 3,

    "&:hover": {
      borderColor: "2px solid black",
      backgroundColor: "white",
      color: "black"
    },
  };
  const handleCloseUserMenu = (target) => {
    console.log(target.textContent)
    if (target.textContent === "Logout") {
      logout();
    }
    setAnchorElUser(null);
  };

  return (<>
    <AppBar position="sticky">
      <Container maxWidth="xl" className="bar">
        <Toolbar disableGutters className='tool-bar'>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <div className="logo">
              <img src={Instagram} />
            </div>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton className="nav-menu"
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} id={page} onClick={(e) => handleCloseNavMenu(e.currentTarget)} >
                  <Typography sx={{ mt: 0 }} textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >

          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                id={page}
                key={page}
                onClick={(e) => handleCloseNavMenu(e.currentTarget)}
                sx={buttonSX}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings" className='profile-mobile'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={profile} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={(e) => handleCloseUserMenu(e.currentTarget)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handledropzoneClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Upload "}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
            <input {...getInputProps()} />
            {isDragActive && files.length==0 ? (
              <p>Drop the files here...</p>
            ) : (
              <p>Drag and drop files here, or click to select files</p>
            )}
            <div className="thumbnails">
              {files.map((file, index) => (
                <div key={index} className="thumbnail">
                 
                  <CardMedia
                    component= {file.type.split("/")[0]==="image"?"img":"video"}
                    fit="contain"
                    sx={{
                      mt:"auto",
                      mx:"auto",
                      boxShadow: 1,
                      height: 233,
                      width: 350,
                      borderRadius: 2 ,
                      maxHeight: { xs: 233, md: 167 },
                      maxWidth: { xs: 350, md: 250 },
                    }}
                    alt={`Thumbnail ${index}`}
                    src={URL.createObjectURL(file)}
                  />
                 
                </div>
              ))}
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handledropzoneClose}>Cancel</Button>
        <Button onClick={handleupload}>Upload</Button>
      </DialogActions>
    </Dialog>

  </>

  );
}
export default Navbar;
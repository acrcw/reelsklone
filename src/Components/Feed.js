import { storage, db, getMetadata, serverTimestamp, Timestamp, ref, uploadBytesResumable, orderBy, limit, getDownloadURL, getDoc, setDoc, doc, addDoc, updateDoc, collection, query, where, getDocs } from '../firebase';
import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import useMediaQuery from '@mui/material/useMediaQuery';
import Navbar from './Navbar';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';

import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Typography from '@mui/joy/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import { AuthContext } from '../Context/Authcontext';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import { useTheme } from '@mui/material/styles';
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;
function Feed() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [postcomment, setpostcomment] = React.useState('');
  const [comment, setComment] = React.useState(false);
  const [commentdata, setCommentdata] = React.useState([]);
  const [scroll, setScroll] = React.useState('paper');
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [post, setPost] = useState(null);
  const { user } = useContext(AuthContext);
  const [upload, setUpload] = useState(true);

  const handlecommentClose = () => {
    setComment(false);
    // setScroll(scrollType);
  };
  const addcommenttopost = async (id, comments) => {
    let comment = document.getElementById(id).value;

    const postonRef = doc(db, "posts", id);
    await updateDoc(postonRef, {
      comments: [...comments, comment]
    })
    setUpload(!upload);

    document.getElementById(id).value = "";
  }
  const handlecommentopen = (comment) => {
    setCommentdata([...comment])
    console.log(commentdata)
    setComment(true);
  }

  const handleClose = () => {
    setOpen(false);
  };




  const likepost = async (target, post) => {
    console.log(target,)
    let id = user.uid
    let index = post.likes.includes(id)
    console.log(index)
    if (!post.likes.includes(id)) {
      const postonRef = doc(db, "posts", post.postid);
      await updateDoc(postonRef, {
        likes: [...post.likes, user.uid]
      });
      setUpload(!upload);
    }

    // MuiIconButton-variantPlain MuiIconButton-colorDanger

  }

  // console.log(user,count++)
  const updateUploadState = (message) => {
    // console.log(message)


    setUpload(message);
  };

  useEffect(() => {
    const fetchpost = async () => {
      const q = query(collection(db, "posts"), orderBy("createdat", "desc"), limit(20))
      const querySnapshot = await getDocs(q);
      let postarr = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots




        postarr.push({ id: `${doc.id}`, ...doc.data() })
      });
      setPost(postarr);
    }
    fetchpost();
    console.log("useeffect here")

  }, [upload])
  const handleclick = (e) => {
    console.log("play")
    e.preventDefault();
    e.target.muted = !e.target.muted;
  }
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <><Navbar props={[updateUploadState, upload]} />
      {post == null ? <>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={post == null}      >
          <CircularProgress color="inherit" />
        </Backdrop></> :


        post.map((post) => (
          <React.Fragment key={post.id}>
            {<><Card
              variant="outlined"
              sx={{
                minWidth: 300,
                '--Card-radius': (theme) => theme.vars.radius.xs,
              }}
            >
              <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    position: 'relative',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      m: '-2px',
                      borderRadius: '50%',
                      background:
                        'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                    },
                  }}
                >
                  <Avatar alt={post.username} src={post.profilepic} sx={{ p: 0, size: "sm", border: '2px solid', borderColor: 'background.body' }} />

                </Box>
                <Typography fontWeight="lg">{post.username}</Typography>
                <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
                  <MoreHoriz />
                </IconButton>
              </CardContent>
              <CardOverflow>

                {post.contenttype === "image" ? <AspectRatio><img src={post.posturl} alt="" loading="lazy" /> </AspectRatio> : <AspectRatio><video src={post.posturl} controls controlslist="nofullscreen nodownload noremoteplayback noplaybackrate foobar" className='vid' disablepictureinpicture muted autoPlay loop alt="" loading="lazy" onClick={(e) => handleclick(e)} /> </AspectRatio>}


              </CardOverflow>
              <CardContent orientation="horizontal" sx={{ alignItems: 'center', mx: -1 }}>
                <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>

                  {post.likes.includes(user.uid) === false ? (<IconButton variant="plain" color="neutral" size="sm" onClick={(e) => likepost(e.currentTarget, post)}>
                    <FavoriteBorder />
                  </IconButton>) : (<IconButton variant="plain" color="danger" size="sm" >
                    <FavoriteBorder />
                  </IconButton>)}
                  <IconButton variant="plain" color="neutral" size="sm" onClick={() => handlecommentopen(post.comments)}>


                    <ModeCommentOutlined />
                  </IconButton>
                  <IconButton variant="plain" color="neutral" size="sm">
                    <SendOutlined />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mx: 'auto' }}>
                  {[...Array(1)].map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        borderRadius: '50%',
                        width: `max(${6 - index}px, 3px)`,
                        height: `max(${6 - index}px, 3px)`,
                        bgcolor: index === 0 ? 'primary.solidBg' : 'background.level3',
                      }}
                    />
                  ))}
                </Box>
                <Box sx={{ width: 0, display: 'flex', flexDirection: 'row-reverse' }}>
                  <IconButton variant="plain" color="neutral" size="sm">
                    <BookmarkBorderRoundedIcon />
                  </IconButton>
                </Box>
              </CardContent>
              <CardContent>
                <Link
                  component="button"
                  underline="none"
                  fontSize="sm"
                  fontWeight="lg"
                  textColor="text.primary"
                >
                  {post.likes.length} Likes
                </Link>
                <Typography fontSize="sm">
                  <Link
                    component="button"
                    color="neutral"
                    fontWeight="lg"
                    textColor="text.primary"
                  >
                    {post.username}
                  </Link>{' '}
                  The React component library you always wanted
                </Typography>
                <Link
                  component="button"
                  underline="none"
                  fontSize="sm"
                  startDecorator="…"
                  sx={{ color: 'text.tertiary' }}
                >
                  more
                </Link>
                <Link
                  disabled
                  variant='string'
                  // align="left"
                  // component="button"
                  underline="none"
                  fontSize="sm"
                  sx={{ color: 'text.tertiary', my: 0.5 }}
                >
                  {post.createdat.toDate().toDateString()}
                </Link>
              </CardContent>
              <CardOverflow sx={{ pb: 'var(--Card-padding)', display: 'flex' }}>
                <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
                  <Avatar alt={user.displayName} src={user.photoURL} />
                </IconButton>
                <Input
                  id={`${post.id}`}
                  variant="plain"
                  size="sm"
                  placeholder="Add a comment…"
                  sx={{ flexGrow: 1, mr: 1, '--Input-focusedThickness': '1px' }}
                />
                <Link onClick={() => addcommenttopost(`${post.id}`, post.comments)} underline="none" role="button">
                  Post
                </Link>
              </CardOverflow>
            </Card>





              <Dialog
                open={comment}
                onClose={handlecommentClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
              >
                <DialogTitle id="scroll-dialog-title">Comments</DialogTitle>
                <DialogContent dividers={"paper"}>
                  <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                  >
                    {commentdata.map((comment) => (
  <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 1,width:"70vh" }}>
    <StyledPaper sx={{ my: 1, mx: 'auto', p: 2 }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar>W</Avatar>
        </Grid>
        <Grid item xs>
          <Typography>{comment}</Typography>
        </Grid>
      </Grid>
    </StyledPaper>
  </Box>
))}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handlecommentClose}>Close</Button>
                </DialogActions>
              </Dialog>
            </>}
          </React.Fragment>

        ))
      }




    </>

  )
}

export default Feed
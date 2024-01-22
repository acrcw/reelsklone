import React, { useEffect, useState, useContext } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Instagram from "../Icons/instagram.svg";
import { useNavigate } from "react-router-dom";
import { CloudUploadOutlined } from "@mui/icons-material";
import { AuthContext } from "../Context/Authcontext";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import {
  auth,
  storage,
  db,
  serverTimestamp,
  ref,
  updateProfile,
  uploadBytesResumable,
  getDownloadURL,
  setDoc,
  doc,
} from "../firebase";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link to="/Login">Reels</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [File, setFile] = useState(null);
  const [Error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const history=unstable_HistoryRouter();
  const { signup } = useContext(AuthContext);
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (File == null) {
      setError("Please upload Frofile pic");
      setOpen(true);
      setTimeout(() => {
        setError("");
        setOpen(false);
      }, 5000);
      return;
    }
    const email = data.get("email");
    const password = data.get("password");
    const Username = data.get("UserName");
    const Fullname = data.get("FullName");

    try {
      let userobj = await signup(email, password);
      let uuid = userobj.user.uid;
      console.log(uuid);

      const storageRef = ref(storage, `/users/${uuid}/profilepics/profile`);

      const uploadTask = uploadBytesResumable(storageRef, File);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
          setError(error.message);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            console.log(serverTimestamp());
            updateProfile(auth.currentUser, {
              displayName: `${Fullname}`,
              photoURL: `${downloadURL}`,
            })
              .then(() => {
                console.log("profileupdated");
              })
              .catch((error) => {
                // An error occurred
                // ...
              });

            setDoc(doc(db, "users", uuid), {
              email: `${email}`,
              Userid: `${uuid}`,
              Username: `${Username}`,
              Name: `${Fullname}`,
              profilepic: `${downloadURL}`,
              createdat: serverTimestamp(),
            });
          });
        }
      );
    } catch (err) {
      setError(err.message);
      setOpen(true);
      setTimeout(() => {
        setError("");
        setOpen(false);
      }, 5000);
      setLoading(false);
      return;
    }
    setLoading(false);
    navigate("/Login");
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" className="signup-main-cont" sx={{display:"flex"}}>
        {/* <CssBaseline /> */}

     <div className="signup-wrapper">
          <Box
            className="signup-cont"
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: 1,
              borderColor: "grey.500",
              width: 400,
              height: 600,
              mx: "auto", // margin left & right
              my: 1, // margin top & bottom
              py: 2, // padding top & bottom
              px: 2, // padding left & right
              display: "flex",
              gap: 2,
              borderRadius: "sm",
              boxShadow: "md",
              borderRadius:"1rem"

            }}
          >
            <div className="signup-logo">
              {" "}
              <img src={Instagram} />
            </div>

            <Typography component="h4" variant="h6" fontSize={"12px"}>
              Sign up to see photos and videos from your friends.
            </Typography>
            <Box
              component="form"
              Validate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
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
                    autoComplete="given-name"
                    name="FullName"
                    required
                    fullWidth
                    id="FullName"
                    label="Full Name"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="UserName"
                    required
                    fullWidth
                    id="UserName"
                    label="Username"
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
                <Grid className="upload-btn">
                  <Button
                    startIcon={<CloudUploadOutlined />}
                    // fullWidth

                    size="small"
                    fullWidth={true}
                    variant="outlined"
                    sx={{ mt: 3, mb: 2, margin: 2 }}
                    component="label"
                  >
                    Upload Image
                    <input
                      type="file"
                      accept="images/*"
                      hidden
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Collapse in={open}>
                    <Alert
                      severity="error"
                      className="alert1"
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpen(false);
                            setError("");
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                      sx={{ mb: 0 }}
                    >
                      {Error}
                    </Alert>
                  </Collapse>
                </Grid>

                {!open && (
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label={
                        <Typography fontSize={"12px"}>
                          By signing up, you agree to our Terms , Privacy Policy
                          and Cookies Policy.
                        </Typography>
                      }
                    />
                  </Grid>
                )}
              </Grid>

              <Button
                disabled={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/Login">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Copyright sx={{ mt: 2 }} />
          </div>
       
      </Container>
    </ThemeProvider>
  );
}

import { useRef, useState } from 'react';
import React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function RegisterForm(props) {

    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const nameInputRef = useRef();
    const surnameInputRef = useRef();
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const repeatPasswordInputRef = useRef();
    const emailInputRef = useRef();
    const imgUrlInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredSurname = surnameInputRef.current.value;
        const enteredUsername = usernameInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const repeatedPassword = repeatPasswordInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredImgUrl = imgUrlInputRef.current.value;

        if(enteredPassword !== repeatedPassword){
          setOpen(true);
          return setErrorMessage("Passwords dont match!");
        }
    

      const userData = {
          name: enteredName,
          surname: enteredSurname,
          username: enteredUsername,
          password: enteredPassword,
          email: enteredEmail,
          imgUrl: enteredImgUrl,
      };

        props.onUserAdd(userData);
      }

      const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
  
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    return (
      
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={submitHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  inputRef={nameInputRef}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="surname"
                  label="Last Name"
                  name="surname"
                  autoComplete="family-name"
                  inputRef={surnameInputRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="email"
                  inputRef={usernameInputRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputRef={emailInputRef}
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
                  inputRef={passwordInputRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Repeat Password"
                  type="password"
                  id="password"
                  autoComplete="repeat-password"
                  inputRef={repeatPasswordInputRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="imgUrl"
                  label="Profile Photo"
                  type="url"
                  id="imgUrl"
                  autoComplete="imgUrl"
                  inputRef={imgUrlInputRef}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>

      </Container>






        /*
        <Card>
          <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
              <label htmlFor='name'>Name</label>
              <input type='text' required id='name' ref={nameInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor='surname'>Surname</label>
              <input type='text' required id='surname' ref={surnameInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor='username'>Username</label>
              <input type='text' required id='username' ref={usernameInputRef} />
            </div>
            <div className={classes.control}>
             <label htmlFor='password'>Password</label>
             <input type='password' required id='password' ref={passwordInputRef} />
            </div>
            <div className={classes.control}>
             <label htmlFor='password'>Repeat password</label>
             <input type='password' required id='password' ref={repeatPasswordInputRef} />
            </div>
            <div className={classes.control}>
             <label htmlFor='email'>Email</label>
             <input type='text' required id='email' ref={emailInputRef} />
            </div>
            <div className={classes.control}>
             <label htmlFor='imgUrl'>Profile photo link</label>
             <input type='url' required id='imgUrl' ref={imgUrlInputRef} />
            </div>
            <div className={classes.actions}>
              <button>Register</button>
            </div>
          </form>
        </Card>
        */
      );

}

export default RegisterForm;
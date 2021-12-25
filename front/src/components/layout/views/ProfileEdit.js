import React from 'react';
import { useRef } from 'react';
import Card from '../../ui/Card';
import classes from './ProfileEdit.module.css';

import {Navigate} from 'react-router-dom';
import {useState} from 'react';

import logout from '../../../logic/Logout'

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
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function ProfileEdit(props) {

    const loadedProfile = props.profile;
    const [changed, setChanged] = useState(false);
    const [usernameChanged, setUsernameChanged] = useState(false);

    const nameInputRef = useRef();
    const surnameInputRef = useRef();
    const usernameInputRef = useRef();
    const emailInputRef = useRef();
    const imgUrlInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        

        const enteredName = nameInputRef.current.value;
        const enteredSurname = surnameInputRef.current.value;
        const enteredUsername = usernameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredImgUrl = imgUrlInputRef.current.value;

        const userData = {
            name: enteredName,
            surname: enteredSurname,
            username: enteredUsername,
            email: enteredEmail,
            imgUrl: enteredImgUrl
        };

        fetch(
            'http://localhost:8080/users/edit/' + loadedProfile.id,
           {
             method: 'PUT',
             body: JSON.stringify(userData),
             headers: {
                 'Content-Type': 'application/json',
                      },
             credentials: 'include'
            }
     
         ).then((response) => {
           if(response.status === 202) {
             console.log(response)
             setChanged(true);
             alert("Profile changed")
           }
           else{
             console.log(response)
             alert("Unknown error!")
           }
     
         })
         };
    
    if(changed && !(usernameChanged)){
      window.location.reload();
    }
    else if(changed && usernameChanged) {
      logout();
      return(<Navigate to="/login" />)
    }

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
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit profile
          </Typography>
          <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
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
                  defaultValue={loadedProfile.name}
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
                  defaultValue={loadedProfile.surname}
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
                  defaultValue={loadedProfile.username}
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
                  defaultValue={loadedProfile.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="imgUrl"
                  label="Profile Photo"
                  type="url"
                  id="imgUrl"
                  autoComplete="imgUrl"
                  inputRef={imgUrlInputRef}
                  defaultValue={loadedProfile.imgUrl}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change profile info
            </Button>
          </Box>
        </Box>
      </Container>







      /*
        <Card>
          <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
              <label htmlFor='name'>Name</label>
              <input type='text' required id='name' ref={nameInputRef} defaultValue={loadedProfile.name} />
            </div>
            <div className={classes.control}>
              <label htmlFor='surname'>Surname</label>
              <input type='text' required id='surname' ref={surnameInputRef} defaultValue={loadedProfile.surname}/>
            </div>
            <div className={classes.control}>
              <label htmlFor='username'>Username</label>
              <input type='text' required id='username' ref={usernameInputRef} defaultValue={loadedProfile.username}
              onChange={event => setUsernameChanged(true)}/>
            </div>
            <div className={classes.control}>
             <label htmlFor='email'>Email</label>
             <input type='text' required id='email' ref={emailInputRef} defaultValue={loadedProfile.email}/>
            </div>
            <div className={classes.control}>
             <label htmlFor='imgUrl'>Profile photo link</label>
             <input type='url' required id='imgUrl' ref={imgUrlInputRef} defaultValue={loadedProfile.imgUrl}/>
            </div>
            <div className={classes.actions}>
              <button>Change profile info</button>
            </div>
          </form>
        </Card>
      */
      );
}

export default ProfileEdit;
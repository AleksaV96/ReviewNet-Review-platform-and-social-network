import React from 'react';
import { useRef } from 'react';
import {Navigate} from 'react-router-dom';
import {useState} from 'react';

import logout from '../../../logic/Logout'
import Card from '@mui/material/Card';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Alert from '@mui/material/Alert';

function ProfilePasswordChange(props){

    const loadedProfile = props.profile;
    const [changed, setChanged] = useState(false);
    const [alertBox, setAlertBox] = useState();

    const oldPasswordInputRef = useRef();
    const newPasswordInputRef = useRef();
    const repeatNewPasswordInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
    
        const enteredOldPassword = oldPasswordInputRef.current.value;
        const enteredNewPassword = newPasswordInputRef.current.value;
        const enteredRepeatedPassword = repeatNewPasswordInputRef.current.value;

        if(enteredNewPassword !== enteredRepeatedPassword){
            return setAlertBox(<Alert variant="filled" severity="error">
            "Passwords dont match!"
          </Alert>)
        }

        const password = {
            oldPassword: enteredOldPassword,
            newPassword: enteredNewPassword
        };

        fetch(
            'http://localhost:8080/users/change-password/' + loadedProfile.id,
           {
             method: 'PUT',
             body: JSON.stringify(password),
             headers: {
                 'Content-Type': 'application/json',
                      },
             credentials: 'include'
            }
     
         ).then((response) => {
           if(response.status === 202) {
             console.log(response)
             setChanged(true);
             alert("Password changed!")
           }
           else if(response.status === 401) {
            setAlertBox(<Alert variant="filled" severity="error">
            "Wrong password!"
            </Alert>)
           }
           else{
            setAlertBox(<Alert variant="filled" severity="error">
            "Unknown error"
            </Alert>)
           }

        })
        };
    
    if(changed){
        logout();
        return(<Navigate to="/login" />)
    }

    return (

      <Card sx={{ marginBottom: 2}}>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 3,
          marginBottom: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <VpnKeyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change password
        </Typography>
        <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Old password"
                type="password"
                id="password"
                autoComplete="old-password"
                inputRef={oldPasswordInputRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="New Password"
                type="password"
                id="password"
                autoComplete="new-password"
                inputRef={newPasswordInputRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Repeat New Password"
                type="password"
                id="password"
                autoComplete="repeat-password"
                sx={{marginBottom:"5mm"}}
                inputRef={repeatNewPasswordInputRef}
              />
            </Grid>
          </Grid>
          {alertBox}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Change password
          </Button>
        </Box>
      </Box>
    </Container>
    </Card>

      );
}

export default ProfilePasswordChange;
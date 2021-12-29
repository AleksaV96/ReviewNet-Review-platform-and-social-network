import React from 'react';
import RegisterForm from '../components/forms/RegisterForm'
import LandingPageLayout from '../components/layout/LandingPageLayout';
import {Navigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import {useState} from 'react';

function Register() {

  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function addUserHandler(userData) {

    fetch(
       'http://localhost:8080/users/register/moderator',
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
                 }
        
      }

    ).then((response) => {
      if(response.status === 201) {
        console.log(response)
        setErrorMessage("AccountCreated!")
        setOpen(true);
        setRedirect(true)
      }
      else if(response.status === 226) {
        setErrorMessage("Username already in use!")
        setOpen(true);
      }
      else{
        setErrorMessage("Unknown error")
        setOpen(true);
      }

    })
    };
    
    if(redirect){
      return <Navigate to="/login"/>
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

    return(
      
      <LandingPageLayout>
        <section>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
          <RegisterForm onUserAdd={addUserHandler} />
        </section>
      </LandingPageLayout>
    );
}

export default Register;
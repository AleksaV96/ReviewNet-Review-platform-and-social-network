import React from 'react';
import RegisterForm from '../components/forms/RegisterForm'
import LandingPageLayout from '../components/layout/LandingPageLayout';
import {Navigate } from 'react-router-dom';

import {useState} from 'react';

function Register() {

  const [redirect, setRedirect] = useState(false);

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
        alert("Account created!")
        setRedirect(true)
      }
      else if(response.status === 226) {
        alert("Username already in use!")
      }
      else{
        alert("Unknown error!")
      }

    })
    };
    
    if(redirect){
      return <Navigate to="/login"/>
    }

    return(
      <LandingPageLayout>
        <section>
          <RegisterForm onUserAdd={addUserHandler} />
        </section>
      </LandingPageLayout>
    );
}

export default Register;
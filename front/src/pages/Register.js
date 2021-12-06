import RegisterForm from '../components/forms/RegisterForm'
import LandingPageLayout from '../components/layout/LandingPageLayout';
import {Navigate } from 'react-router-dom';

import {useState} from 'react';

function Register() {

  const [redirect, setRedirect] = useState(false);
  //http://localhost:8080/users/register/subscriber
  //https://mock-server-a8a92-default-rtdb.firebaseio.com/users.json

  function addUserHandler(userData) {

    
    
    fetch(
       'http://localhost:8080/users/register/admin',
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
        }
        
    },
    setRedirect(true),
    console.log(JSON.stringify(userData))
    )};
    
    if(redirect){
      return <Navigate to="/login"/>
    }

    return(
      <LandingPageLayout>
        <section>
          <h1>Register</h1>
          <RegisterForm onUserAdd={addUserHandler} />
        </section>
      </LandingPageLayout>
    );
}

export default Register;
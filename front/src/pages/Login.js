import React from 'react';
import LandingPageLayout from "../components/layout/LandingPageLayout";
import LoginForm from "../components/forms/LoginForm";

import {Navigate} from 'react-router-dom';
import {useState} from 'react';


function Login() {

    //const [redirect, setRedirect] = useState(false);
    const [token, setToken] = useState({});
    const [status, setStatus] = useState();

    function loginHandler(loginData) {
        
        fetch(
           'http://localhost:8080/auth/login',
          {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }
        ).then((response) => {
            setStatus(response.status);
            return response.json();
        }).then((data) => {
            setToken(data);
        })
        };
    
    if(JSON.stringify(token) !== "{}"){
        if(status === 200){
            localStorage.setItem(token.tokenType, token.accessToken);
            return <Navigate to="/main"/>
        }
        else{
            alert("WRONG USERNAME OR PASSWORD");
            window.location.reload(); // temp fix
        }
    }

    return(
        <LandingPageLayout>
                <LoginForm onLogin={loginHandler}/>
        </LandingPageLayout>
    );

}

export default Login;
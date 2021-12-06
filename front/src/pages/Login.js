import LandingPageLayout from "../components/layout/LandingPageLayout";
import LoginForm from "../components/forms/LoginForm";

import {Navigate } from 'react-router-dom';
import {useState} from 'react';


function Login() {

    const [redirect, setRedirect] = useState(false);

    function loginHandler(loginData) {

        fetch(
           'http://localhost:8080/login',
          {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }
        ).then((response) => {
            if(response.status === 200){
                setRedirect(true);
            }
            else{
                alert("WRONG USERNAME OR PASSWORD")
            }
        })
        };
    
    if(redirect){
        return <Navigate to="/main"/>
    }

    return(
        <LandingPageLayout>
            <section>
                <h1>Login</h1>
                    <LoginForm onLogin={loginHandler}/>
                </section>
        </LandingPageLayout>
    );


}

export default Login;
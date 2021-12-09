import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './Form.module.css';


function LoginForm(props){

      const usernameInputRef = useRef();
      const passwordInputRef = useRef();


      function submitHandler(event) {
        event.preventDefault();

        const enteredUsername = usernameInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
    
        const loginData = {
            username: enteredUsername,
            password: enteredPassword,
        };

          props.onLogin(loginData);

        }



      return (
          <Card>
            <form className={classes.form} onSubmit={submitHandler}>
              <div className={classes.control}>
                <label htmlFor='username'>Username</label>
                <input type='name' required id='username' ref={usernameInputRef} />
              </div>
              <div className={classes.control}>
                <label htmlFor='password'>Password</label>
                <input type='password' required id='password' ref={passwordInputRef}/>
              </div>
              <div className={classes.actions}>
                  <button>Login</button>
              </div>
            </form>
          </Card>
      );
}
export default LoginForm;

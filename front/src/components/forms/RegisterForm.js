import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './Form.module.css';

function RegisterForm(props) {

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
          return alert("PASSWORDS DONT MATACH!")
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

    return (
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
      );

}

export default RegisterForm;
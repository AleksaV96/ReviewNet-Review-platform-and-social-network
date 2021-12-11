import { useRef } from 'react';
import Card from '../../ui/Card';
import classes from './ProfileEdit.module.css';

import {Navigate} from 'react-router-dom';
import {useState} from 'react';

import logout from '../../../logic/Logout'

function ProfilePasswordChange(props){

    const loadedProfile = props.profile;
    const [changed, setChanged] = useState(false);

    const oldPasswordInputRef = useRef();
    const newPasswordInputRef = useRef();
    const repeatNewPasswordInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
    
        const enteredOldPassword = oldPasswordInputRef.current.value;
        const enteredNewPassword = newPasswordInputRef.current.value;
        const enteredRepeatedPassword = repeatNewPasswordInputRef.current.value;

        if(enteredNewPassword !== enteredRepeatedPassword){
            return alert("PASSWORDS DONT MATACH!")
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
            alert("Wrong password!")
           }
           else{
             console.log(response)
             alert("Unknown error!")
           }

        })
        };
    
    if(changed){
        logout();
        return(<Navigate to="/login" />)
    }

    return (
        <Card>
          <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='password'>Old Password</label>
                <input type='password' required id='password' ref={oldPasswordInputRef} />
            </div>
            <div className={classes.control}>
             <label htmlFor='password'>New password</label>
             <input type='password' required id='password' ref={newPasswordInputRef} />
            </div>
            <div className={classes.control}>
             <label htmlFor='password'>Repeat new password</label>
             <input type='password' required id='password' ref={repeatNewPasswordInputRef} />
            </div>
            <div className={classes.actions}>
              <button>Change password</button>
            </div>
          </form>
        </Card>
      );
}

export default ProfilePasswordChange;
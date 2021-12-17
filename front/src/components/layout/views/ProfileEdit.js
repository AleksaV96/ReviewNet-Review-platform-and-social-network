import React from 'react';
import { useRef } from 'react';
import Card from '../../ui/Card';
import classes from './ProfileEdit.module.css';

import {Navigate} from 'react-router-dom';
import {useState} from 'react';

import logout from '../../../logic/Logout'

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
      );
}

export default ProfileEdit;
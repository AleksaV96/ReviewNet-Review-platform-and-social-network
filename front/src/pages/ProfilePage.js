import React from 'react';
import { useContext } from 'react';
import ProfileView from '../components/layout/views/ProfileView';
import ProfileEdit from '../components/layout/views/ProfileEdit';
import UserContext from '../store/user-context';

import useStyles from './pages.style';

import { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import ProfilePasswordChange from '../components/layout/views/ProfilePasswordChange';

function ProfilePage() {
    const classes = useStyles();

    const userCtx = useContext(UserContext); 
    const [loadedUser, setLoadedUser] = useState({});
    const [editProfileMode, setEditProfileMode] = useState(false);
    const [passwordChangeMode, setPasswordChangeMode] = useState(false);

    const address = 'http://localhost:8080/users/' + userCtx.content.username;
    
    useEffect(() => {
        fetch(
            address,
            {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
            }
        )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
  
            const user = {
                "id" : data.id,
                "name" : data.name,
                "surname" : data.surname,
                "username" : data.username,
                "permission" : data.permission,
                "email" : data.email,
                "imgUrl" : data.imgUrl
            }
            setLoadedUser(user);
            });

        }, [address]);
    
    function editProfileHandler() {
        setEditProfileMode(!(editProfileMode));
    }
    function passwordChangeHandler() {
        setPasswordChangeMode(!(passwordChangeMode));
    }

    if(editProfileMode) {
        return(
        <MainLayout>
            <ProfileEdit profile={loadedUser} />
            <button onClick={editProfileHandler}>BACK</button>
        </MainLayout>
        )
    }

    else if(passwordChangeMode) {
        return(
        <MainLayout>
            <ProfilePasswordChange profile={loadedUser}/>
            <button onClick={passwordChangeHandler}>BACK</button>
        </MainLayout>
        )
    }


    return (
        <MainLayout >
            <ProfileView profile={loadedUser}/>
            <button onClick={editProfileHandler}>EDIT</button>
            <button onClick={setPasswordChangeMode}>CHANGE PASSWORD</button>
        </MainLayout>
    )
}

export default ProfilePage;
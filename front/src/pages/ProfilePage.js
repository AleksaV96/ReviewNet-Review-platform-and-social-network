import React from 'react';

import ProfileView from '../components/layout/views/ProfileView';
import ProfileEdit from '../components/layout/views/ProfileEdit';
import UserContext from '../store/user-context';
import { useContext } from 'react';

import useStyles from './pages.style';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

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
            <Button variant="contained" onClick={editProfileHandler}>BACK</Button>
        </MainLayout>
        )
    }

    else if(passwordChangeMode) {
        return(
        <MainLayout>
            <ProfilePasswordChange profile={loadedUser}/>
            <Button variant="contained" onClick={passwordChangeHandler}>BACK</Button>
        </MainLayout>
        )
    }


    return (
        <MainLayout >
            <ProfileView profile={loadedUser}/>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={editProfileHandler}>EDIT</Button>
                <Button onClick={setPasswordChangeMode}>CHANGE PASSWORD</Button>
            </ButtonGroup>
        </MainLayout>
    )
}

export default ProfilePage;
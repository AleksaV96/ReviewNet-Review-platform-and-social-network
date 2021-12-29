import React from 'react';

import ProfileView from '../components/layout/views/ProfileView';
import ProfileEdit from '../components/layout/views/ProfileEdit';
import UserContext from '../store/user-context';
import { useContext } from 'react';

import useStyles from './pages.style';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DiamondIcon from '@mui/icons-material/Diamond';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import ProfilePasswordChange from '../components/layout/views/ProfilePasswordChange';
import parseJwt from '../logic/JWTutil'
import logout from '../logic/Logout'

function ProfilePage() {
    const classes = useStyles();
    const userCtx = useContext(UserContext); 
    const [loadedUser, setLoadedUser] = useState({});
    const [editProfileMode, setEditProfileMode] = useState(false);
    const [passwordChangeMode, setPasswordChangeMode] = useState(false);

    let premiumButton;

    let role;
    let userId;
    let token = localStorage.getItem('Bearer');

    if(token !== null){
        userId = parseJwt(token).sub;
        role = parseJwt(token).role[0].authority;
        console.log(role)
    }

    if(role==="ROLE_SUBSCRIBER"){
        premiumButton = <Button variant="contained" color='secondary' sx={{marginLeft:"3.7cm", backgroundColor:"#9c27b0"}}  onClick={upgradeToPremiumHandler}>
        <DiamondIcon/>
        UPGRADE TO PREMIUM
        </Button>
    }
    else if(role==="ROLE_MODERATOR"){
        premiumButton = <Button variant="contained" color='error' sx={{marginLeft:"4.6cm", backgroundColor:"#a31545"}}  onClick={cancelPremiumHandler}>
        <CancelIcon/>
        CANCEL PREMIUM
        </Button>
    }

    
    const address = 'http://localhost:8080/users/' + userCtx.content.username;
    const address2 = 'http://localhost:8080/users/' + userId + '/update-user-role/moderator'
    const address3 = 'http://localhost:8080/users/' + userId + '/update-user-role/subscriber'
    
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
                "imgUrl" : data.imgUrl,
                "friends" : data.friends,
                "subscribed" : data.subscribed
            }
            setLoadedUser(user);
            });

        }, [address]);
    
    function upgradeToPremiumHandler() {
        fetch(
            address2,
            {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json',
            },
            credentials: 'include'
            }        
            ).then((response) => {
                console.log(response);
                logout();
            }
    )};
    
    function cancelPremiumHandler() {
        fetch(
            address3,
            {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json',
            },
            credentials: 'include'
            }        
            ).then((response) => {
                console.log(response);
                logout();
            }
    )};  
    
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
            <Button variant="contained" onClick={editProfileHandler}><ArrowBackIosNewIcon/>BACK</Button>
        </MainLayout>
        )
    }

    else if(passwordChangeMode) {
        return(
        <MainLayout>
            <ProfilePasswordChange profile={loadedUser}/>
            <Button variant="contained" onClick={passwordChangeHandler}><ArrowBackIosNewIcon/>BACK</Button>
        </MainLayout>
        )
    }


    return (
        <MainLayout >
            <ProfileView profile={loadedUser}/>
            <ButtonGroup sx={{display:"inline"}} variant="contained" aria-label="outlined primary button group">
                <Button onClick={editProfileHandler}><EditIcon/>EDIT</Button>
                <Button onClick={setPasswordChangeMode}><LockIcon/>CHANGE PASSWORD</Button>
            </ButtonGroup>
            {premiumButton}
        </MainLayout>
    )
}

export default ProfilePage;
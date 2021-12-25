import React from 'react';
import { Navigate, useParams } from "react-router";
import ProfileView from '../components/layout/views/ProfileView';
import ProfilePage from './ProfilePage';


import useStyles from './pages.style';
import UserContext from '../store/user-context';
import { useContext } from 'react';

import parseJwt from '../logic/JWTutil'

import { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';

import {Button} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

function UserPage(){
    const { username } = useParams();
    const userCtx = useContext(UserContext); 
    const classes = useStyles();
    const [loadedUser, setLoadedUser] = useState({});
    var friends = [];
    var isUser = false;
    
    const address = 'http://localhost:8080/users/' + username;
    
    let token = localStorage.getItem('Bearer');

    if(token !== null){
        const userId = parseJwt(token).sub;
        if(userId === loadedUser.id){
            isUser = true;
        }  
        var address2 = 'http://localhost:8080/users/userId/' + userId + '/add-friend/' + loadedUser.id;
        var address3 = 'http://localhost:8080/users/userId/' + userId + '/remove-friend/' + loadedUser.id;
    }



    if(userCtx.content.friends !== undefined){
        friends = userCtx.content.friends;
      }
    
    var addFriendButton = <Button onClick={addFriendHandler} variant="contained">Add friend<PersonAddIcon/></Button>

    
    for(let i=0; i<friends.length; i++){
        if(friends[i] === loadedUser.id){
            addFriendButton = <Button onClick={removeFriendHandler} variant="outlined">Remove friend<PersonRemoveIcon/></Button>
            break;
        }
    }

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
                "friends" : data.friends
            }
            setLoadedUser(user);
            });

        }, [address]);

        function addFriendHandler() {
            fetch(
              address2,
            {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              credentials: 'include'
              }
            ).then((response) => {
              window.location.reload();
            }
            )};

        function removeFriendHandler() {
            fetch(
            address3,
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
            }
            ).then((response) => {
            window.location.reload();
            }
        )};
        
        if(isUser){
            return(
                <ProfilePage />
            );
        }

        return (
            <MainLayout >
                <ProfileView profile={loadedUser}/>
                {addFriendButton}
            </MainLayout>
        )

}

export default UserPage;
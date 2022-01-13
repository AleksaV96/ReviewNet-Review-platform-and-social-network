import React from 'react';
import { useParams } from "react-router";
import UserView from '../components/layout/views/UserView';
import DeletedUserView from '../components/layout/views/DeletedUserView';
import ProfilePage from './ProfilePage';

import UserContext from '../store/user-context';
import { useContext } from 'react';

import parseJwt from '../logic/JWTutil'

import { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';

import {Button} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function UserPage(){
    const { username } = useParams();
    const userCtx = useContext(UserContext); 
    const [loadedUser, setLoadedUser] = useState({});
    const [isDeleted, setIsDeleted] = useState(false);
    var friends = [];
    var isUser = false;

    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
  
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };
    
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
            if(response.status === 404){
                setIsDeleted(true);
                setOpen(true);
                return setErrorMessage("User is deleted!");
            }
            return response.json();
            
        })
        .then((data) => {
            try{
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
            }
            catch(e) {}
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


        if(isDeleted){
            return(
            <MainLayout >
                <DeletedUserView />
                <Snackbar anchorOrigin={{vertical:'bottom', horizontal:'center'}} open={open} autoHideDuration={10000} onClose={handleClose}>
                <Alert  onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
                </Snackbar>
            </MainLayout>
            );
        }

        
        return (
            <MainLayout >
                <UserView profile={loadedUser}/>
                {addFriendButton}
            </MainLayout>
        )




}

export default UserPage;
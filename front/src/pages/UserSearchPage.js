import React from 'react';
import { useState, useEffect } from 'react';
import SearchForm from '../components/forms/SearchForm'
import FriendCard from '../components/layout/cards/FriendCard';
import MainLayout from '../components/layout/MainLayout';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


function UserSearchPage(){

    let searchCard = "";

    const [loadedUser, setLoadedUser] = useState({});
    const [ address, setAddress ] = useState("");

    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function userSearchHandler(name){
        setAddress('http://localhost:8080/users/' + name);
    }

    
        useEffect(() => {
            if(address !== "") {
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
                if(response.status === 404) {
                    console.log(response)
                    setLoadedUser({});
                    setErrorMessage("User not found!")
                    setOpen(true);
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
                    "subscribed" : data.subscribed,
                    "settings" : data.profile.profileSettings
                }
                setLoadedUser(user);
                }
                catch(e) {}
                });
            }
        }, [address]);
    
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
    }
    setOpen(false);
    };

    

    if(loadedUser.id !== undefined){
        console.log(loadedUser);
        searchCard =<FriendCard
        username={loadedUser.username}name={loadedUser.name} surname={loadedUser.surname}
        imgUrl={loadedUser.imgUrl} id={loadedUser.id} settings={loadedUser.settings}/>
    }

    return(
        <MainLayout>
            <SearchForm onSearch={userSearchHandler}/>
            {searchCard}
            <Snackbar open={open} sx={{ width: '30%' }} autoHideDuration={1800} anchorOrigin={{horizontal:"center", vertical:"bottom"}} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {errorMessage}
            </Alert>
            </Snackbar>
        </MainLayout>

    );
}

export default UserSearchPage;
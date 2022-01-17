import React from 'react';
import { useParams } from "react-router";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MainLayout from "../../layout/MainLayout";
import UserRestrictionsForm from "../../forms/UserRestrictionsForm";
import { Button, Card, Typography, Avatar, CardHeader } from '@mui/material';
import { ButtonGroup } from '@mui/material';
import ProfileSettingsForm from '../../forms/ProfileSettingsForm';
import UserRoleForm from '../../forms/UserRoleForm';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function ProfileAdminEdit(props) {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [loadedUser, setLoadedUser] = useState({});
    const [activeStatus, setActiveStatus] = useState("");
    const [loadedProfile, setLoadedProfile] = useState({});
    
    let activeStat = "";
    let clr = "";
    let roleTxt = "";

    if(activeStatus==="INACTIVE"){
      activeStat = <Typography  sx={{display:'inline', fontWeight:"bold"}} variant="h4" color="red"> INACTIVE</Typography>
    }
    else if(activeStatus==="ACTIVE"){
      activeStat = <Typography  sx={{display:'inline', fontWeight:"bold"}} variant="h4" color="green"> ACTIVE</Typography>
    }

    if(loadedUser.role === "ROLE_SUBSCRIBER"){
      clr = "#f5f5f5";
      roleTxt = "SUBSCRIBER";
    }
    else if(loadedUser.role === "ROLE_MODERATOR"){
      clr = "#e0f2f1";
      roleTxt = "MODERATOR";
    }
    else if(loadedUser.role === "ROLE_ADMIN"){
      clr = "#c5cae9";
      roleTxt = "ADMIN";
    }

    const address = 'http://localhost:8080/users/admin/userId/' + id;
    const address2 = 'http://localhost:8080/users/userId/' + id + '/set-active-status';
    const address3 = 'http://localhost:8080/users/userId/' + id + '/update-profile-settings';


    useEffect(() => {
        setIsLoading(true);
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

            if(data.logicDelete){
                setActiveStatus("INACTIVE");
            }
            else{
                setActiveStatus("ACTIVE");
            }
            
            const user = {
                "id" : data.id,
                "username" : data.username,
                "name" : data.name,
                "surname" : data.surname,
                "email" : data.email,
                "activeStatus" : data.logicDelete,
                "permission" : data.permission,
                "imgUrl" : data.imgUrl,
                "role" : data.permission.authority
            }
            const profile = {
              "addFriend" : data.profile.profileSettings.addFriend,
              "showFriends" : data.profile.profileSettings.showFriends,
              "showSubscriptions" : data.profile.profileSettings.showSubscriptions,
            }
            setLoadedProfile(profile);

            setLoadedUser(user);
            setIsLoading(false);
          });
      }, [address]);

      function profileSettingsHandler(profileSettings) {
        fetch(
            address3,
            {
             method: 'PUT',
             body: JSON.stringify(profileSettings),
             headers: {
                 'Content-Type': 'application/json',
            },
            credentials: 'include'
            },
         
            window.location.reload(),
            )
        }

      function activeStatusHandler(event) {
        fetch(
            address2,
            {
             method: 'PUT',
             body: JSON.stringify(event.target.value),
             headers: {
                 'Content-Type': 'application/json',
            },
            credentials: 'include'
            }        
            ).then((response) => {
                console.log(response);
                window.location.reload();
              }
            )};  
            
      if (isLoading) {
        return (
          <section>
            <p>Loading...</p>
          </section>
        );
      }

      let userLink = "/user/" + loadedUser.username;

      return(
          <MainLayout>
            <Card sx={{bgcolor:clr}}>
            <CardHeader 
            avatar =  {<Avatar alt="user" src={loadedUser.imgUrl}  sx={{ width: 100, height: 100 }} variant="square"></Avatar>}
            title = {<div><Typography sx={{display:'inline'}} variant="h3">{loadedUser.username}</Typography>{activeStat}
            <Typography color="red" sx={{fontWeight:"bold"}} variant="h5">{roleTxt}</Typography></div>}
            subheader = {<div><Typography variant="h5">{loadedUser.name} {loadedUser.surname}</Typography>
            <Typography  variant="h5"><span style={{color:"black"}}>email:</span> {loadedUser.email}</Typography></div>}
            />
              <ButtonGroup sx={{margin:"15px"}} variant="contained">
                <Button color="primary" onClick={activeStatusHandler} value={false}>ACTIVE</Button>
                <Button color="error" onClick={activeStatusHandler} value={true}>INACTIVE</Button>
              </ButtonGroup>
              <Button variant="contained" color="primary" sx={{marginLeft:"9.3cm"}} component={Link} to={userLink}><AccountBoxIcon/></Button>
            </Card>
              <UserRoleForm user={loadedUser} />
              <UserRestrictionsForm user={loadedUser}/>
              <ProfileSettingsForm onSettingsChange={profileSettingsHandler} loadedProfile={loadedProfile} />
            
          </MainLayout>
      )
} 

export default ProfileAdminEdit;
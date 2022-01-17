import React from 'react';
import { useParams } from "react-router";
import { useState, useEffect } from 'react';

import MainLayout from "../../layout/MainLayout";
import UserRestrictionsForm from "../../forms/UserRestrictionsForm";
import { Button, Card, Typography, Avatar, CardHeader } from '@mui/material';
import { ButtonGroup } from '@mui/material';

function ProfileAdminEdit(props) {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [loadedUser, setLoadedUser] = useState({});
    const [activeStatus, setActiveStatus] = useState("");
    
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
            console.log(data.permission);
            setLoadedUser(user);
            setIsLoading(false);
          });
      }, [address]);

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
                <Button color="success" onClick={activeStatusHandler} value={false}>ACTIVE</Button>
                <Button color="error" onClick={activeStatusHandler} value={true}>INACTIVE</Button>
              </ButtonGroup>
              </Card>
              <UserRestrictionsForm user={loadedUser}/>
            
          </MainLayout>
      )
} 

export default ProfileAdminEdit;
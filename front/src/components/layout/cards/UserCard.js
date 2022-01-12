import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Card, CardActions, CardContent, CardHeader, Typography, Button } from '@mui/material';

function UserCard(props) {

    const deleteButton = <Button sx={{display:"inline"}} size="small"
     variant="contained" color="warning" onClick={removeHandler}>X</Button>

    const link = '/dashboard/user/'+ props.id

    function removeHandler() {
      fetch(
        'http://localhost:8080/users/userId/' + props.id + '/remove',
      {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
        }
      ).then((response) => {
        window.location.reload()
      }
      )};  
    
    return (
      <Card sx={{marginBottom:"3px"}}>
        <CardHeader 
        avatar = {<Avatar component={Link} to={link} alt="user" src={props.imgUrl}></Avatar>}
        title = {<Typography component={Link} to={link}  variant="h6">{props.username}</Typography>}
        subheader = {<div><Typography color="text.secondary" >{props.name} {props.surname}
          </Typography>
          <Typography color="text.secondary" >{props.email}
          </Typography>
          </div>}
        />
        <CardActions>
        {deleteButton}
      </CardActions>
      </Card>
      );

}

export default UserCard;
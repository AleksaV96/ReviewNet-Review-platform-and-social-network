import { Button, Card, FormControlLabel, List, ListItem, ListItemButton, Radio, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';



function UserRestrictionsForm(props) {
    const [restriction, setRestriction] = useState(0);
    var user = props.user;
    const restrictions = props.user.permission.roleDetails.restrictions;
    const restList = restrictions.map((rest) => 
    <ListItem sx={{bgcolor:"#ffccbc"}} disablePadding><ListItemButton>{rest}</ListItemButton></ListItem>);

    function addRestrictionHandler(){
        
        const address = 'http://localhost:8080/users/' + user.id + '/restrict/' + restriction;

        fetch(
            address,
           {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json',
             },
             credentials: 'include'
         }
         ).then((response) => {
            console.log(response);
             window.location.reload();
         })
    };

    function removeRestrictionHandler(){
        
        const address = 'http://localhost:8080/users/' + user.id + '/remove-restriction/' + restriction;
        console.log(address);
        fetch(
            address,
           {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json',
             },
             credentials: 'include'
         }
         ).then((response) => {
             console.log(response);
             window.location.reload();
         })
    };


    return(
        
        <Card sx={{padding:"5mm", marginTop:"3mm", marginBottom:"5mm"}}>
            <Typography variant="h4">Restrict user funtions:</Typography>
            <FormControlLabel
            control={
            <Radio
            checked={restriction===1}
            onChange={() => setRestriction(1)}
            />
            }
            label="Add new element"
            />
            <FormControlLabel
            control={
            <Radio
            checked={restriction===2}
            onChange={() => setRestriction(2)}
            />
            }
            label="Comment"
            />
            <div>
                <Button sx={{marginRight:"3px"}} variant="contained" color="primary" onClick={addRestrictionHandler}>ADD</Button>
                <Button variant="contained" color="error" onClick={removeRestrictionHandler}>REMOVE</Button>
            </div>           
            <Typography sx={{marginTop:"5mm"}} variant="h6">{user.username} restrictions:</Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                aria-label="contacts">
            {restList}
            </List>       
        </Card>

    )
}

export default UserRestrictionsForm;
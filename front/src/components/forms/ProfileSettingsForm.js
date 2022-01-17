import { useState } from 'react';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';

function ProfileSettingsForm(props) {


    const [addFriend, setAddFriend] = useState(props.loadedProfile.addFriend);
    const [showFriends, setShowFriends] = useState(props.loadedProfile.showFriends);
    const [showSubscriptions, setShowSubscriptions] = useState(props.loadedProfile.showSubscriptions);

    function addFriendHandler(){
        setAddFriend(!addFriend);
    }
    function showFriendsHandler(){
        setShowFriends(!showFriends);
    }
    function showSubscriptionsHandler(){
        setShowSubscriptions(!showSubscriptions);
    }



    function submitHandler(event) {
        event.preventDefault();

        const profileSettings = {
            addFriend : addFriend,
            showFriends : showFriends,
            showSubscriptions : showSubscriptions
        };
        console.log(profileSettings)
        props.onSettingsChange(profileSettings);
    }


    return(
        <Card sx={{padding:"5mm"}}>
            <FormControl component="fieldset" variant="standard">
            <FormLabel sx={{marginBottom:"5mm" ,fontWeight:"bold"}} component="legend">Profile settings</FormLabel>
            <FormGroup sx={{marginBottom:"5mm"}}>
                <FormControlLabel
                control={
                    <Switch checked={addFriend} onChange={addFriendHandler} name="Add friend" />
                }
                label="Add friend"
                />
                <FormControlLabel
                control={
                    <Switch checked={showFriends} onChange={showFriendsHandler} name="Show friends" />
                }
                label="Show friends"
                />
                <FormControlLabel
                control={
                    <Switch checked={showSubscriptions} onChange={showSubscriptionsHandler} name="Show subcriptions" />
                }
                label="Show subscriptions"
                />
            </FormGroup>
                <Button variant="contained" onClick={submitHandler}>Submit</Button>
            </FormControl>
        </Card>
    );


}

export default ProfileSettingsForm;
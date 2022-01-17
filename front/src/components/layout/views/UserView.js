import { Card, CardHeader, CardContent, CardActions, Button, Avatar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import PeopleIcon from '@mui/icons-material/People';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

function UserView(props) {

    const loadedProfile = props.profile;
    let friendsCount;
    let subscriptionsCount;

    if(loadedProfile.friends && loadedProfile.friends !== undefined){
        friendsCount = loadedProfile.friends.length;
        subscriptionsCount = loadedProfile.subscribed.length;
    }

    let friendsButton = <Button component={Link} to={'/user/'+loadedProfile.id+'/friends'}><PeopleIcon/>Friends {friendsCount}</Button>;
    let subscriptionsButton = <Button component={Link} to={'/user/'+loadedProfile.id+'/subscriptions'}><SubscriptionsIcon/>Subscriptions {subscriptionsCount}</Button>

    try{
        if(loadedProfile.settings.showFriends === false){
            friendsButton = <Button disabled><PeopleIcon/>Friends</Button>;
        }

        if(loadedProfile.settings.showSubscriptions === false){
            subscriptionsButton = <Button disabled><SubscriptionsIcon/>Subscriptions</Button>
        }
    }
    catch(e){}

    return(
        <Card sx={{marginBottom:"5mm"}}>
        <CardHeader 
            avatar =  {<Avatar alt="user" src={loadedProfile.imgUrl}  sx={{ width: 100, height: 100 }} variant="square"></Avatar>}
            title = {<Typography sx={{display:'inline'}} variant="h3">{loadedProfile.username}</Typography>}
            subheader = {<Typography variant="h5">{loadedProfile.name} {loadedProfile.surname}</Typography>}
        />
        <CardContent>
         <Typography  variant="h5">email: {loadedProfile.email}</Typography>
         </CardContent>
        <CardActions disableSpacing>
            {friendsButton}
            {subscriptionsButton}
        </CardActions>
        </Card>

    );
}

export default UserView;
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
            <Button component={Link} to={'/user/'+loadedProfile.id+'/friends'}><PeopleIcon/>Friends {friendsCount}</Button>
            <Button component={Link} to={'/user/'+loadedProfile.id+'/subscriptions'}><SubscriptionsIcon/>Subscriptions {subscriptionsCount}</Button>
        </CardActions>
        </Card>

    );
}

export default UserView;
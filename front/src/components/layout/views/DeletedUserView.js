import { Card, CardHeader, Avatar, Typography } from '@mui/material';

function DeletedUserView(props) {

    return(
        <Card sx={{marginBottom:"5mm"}}>
        <CardHeader 
            avatar =  {<Avatar alt="user" src={"https://static.thenounproject.com/png/574748-200.png"}  sx={{ width: 100, height: 100 }} variant="square"></Avatar>}
            title = {<Typography sx={{display:'inline'}} variant="h3">DELETED USER</Typography>}
            subheader = {<Typography variant="h5"> </Typography>}
        />
        </Card>

    );
}

export default DeletedUserView;
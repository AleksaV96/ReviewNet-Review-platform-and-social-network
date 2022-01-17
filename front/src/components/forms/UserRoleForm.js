import { Button, Card, Typography } from "@mui/material";


function UserRoleForm(props){

    const userId = props.user.id;
    const address = 'http://localhost:8080/users/' + userId + '/update-user-role/subscriber'
    const address1 = 'http://localhost:8080/users/' + userId + '/update-user-role/moderator'
    const address2 = 'http://localhost:8080/users/' + userId + '/update-user-role/admin'

    function changeToSubscriber() {
        console.log(address)
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
                window.location.reload();
            }
    )};

    function changeToModerator() {
        fetch(
            address1,
            {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json',
            },
            credentials: 'include'
            }        
            ).then((response) => {
                window.location.reload();
            }
    )};

    function changeToAdmin() {
        console.log(address2)
        fetch(
            address2,
            {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json',
            },
            credentials: 'include'
            }        
            ).then((response) => {
                window.location.reload();
            }
    )};


    
    return(
        <Card sx={{padding:"5mm", marginTop:"3mm", marginBottom:"5mm"}}>

            <Typography sx={{marginBottom:"3mm"}} variant="h6">User role set: </Typography>
            <Button variant="contained" color="error" sx={{bgcolor:"#0091ea"}} onClick={changeToSubscriber}>Subscriber</Button>
            <Button variant="contained" color="error" sx={{bgcolor:"#009688", marginLeft:"2mm"}} onClick={changeToModerator}>Moderator</Button>
            <Button variant="contained" color="error" sx={{bgcolor:"#673ab7", marginLeft:"2mm"}} onClick={changeToAdmin}>Admin</Button>
        </Card>
    );
}

export default UserRoleForm;
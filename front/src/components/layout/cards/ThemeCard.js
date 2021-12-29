import { Button, Avatar, Card, CardActions, CardContent, CardHeader, Typography, IconButton, CardMedia } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import ReviewsIcon from '@mui/icons-material/Reviews';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import MapIcon from '@mui/icons-material/Map';

function ThemeCard(props) {
    const bcolor = "white";
    const icon = <ForumIcon/>
    return (
        <Card sx={{bgcolor:bcolor}}>
          <CardHeader 
            title={<Typography sx={{color:"black"}} variant="h5" component="div">{props.name}</Typography>}
            subheader={<Typography color="text.secondary" component="div">Posts: {props.posts.length}</Typography>}
            avatar={<Avatar sx={{bgcolor:"black"}}>{icon}</Avatar>}
          />
        </Card>
    );
}

export default ThemeCard;
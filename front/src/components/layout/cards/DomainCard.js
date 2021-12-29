import { Button, Avatar, Card, CardActions, CardContent, CardHeader, Typography, IconButton, CardMedia } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import ReviewsIcon from '@mui/icons-material/Reviews';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import MapIcon from '@mui/icons-material/Map';


function DomainCard(props) {

    let icon;
    let type;
    let bcolor;
    switch(props.type){
      case "forum":
        icon = <ForumIcon/>;
        type = "Forum";
        bcolor = "#1e88e5";
        break;
      case "reviewSpace":
        icon = <ReviewsIcon/>;
        type = "Reviews";
        bcolor = "#00897b";
        break;
      case "complainSpace":
        icon = <SentimentVeryDissatisfiedIcon/>;
        type = "Complains";
        bcolor = "#d81b60";
        break;
      case "roadMap":
        icon = <MapIcon/>;
        type = "RoadMap";
        bcolor = "#8e24aa";
        break;
    }

    return (

      <Card sx={{bgcolor:bcolor}}>
        <CardHeader 
          title={<Typography sx={{color:"white"}} variant="h5" component="div">{type}</Typography>}
          avatar={<Avatar sx={{bgcolor:bcolor}}>{icon}</Avatar>}
        />
      </Card>



      /*
        <div className={classes.item} key={props.id} id={props.id}>
          <Card>
            <div className={classes.content}>
              <h3>{props.name}</h3>
            </div>
          </Card>
        </div>
      */
      );

}

export default DomainCard;
import { Button, Avatar, Card, CardActions, CardContent, CardHeader, Typography, IconButton, CardMedia } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import ReviewsIcon from '@mui/icons-material/Reviews';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import MapIcon from '@mui/icons-material/Map';

function DomainList(props) {

    try{
      var sum = 0;
      for(var i = 0; i < props.grades.length; i++){
        sum += props.grades[i];
      }
      sum /= props.grades.length;
      sum = sum.toFixed(1);

      if(!isNaN(parseFloat(sum))){
        var elm = "Rating: " + sum
      }
    }
    catch(e){}

    let icon;
    let type;
    let bcolor;
    switch(props.domain.type){
      default:
        bcolor = "#9e9e9e";
        break;
      case "forum":
        icon = <ForumIcon fontSize="medium"/>;
        type = "Forum";
        bcolor = "#1e88e5";
        break;
      case "reviewSpace":
        icon = <ReviewsIcon fontSize="medium"/>;
        type = "Reviews";
        bcolor = "#009688";
        break;
      case "complainSpace":
        icon = <SentimentVeryDissatisfiedIcon fontSize="medium"/>;
        type = "Complains";
        bcolor = "#d81b60";
        break;
      case "roadMap":
        icon = <MapIcon fontSize="medium"/>;
        type = "RoadMap";
        bcolor = "#8e24aa";
        break;
    }

    return (
      <Card sx={{textAlign:"center", marginBottom:"1cm", bgcolor:bcolor}}>
        <Typography variant="h4" sx={{color:"white"}}>{icon} {props.domain.name}</Typography>
        <Typography variant="h5" sx={{color:"white"}}>{elm}</Typography>
      </Card>

      );
    
    

}

export default DomainList;
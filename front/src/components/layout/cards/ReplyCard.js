import React from 'react';
import classes from "./PostCard.module.css";
import { Link } from 'react-router-dom';

import UserContext from '../../../store/user-context';
import { useContext } from 'react';
import { Button, Avatar, Card, CardActions, CardContent, CardHeader, Typography, IconButton } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

function ReplyCard(props) {

    const userCtx = useContext(UserContext);
    var likes = [];
    var likeScore = 0;
    var username = userCtx.content.username;
    var likeButton = <IconButton  onClick={likeHandler}><ThumbUpOffAltIcon/></IconButton>
    var dislikeButton = <IconButton onClick={dislikeHandler}><ThumbDownOffAltIcon/></IconButton>

    if(props.likes !== undefined){
        likes = props.likes;
      }
  
      for(let i=0; i < likes.length; i++){
        likeScore += likes[i].value;
      }
    
      console.log(username)

      for(let i=0; i < likes.length; i++){
        if(likes[i].likeCreatorName === username){
          if(likes[i].type === "LIKE"){
            likeButton = <IconButton  onClick={unLikeHandler}><ThumbUpAltIcon color="info"/></IconButton>;
            dislikeButton = <IconButton disabled><ThumbDownOffAltIcon/></IconButton>;
            break;
          }
          else if(likes[i].type === "DISLIKE"){
            dislikeButton = <IconButton onClick={unDislikeHandler}><ThumbDownAltIcon color="error"/></IconButton>;
            likeButton = <IconButton disabled><ThumbUpOffAltIcon/></IconButton>;
            break;
          }
        }
      }
  

    let userLink = "/user/" + props.authorUsername;
    


    function likeHandler() {
        fetch(
          'http://localhost:8080/posts/replies/replyId/' + props.id + '/like',
        {
          method: 'POST',
          body: JSON.stringify({likeCreatorName : username, type : "LIKE", value : 1}),
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include'
          }
        ).then((response) => {
            console.log(response);
            window.location.reload();
        }
        )};  
  
        function unLikeHandler() {
          fetch(
            'http://localhost:8080/posts/replies/replyId/' + props.id + '/unlike',
          {
            method: 'POST',
            body: JSON.stringify({likeCreatorName : username, type : "LIKE"}),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
            }
          ).then((response) => {
            window.location.reload();
          }
          )};
        
        function dislikeHandler() {
          fetch(
            'http://localhost:8080/posts/replies/replyId/' + props.id + '/like',
          {
            method: 'POST',
            body: JSON.stringify({likeCreatorName : username, type : "DISLIKE", value : -1}),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
            }
          ).then((response) => {
            window.location.reload();
          }
          )};  
  
          function unDislikeHandler() {
            fetch(
              'http://localhost:8080/posts/replies/replyId/' + props.id + '/unlike',
            {
              method: 'POST',
              body: JSON.stringify({likeCreatorName : username, type : "DISLIKE"}),
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
        <Card sx={{marginBottom : "10px", bgcolor:"#e6e6e6", maxWidth:400}}>
        <CardHeader sx={{maxHeight:50}}
          avatar = {<Avatar alt="user" src={props.user.imgUrl} component={Link} to={userLink}></Avatar>}
          title = {<Typography sx={{display:'inline'}} variant="h6">{props.name}</Typography>}
          subheader = {<Typography color="text.secondary" component={Link} to={userLink}>{props.user.name} {props.user.surname}  replies
          </Typography>}
          />
        <CardContent sx={{maxHeight:50}}>
          <Typography variant="body1" color="text.secondary">{props.content}</Typography>
        </CardContent>
            <CardActions disableSpacing sx={{maxHeight:50}} >
                {likeButton}
                {likeScore}
                {dislikeButton}
            </CardActions>
      </Card>
    );

}
export default ReplyCard;
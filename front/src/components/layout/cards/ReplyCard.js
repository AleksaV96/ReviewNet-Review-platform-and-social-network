import React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import UserContext from '../../../store/user-context';
import { useContext } from 'react';
import { Collapse, Button, Avatar, Card, CardActions, CardContent, CardHeader, Typography, IconButton, Badge } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ReplyCard(props) {

    var replyIteration = parseInt(props.iteration, 10) + 0.85;
    var position = replyIteration + "cm"

    const userCtx = useContext(UserContext);
    var likes = [];
    var likeScore = 0;
    var username = userCtx.content.username;
    const [loadedPosts, setLoadedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    var likeButton = <IconButton  onClick={likeHandler}><ThumbUpOffAltIcon/></IconButton>
    var dislikeButton = <IconButton onClick={dislikeHandler}><ThumbDownOffAltIcon/></IconButton>
    var replyButton = <Button sx={{maxWidth:10}} onClick={replyHandler}>Reply</Button>

    if(userCtx.selectedPost === props.id){
      replyButton = <Button sx={{maxWidth:10}} onClick={replyHandler}>Replying</Button>
    }

    let clr = '#e6e6e6';
    if(props.parent==='post'){
      position = '0.1cm'
      clr = '#efebe9';
    }

    const address =  'http://localhost:8080/posts/postId/' + props.id + '/replies'

    const SmallAvatar = styled(Avatar)(({ theme }) => ({
      width: 22,
      height: 22,
      border: `2px solid`,
      borderColor: '#e6e6e6'
    }));

    if(props.likes !== undefined){
        likes = props.likes;
      }
  
      for(let i=0; i < likes.length; i++){
        likeScore += likes[i].value;
      }
    

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

      const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
        })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      }));


      const [expanded, setExpanded] = useState(false);
      const handleExpandClick = () => {
        setExpanded(!expanded);
      };
  

    let userLink = "/user/" + props.authorUsername;
    let parentUserLink = "/user/" + props.postUserUsername;
    


    function likeHandler() {
        fetch(
          'http://localhost:8080/posts/postId/' + props.id + '/like',
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
            'http://localhost:8080/posts/postId/' + props.id + '/unlike',
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
            'http://localhost:8080/posts/postId/' + props.id + '/like',
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
              'http://localhost:8080/posts/postId/' + props.id + '/unlike',
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

            function replyHandler(){
              if(userCtx.selectedPost === "" ){
                userCtx.setSelectedPost(props.id);
                userCtx.setSelectedPostAuthor(props.user.name + " " + props.user.surname);
              }
              else if(userCtx.selectedPost !== props.id){
                userCtx.setSelectedPost(props.id);
                userCtx.setSelectedPostAuthor(props.user.name + " " + props.user.surname);
              }
              else{
                userCtx.setSelectedPost("");
                userCtx.setSelectedPostAuthor("");
              }
            }

            useEffect(() => {
              setIsLoading(true);
              fetch(
                  address,
                  {
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  credentials: 'include'
                  }
              )
              .then((response) => {
                  return response.json();
              })
              .then((data) => {
                  const posts = [];
                  for (const key in data) {
                  const post = {
                      id: key,
                      ...data[key]
                  };
                  
                  posts.push(post);
                  }
                  setIsLoading(false);
                  setLoadedPosts(posts);
                  
              });
          }, [address]);
      
          if (isLoading) {
              return (
              <section>
                  <p>Loading...</p>
              </section>
              );
          }

    return(
      <div style={{position:"relative",borderLeft:"2px dotted #757575", left:position}}>
        <Card sx={{marginTop : "3px", bgcolor:clr, maxWidth:400, position:"relative", left:"2px"}}>
        <CardHeader sx={{maxHeight:50}}
          avatar = {
            <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <SmallAvatar alt="reply avatar" src={props.postUserImg} />
            }
            >
            <Avatar alt="porst avatar" src={props.user.imgUrl} />
          </Badge>
          }
          //title = {<Typography sx={{display:'inline'}} variant="h6">{props.name}</Typography>}
          subheader = {<div><Typography sx={{display:'inline', color:"#d81b60"}}  component={Link} to={userLink}>{props.user.name} {props.user.surname}</Typography>
          <Typography color="black" sx={{display:'inline'}}> replies to </Typography>
          <Typography color="text.secondary" sx={{display:'inline'}} component={Link} to={parentUserLink}>{props.postUserName} {props.postUserSurname}</Typography>
          </div>
          }
          />
        <CardContent sx={{maxHeight:50}}>
          <Typography variant="body1" color="text.secondary">{props.content}</Typography>
        </CardContent>
            <CardActions disableSpacing sx={{maxHeight:50}} >
                {likeButton}
                {likeScore}
                {dislikeButton}
                {replyButton}
                <Typography sx={{position:"relative", right:"-3cm"}} variant="body1" noWrap color="text.secondary">Replies: {props.replies.length}</Typography>
                <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
            </ExpandMore>
            </CardActions>
        </Card>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {loadedPosts.map((post)=>
          <ReplyCard
            key={post.id}
            id={post.id}
            name={post.name}
            content={post.content}
            likes={post.likes}
            authorUsername={post.authorUsername}
            user={post.author}
            postUserImg={props.user.imgUrl}
            replies={post.replies}
            postUserImg={props.postUserImg}  
            postUserName={props.postUserName} 
            postUserSurname={props.postUserSurname}
            postUserUsername={props.postUserUsername}   
            iteration={replyIteration}
          />
        )}
      </Collapse>
      </div> 
    );

}
export default ReplyCard;
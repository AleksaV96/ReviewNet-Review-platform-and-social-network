import React from 'react';
import classes from "./PostCard.module.css";
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import UserContext from '../../../store/user-context';
import { useContext } from 'react';
import { Collapse, Button, Avatar, Card, CardActions, CardContent, CardHeader, Typography, IconButton } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReplyList from '../lists/ReplyList';

import { useState, useEffect } from 'react';
import ReplyCard from './ReplyCard';

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

function PostCard(props) {

    const userCtx = useContext(UserContext);
    var likes = [];
    var likeScore = 0;
    var username = userCtx.content.username;

    const address =  'http://localhost:8080/posts/postId/' + props.id + '/replies'

    const [isLoading, setIsLoading] = useState(true);
    const [loadedPosts, setLoadedPosts] = useState([]);

    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    var likeButton = <IconButton  onClick={likeHandler}><ThumbUpOffAltIcon/></IconButton>
    var dislikeButton = <IconButton onClick={dislikeHandler}><ThumbDownOffAltIcon/></IconButton>
    var replyButton = <Button sx={{maxWidth:10}} onClick={replyHandler}>Reply</Button>

    if(userCtx.selectedPost === props.id){
      replyButton = <Button sx={{maxWidth:10}} onClick={replyHandler}>Replying</Button>
    }

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

    if(props.grade != null) {
      var grade = <h2>{props.grade}</h2>;
    }

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
            }
            else if(userCtx.selectedPost !== props.id){
              userCtx.setSelectedPost(props.id);
            }
            else{
              userCtx.setSelectedPost("");
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

        let elementLink = "/reviewElements/" + props.elementId;
        let userLink = "/user/" + props.authorUsername;


    return (
      <div>
      <Card sx={{marginBottom : "10px"}}>
        <CardHeader 
          avatar = {<Avatar alt="user" src={props.user.imgUrl} component={Link} to={userLink}></Avatar>}
          title = {<div><Typography sx={{display:'inline'}} variant="h6">{props.name}</Typography>
          <Typography sx={{display:'inline'}} variant="h6" component={Link} to={elementLink}> in {props.postLocation}</Typography></div>}
          subheader = {<Typography color="text.secondary" component={Link} to={userLink}>{props.user.name} {props.user.surname}
          </Typography>}
          />
        <CardContent>
          <Typography variant="body1" color="text.secondary">{props.content}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          {likeButton}
          {likeScore}
          {dislikeButton}
          {replyButton}
          <Typography sx={{position:"relative", right:"-9.6cm"}} variant="body1" noWrap color="text.secondary">Replies: {props.replies.length}</Typography>
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
          />
        )}
      </Collapse>
      </div>






      /*
        <div className={classes.item} key={props.id} id={props.id}>
          <Card>
            <div className={classes.content}>
              <div>
              {grade}
              </div>
              <h3>{props.name}</h3>
              <p>{props.content}</p>
              <p>By: {props.authorUsername}</p>
              <p>{props.user.name}</p>
              {likeButton}
              {dislikeButton}
              <p>{likeScore}</p>
            </div>
          </Card>
        </div>
      */
      );

}

export default PostCard;
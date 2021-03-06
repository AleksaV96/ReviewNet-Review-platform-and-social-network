import React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import UserContext from '../../../store/user-context';
import { useContext } from 'react';
import { Collapse, Avatar, Card, CardActions, CardContent, CardHeader, Typography, IconButton } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useState, useEffect } from 'react';
import MainPageReplyCard from './MainPageReplyCard';

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
    var likeId = props.id + "like";
    var dislikeId = props.id + "dislike";
    var likeIdClc = props.id + "likeClc";
    var dislikeIdClc = props.id + "dislikeClc";
    var likeIdDsl = props.id + "likeDsl";
    var dislikeIdDsl = props.id + "dislikeDsl";

    const address =  'http://localhost:8080/posts/postId/' + props.id + '/replies'

    const [isLoading, setIsLoading] = useState(true);
    const [refresh, setRefresh] = useState(true);
    const [loadedPosts, setLoadedPosts] = useState([]);

    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    var likeButton = <IconButton id={likeId}  onClick={likeHandler}><ThumbUpOffAltIcon/></IconButton>
    var dislikeButton = <IconButton id={dislikeId} onClick={dislikeHandler}><ThumbDownOffAltIcon/></IconButton>
    var likeButtonClicked = <IconButton id={likeIdClc} onClick={unLikeHandler}><ThumbUpAltIcon color="info"/></IconButton>;
    var dislikeButtonClicked = <IconButton id={dislikeIdClc} onClick={unDislikeHandler}><ThumbDownAltIcon color="error"/></IconButton>;
    var likeButtonDisabled = <IconButton id={likeIdDsl} disabled><ThumbUpOffAltIcon/></IconButton>;
    var dislikeButtonDisabled = <IconButton id={dislikeIdDsl} disabled><ThumbDownOffAltIcon/></IconButton>;


    if(props.likes !== undefined){
      likes = props.likes;
    }

    for(let i=0; i < likes.length; i++){
      likeScore += likes[i].value;
    }
    if(refresh){
    for(let i=0; i < likes.length; i++){
      if(likes[i].likeCreatorName === username){
        if(likes[i].type === "LIKE"){
          likeButton = likeButtonClicked;
          dislikeButton = dislikeButtonDisabled;
          break;
        }
        else if(likes[i].type === "DISLIKE"){
          likeButton = likeButtonDisabled;
          dislikeButton = dislikeButtonClicked;
          break;
        }
      }
    }

    }

    /*
    if(props.grade != null) {
      var grade = <h2>{props.grade}</h2>;
    }
    */

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
        window.location.reload()
      }
      )};  

      function unLikeHandler() {
        setRefresh(false);
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
          window.location.reload()
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
          window.location.reload()
        }
        )};  

        function unDislikeHandler() {
          setRefresh(false);
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
            window.location.reload()
          }
          )}

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

        let postLocation;
        let elementName;
        let domainName;
        try{
        postLocation = props.postLocation.split(' ');
          elementName = postLocation[0];
          domainName = postLocation[1];
        }
        catch(e){}

        let elementLink = "/reviewElement/" + props.elementId;
        let domainLink = "/reviewElement/"+ elementName +"/domain/" + props.domainId;
        let userLink = "/user/" + props.authorUsername;
    try{
    return (
      <div>
      <Card sx={{marginTop : "5px"}}>
        <CardHeader 
          avatar = {<Avatar alt="user" sx={{height:"60px", width:"60px"}} src={props.user.imgUrl} component={Link} to={userLink}></Avatar>}
          title = {<div><Typography sx={{display:'inline', textTransform:"capitalize", color:"#3949ab"}} variant="h6">{props.name}</Typography>
          <Typography sx={{display:'inline'}} variant="h6"> in </Typography>
          <Typography sx={{display:'inline', color:"#d81b60", textDecoration:"none"}} variant="h6" component={Link} to={elementLink}>{elementName}</Typography>
          <Typography sx={{display:'inline', color:"black", textDecoration:"none"}} variant="h6" component={Link} to={domainLink}> {domainName}</Typography>
          <Typography sx={{display:'inline', position:"relative"}} variant="h4" color="#e91e63"> {props.grade}</Typography>
          </div>}
          subheader = {<Typography color="text.secondary" sx={{display:'inline', textDecoration:"none"}} component={Link} to={userLink}>{props.user.name} {props.user.surname}
          </Typography>}
          />
        <CardContent>
          <Typography sx={{display:"inline"}} variant="body1" color="text.secondary">{props.content}</Typography>
          
        </CardContent>
        <CardActions disableSpacing>
          {likeButton}
          {likeScore}
          {dislikeButton}
          <Typography sx={{position:"relative", right:"-11.2cm"}} variant="body1" noWrap color="text.secondary">Replies: {props.replies.length}</Typography>
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
          <MainPageReplyCard
            key={post.id}
            id={post.id}
            name={post.name}
            content={post.content}
            likes={post.likes}
            authorUsername={post.authorUsername}
            replies={post.replies}
            user={post.author}
            postUserImg={props.user.imgUrl}  
            postUserName={props.user.name} 
            postUserSurname={props.user.surname}
            postUserUsername={props.user.username}    
            parent="post"
            iteration="0"
          />
        )}
      </Collapse>
      
      </div>
      );
      }
      catch(e){
        return "";
      }

}

export default PostCard;
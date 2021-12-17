import React from 'react';
import classes from "./PostCard.module.css";
import Card from "../../ui/Card";

import UserContext from '../../../store/user-context';
import { useContext } from 'react';

function PostCard(props) {

    const userCtx = useContext(UserContext);
    
    var likes = [];
    var likeScore = 0;
    var username = userCtx.content.username;

    var likeButton = <p className={classes.like} onClick={likeHandler}>Like👍</p>; 
    var dislikeButton = <p className={classes.like} onClick={dislikeHandler}>Dislike👎</p>; 


    if(props.likes !== undefined){
      likes = props.likes;
    }

    for(let i=0; i < likes.length; i++){
      likeScore += likes[i].value;
    }

    for(let i=0; i < likes.length; i++){
      if(likes[i].likeCreatorName === username){
        if(likes[i].type === "LIKE"){
          likeButton = <p className={classes.likeClicked} onClick={unLikeHandler}>Liked👍</p>;
          dislikeButton = <p></p>;
          break;
        }
        else if(likes[i].type === "DISLIKE"){
          dislikeButton = <p className={classes.dislikeClicked} onClick={unDislikeHandler}>Disliked👎</p>;
          likeButton = <p></p>;
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
    
 
    return (
        <div className={classes.item} key={props.id} id={props.id}>
          <Card>
            <div className={classes.content}>
              <div>
              {grade}
              </div>
              <h3>{props.name}</h3>
              <p>{props.content}</p>
              <p>By: {props.authorUsername}</p>
              {likeButton}
              {dislikeButton}
              <p>{likeScore}</p>
            </div>
          </Card>
        </div>
      );

}

export default PostCard;
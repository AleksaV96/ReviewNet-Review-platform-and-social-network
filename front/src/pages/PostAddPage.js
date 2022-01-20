import React from 'react';
import PostForm from "../components/forms/PostForm";
import ReviewPostForm from "../components/forms/ReviewPostForm";

import { useContext } from 'react';
import UserContext from '../store/user-context';
import { Typography } from '@mui/material';

function PostAddPage(props) {

    const userCtx = useContext(UserContext);
    let address;
    let address2;
    let domainType;
    let domainName;
    let elementId;
    let domainId;

    
    domainType = props.domain.type;
    domainName = props.domain.name;
    elementId = props.domain.parentId;
    domainId = props.domain.id;

    address = 'http://localhost:8080/posts/' + domainType + 'Id/' + props.domain.id + '/addpost';

    if(domainType !== "forum" && domainType !== "complainSpace" && domainType !== "reviewSpace" 
    && domainType !== "roadMap" && domainType !== undefined){
        address = 'http://localhost:8080/posts/themeId/' + props.domain.id + '/addpost';
    }
    
    if(userCtx.selectedPost !== "") {
        address2 = 'http://localhost:8080/posts/postId/' + userCtx.selectedPost + '/addReply';
    }
    
    

    function addPostHandler(postData) {
    if(userCtx.selectedPost === "") {
    fetch(
        address,
        {
         method: 'POST',
         body: JSON.stringify(postData),
         headers: {
             'Content-Type': 'application/json',
        },
        credentials: 'include'
        },
     
        window.location.reload(),
     
        )
    }
    else{
        fetch(
            address2,
            {
             method: 'POST',
             body: JSON.stringify( {
                 name : postData.name,
                 content : postData.content,
                 authorUsername : postData.authorUsername,
                 elementId : postData.elementId,
                 type : "Reply"
             }
             ),
             headers: {
                 'Content-Type': 'application/json',
            },
            credentials: 'include'
            },
            window.location.reload(),
            )
        }

    }
  
    if(!(userCtx.restrictions.includes("COMMENT"))) {
        if(domainType!=="reviewSpace") {
            return(
                <PostForm onPostAdd={addPostHandler} postLocation={domainName} elementId={elementId} domainId={domainId}/>
                );
            }
            return(
                <ReviewPostForm onPostAdd={addPostHandler} postLocation={domainName} elementId={elementId} domainId={domainId}/>
            );
    }
    return(
        <Typography sx={{fontWeight:"bold"}} variant="h4">User {userCtx.content.username} is banned from commenting!</Typography>
    );

}

export default PostAddPage;
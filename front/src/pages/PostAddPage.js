import React from 'react';
import PostForm from "../components/forms/PostForm";
import ReviewPostForm from "../components/forms/ReviewPostForm";
import { selectedPost } from '../components/layout/cards/PostCard';

import { useContext } from 'react';
import UserContext from '../store/user-context';

function PostAddPage(props) {

    const userCtx = useContext(UserContext);
    let address;
    let address2;
    let domainType;
    let domainName;
    let elementId;

    

    props.domain.map((domain) => (
        domainType = domain.type,
        domainName = domain.name,
        elementId = domain.parentId,
        address = 'http://localhost:8080/posts/' + domain.type + 'Id/' + domain.id + '/addpost'
    ))
    
    if(userCtx.selectedPost !== "") {
        address2 = 'http://localhost:8080/posts/postId/' + userCtx.selectedPost + '/addReply';
    }
    
    

    function addPostHandler(postData) {
    if(userCtx.selectedPost === "") {
    fetch(
        address,
        {
         method: 'POST',
         body: JSON.stringify( {
             name : postData.name,
             content : postData.content,
             authorUsername : postData.authorUsername,
             elementId : elementId,
             postLocation : domainName
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
    else{
        fetch(
            address2,
            {
             method: 'POST',
             body: JSON.stringify( {
                 content : postData.content,
                 authorUsername : postData.authorUsername,
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
                <PostForm onPostAdd={addPostHandler} />
                );
            }
            return(
                <ReviewPostForm onPostAdd={addPostHandler} />
            );
    }
    return(
        <h1>User {userCtx.content.username} is banned from commenting!</h1>
    );

}

export default PostAddPage;
import React from 'react';
import PostForm from "../components/forms/PostForm";
import ReviewPostForm from "../components/forms/ReviewPostForm";

import { useContext } from 'react';
import UserContext from '../store/user-context';

function PostAddPage(props) {

    let address;
    let type;

    const userCtx = useContext(UserContext);

    props.domain.map((domain) => (
        address = 'http://localhost:8080/posts/' + domain.type + 'Id/' + domain.id + '/addpost'
    ))

    props.domain.map((domain) => (
        type = domain.type
    ))
    

    function addPostHandler(postData) {

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
  
    if(!(userCtx.restrictions.includes("COMMENT"))) {
        if(type!=="reviewSpace") {
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
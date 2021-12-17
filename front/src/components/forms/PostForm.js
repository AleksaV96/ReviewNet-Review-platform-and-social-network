import { useRef } from 'react';
import Card from '../ui/Card';
import React from 'react';

import { useContext } from 'react';
import UserContext from '../../store/user-context';

import classes from './Form.module.css';

function PostForm(props) {

    const userCtx = useContext(UserContext);

    const nameInputRef = useRef();
    const contentInputRef = useRef();
    
    function submitHandler(event) {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredContent = contentInputRef.current.value;
        const authorUsername = userCtx.content.username;

    const postData = {
        name: enteredName,
        content: enteredContent,
        authorUsername: authorUsername
    }

      props.onPostAdd(postData);
    }

    return(

        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='name'>Title</label>
                <input type='text' required id='name' ref={nameInputRef} />
            </div>
            <div className={classes.control}>
            <label htmlFor='content'>Content</label>
            <textarea
                id='content'
                required
                rows='5'
                ref={contentInputRef}
            ></textarea>
            </div>
            <div className={classes.actions}>
                <button>Post</button>
            </div>
            </form>
      </Card>

    )

} 

export default PostForm;
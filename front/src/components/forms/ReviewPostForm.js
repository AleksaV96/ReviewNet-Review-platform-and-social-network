import { useRef } from 'react';
import Card from '../ui/Card';

import classes from './Form.module.css';

function ReviewPostForm(props) {

    const nameInputRef = useRef();
    const contentInputRef = useRef();
    const ratingInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredContent = contentInputRef.current.value;
        const enteredRating = ratingInputRef.current.value;

    const postData = {
        name: enteredName,
        content: enteredContent,
        grade: enteredRating
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
            <div className={classes.control}>
                <label htmlFor="rating">Rate:</label>
                <input type="number" id="rating" name="rating" min="1" max="10" ref={ratingInputRef}/>
            </div>
            <div className={classes.actions}>
                <button>Create</button>
            </div>
            </form>
      </Card>

    )

} 

export default ReviewPostForm;
import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './Form.module.css';

function ReviewElementForm(props) {

    const nameInputRef = useRef();
    const descriptionInputRef = useRef();
    const imgUrlInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
    
        const enteredName = nameInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredImgUrl = imgUrlInputRef.current.value;
    

    const reviewElementData = {
        name : enteredName,
        description : enteredDescription,
        imgUrl : enteredImgUrl
    }
        props.onReviewElementAdd(reviewElementData);
    }

    return(

        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='name'>Name</label>
                <input type='text' required id='name' ref={nameInputRef} />
            </div>
            <div className={classes.control}>
            <label htmlFor='description'>Description</label>
            <textarea
                id='description'
                required
                rows='5'
                ref={descriptionInputRef}
            ></textarea>
            </div>
            <div className={classes.control}>
            <label htmlFor='imgUrl'>Company photo link</label>
            <input type='url' required id='imgUrl' ref={imgUrlInputRef} />
            </div>
            <div className={classes.actions}>
                <button>Create</button>
            </div>
            </form>
      </Card>


    )
}

export default ReviewElementForm;
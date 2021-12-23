import React from 'react';
import ReviewElementCard from "../cards/ReviewElementCard";
import classes from "./ReviewElementList.module.css"
import { Link } from 'react-router-dom';

function ReviewElementList(props) {
  //<Link to={'/reviewElements/'+ element.id}></Link>
    return (
      <div>
        <div className={classes.actions}>
        <h1>Companies and products</h1>
          <Link to='/reviewElements/create-company'>
          <button type="button">Add New</button>
          </Link>
        </div >
        <ul className={classes.list}>
          {props.elements.map((element) => (
            <div>
            <ReviewElementCard
              key={element.id}
              id={element.id}
              name={element.name}
              description={element.description}
              image={element.imgUrl}
            />
            </div>
          ))}
        </ul>
        </div>
      );
}

export default ReviewElementList;
import React from 'react';
import ReviewElementCard from "../cards/ReviewElementCard";
import classes from "./ReviewElementList.module.css"
import { Link } from 'react-router-dom';

function ReviewElementList(props) {
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
            <Link to={'/reviewElements/'+ element.id}>
            <ReviewElementCard
              key={element.id}
              id={element.id}
              name={element.name}
              description={element.description}
              image={element.imgUrl}
            />
            </Link>
          ))}
        </ul>
        </div>
      );
}

export default ReviewElementList;
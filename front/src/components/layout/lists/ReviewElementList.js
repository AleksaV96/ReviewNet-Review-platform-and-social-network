import React from 'react';
import ReviewElementCard from "../cards/ReviewElementCard";
import classes from "./ReviewElementList.module.css"
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

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
        <Grid container spacing={1}>  
          {props.elements.map((element) => (
            <Grid item xs={6} md={6}>
            <ReviewElementCard
              key={element.id}
              id={element.id}
              name={element.name}
              description={element.description}
              image={element.imgUrl}
            />
            </Grid>
          ))}
        </Grid>
      </div>
      );
}

export default ReviewElementList;
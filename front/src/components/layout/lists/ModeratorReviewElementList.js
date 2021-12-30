import React from 'react';
import ModeratorReviewElementCard from "../cards/ModeratorReviewElementCard";
import classes from "./ReviewElementList.module.css"
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

function ModeratorReviewElementList(props) {

    return (
      <div>
        <Grid container spacing={1}>  
          {props.elements.map((element) => (
            <Grid item xs={6} md={6}>
            <ModeratorReviewElementCard
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

export default ModeratorReviewElementList;
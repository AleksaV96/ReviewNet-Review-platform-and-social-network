import React from 'react';
import ModeratorReviewElementCard from "../cards/ModeratorReviewElementCard";
import { Grid } from '@mui/material';

function AdminReviewElementList(props) {

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

export default AdminReviewElementList;
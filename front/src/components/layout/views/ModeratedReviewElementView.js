import React from 'react';
import classes from '../cards/ReviewElementCard.module.css';
import ModeratedReviewElementViewCard from '../cards/ModeratedReviewElementViewCard';

function ModeratedReviewElementView(props) {
  return (
    <div className={classes.list}>
      {props.element.map((element) => (
        <div>
        <ModeratedReviewElementViewCard
          key={element.id}
          id={element.id}
          name={element.name}
          description={element.description}
          image={element.imgUrl}
          moderators={element.moderators}
          subscribers={element.subscribers}
        />
        </div>
      ))}
    </div>
  );

}

export default ModeratedReviewElementView;
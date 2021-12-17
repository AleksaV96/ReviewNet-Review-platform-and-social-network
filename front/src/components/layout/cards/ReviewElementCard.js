import React from 'react';
import classes from './ReviewElementCard.module.css';
import Card from '../../ui/Card';


function ReviewElementCard(props) {
    

    return (
        <li className={classes.item} key={props.id} id={props.id}>
          <Card>
            
            <div className={classes.image}>
              <img src={props.image} alt={props.title} />
            </div>
            <div className={classes.content}>
              <h3>{props.name}</h3>
              <p>{props.description}</p>
            </div>
          </Card>
        </li>
      );

}

export default ReviewElementCard;
import React from 'react';
import classes from "./UserCard.module.css";
import Card from "../../ui/Card";

function UserCard(props) {
    
    return (
        <div className={classes.item} key={props.id} id={props.id}>
          <Card>
            <div className={classes.content}>
              <h3>{props.username}</h3>
              <p>{props.name}</p>
              <p>{props.surname}</p>
              <p>{props.email}</p>
            </div>
          </Card>
        </div>
      );

}

export default UserCard;
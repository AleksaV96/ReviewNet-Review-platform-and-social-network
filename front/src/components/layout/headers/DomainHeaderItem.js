import React from 'react';
import classes from './DomainHeaderItem.module.css'

function DomainHeaderItem(props) {

    return (
        <div className={classes.item} key={props.id} id={props.id}>
            <div className={classes.content}>
              <h3>{props.name}</h3>
            </div>
        </div>
      );

}

export default DomainHeaderItem;
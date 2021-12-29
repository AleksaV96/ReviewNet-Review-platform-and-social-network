import React from 'react';
import Card from '@mui/material/Card'
import classes from './DomainHeaderItem.module.css'

function DomainHeaderItem(props) {

    return (
      <Card>
        <div className={classes.item} key={props.id} id={props.id}>
            <div className={classes.content}>
              <h3>{props.name}</h3>
            </div>
        </div>
      </Card>
      );

}

export default DomainHeaderItem;
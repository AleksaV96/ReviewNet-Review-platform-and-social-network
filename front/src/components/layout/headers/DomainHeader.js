import React from 'react';
import DomainHeaderItem from "./DomainHeaderItem"

import classes from './DomainHeader.module.css'

function DomainList(props) {

    var sum = 0;
    for(var i = 0; i < props.grades.length; i++){
      sum += props.grades[i];
    }
    sum /= props.grades.length;
    sum = sum.toFixed(1);

    if(!isNaN(parseFloat(sum))){
      var elm = <h2>Rating: {sum}</h2>
    }

    return (
        <div className={classes.item}>
            <DomainHeaderItem
              key={props.domain.id}
              id={props.domain.id}
              name={props.domain.name}
              />
          {elm}
        </div>
      );
    
    

}

export default DomainList;
import React from 'react';
import { useState } from 'react';

import Card from '../ui/Card';
import classes from './Form.module.css';

function UserRestrictionsForm(props) {
    const [restriction, setRestriction] = useState(0);
    var user = props.user;
    const restrictions = props.user.permission.roleDetails.restrictions;
    const restList = restrictions.map((rest) => <li>{rest}</li>);

    function addRestrictionHandler(){
        
        const address = 'http://localhost:8080/users/' + user.id + '/restrict/' + restriction;

        fetch(
            address,
           {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json',
             },
             credentials: 'include'
         }
         ).then((response) => {
             window.location.reload();
         })
    };

    function removeRestrictionHandler(){
        
        const address = 'http://localhost:8080/users/' + user.id + '/remove-restriction/' + restriction;
        console.log(address);
        fetch(
            address,
           {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json',
             },
             credentials: 'include'
         }
         ).then((response) => {
             window.location.reload();
         })
    };


    return(
        <div>
        <Card>
            <div className={classes.form}>
              <div className={classes.control}>
                <label htmlFor='comment'>Add new element</label>
                <input type='radio' required id='comment'  checked={restriction===1} onChange={() => setRestriction(1)}/>
                <label htmlFor='element'>Comment</label>
                <input type='radio' required id='element' checked={restriction===2} onChange={() => setRestriction(2)}/>
              <div className={classes.actions}>
                  <button onClick={addRestrictionHandler}>ADD</button>
                  <button onClick={removeRestrictionHandler}>REMOVE</button>
              </div>
              </div>
            </div>
        </Card>
            <p>{user.username} restrictions:</p>
            <ul>{restList}</ul>
        </div>
    )
}

export default UserRestrictionsForm;
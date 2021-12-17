import React from 'react';
import UserCard from "../cards/UserCard";
import classes from "./PostList.module.css";
import { Link } from 'react-router-dom';

function UserList(props) {

    return (
        <ul className={classes.list}>
          {props.users.map((user) => (
            <div>
            <Link to={'/dashboard/user/'+ user.id}>
            <UserCard
              key={user.id}
              id={user.id}
              username={user.username}
              name={user.name}
              surname={user.surname}
              email={user.email}
            />
            </Link>
            </div>
          ))}
        </ul>
      );


}

export default UserList;
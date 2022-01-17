import React from 'react';
import UserCard from "../cards/UserCard";
import classes from "./PostList.module.css";

function UserList(props) {

    return (
        <ul className={classes.list}>
          {props.users.map((user) => (
            <div>
            <UserCard
              key={user.id}
              id={user.id}
              username={user.username}
              name={user.name}
              surname={user.surname}
              email={user.email}
              imgUrl={user.imgUrl}
              role={user.permission.authority}
              activeStatus={user.logicDelete}
            />
            </div>
          ))}
        </ul>
      );


}

export default UserList;
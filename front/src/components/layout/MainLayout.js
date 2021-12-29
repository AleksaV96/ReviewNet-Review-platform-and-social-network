import React from 'react';
import MainNavbar from './navbars/MainNavbar';
import ModeratorNavbar from './navbars/ModeratorNavbar';
import AdminNavbar from './navbars/AdminNavbar';

import classes from './MainLayout.module.css'

import parseJwt from '../../logic/JWTutil'

function MainLayout(props) {

      let role;
      let token = localStorage.getItem('Bearer');

      if(token !== null){
        role = parseJwt(token).role[0].authority;
      }

  if(role==="ROLE_SUBSCRIBER"){
    return (
      <div>
        <MainNavbar />
        <main className={classes.main}>{props.children}</main>
      </div>
    );
  }
  else if(role==="ROLE_MODERATOR"){
    return (
      <div>
        <ModeratorNavbar />
        <main className={classes.main}>{props.children}</main>
      </div>
    );
  }
  else if(role==="ROLE_ADMIN"){
    return (
      <div>
        <AdminNavbar />
        <main className={classes.main}>{props.children}</main>
      </div>
    );
  }
}

export default MainLayout;
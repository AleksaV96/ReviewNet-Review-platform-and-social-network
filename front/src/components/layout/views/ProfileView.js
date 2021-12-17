import React from 'react';
import classes from './ProfileView.module.css'

function ProfileView(props) {

    const loadedProfile = props.profile;

    return(
        <div className={classes.profileView}>
            <img src={loadedProfile.imgUrl} alt=""/>
            <h1>{loadedProfile.username}</h1>
            <h3>{loadedProfile.name}</h3>
            <h3>{loadedProfile.surname}</h3>
            <h5>{loadedProfile.email}</h5>
        </div>

    );
}

export default ProfileView;
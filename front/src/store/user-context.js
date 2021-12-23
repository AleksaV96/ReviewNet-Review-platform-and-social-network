import React from 'react';
import { createContext, useState } from 'react';

const UserContext = createContext({
    content : {},
    restrictions : [],
    openUser : (loggedUser) => {},
    setRestrictions : (userRestrictions) => {},
    setSelectedPost : (selPost) => ""
});

export function UserContextProvider(props) {
    const [user, setUser] = useState({});
    const [restrictions, setRestrictionList] = useState([]);
    const [selectedPost, setSelectedPost] = useState("");

    function loggedUserHandler(loggedUser){
        setUser(loggedUser);
    }

    function restrictionHandler(userRestrictions){
        setRestrictionList(userRestrictions);
    }

    function selectedPostHandler(selPost){
        setSelectedPost(selPost);
    }

    const openedUser = {
        content : user,
        restrictions : restrictions,
        selectedPost : selectedPost,
        openUser : loggedUserHandler,
        setRestrictions : restrictionHandler,
        setSelectedPost : selectedPostHandler
    };

    return (
        <UserContext.Provider value={openedUser}>
          {props.children}
        </UserContext.Provider>
    );


}

export default UserContext;
import React from 'react';
import { createContext, useState } from 'react';

const UserContext = createContext({
    content : {},
    restrictions : [],
    openUser : (loggedUser) => {},
    setRestrictions : (userRestrictions) => {},
    setSelectedPost : (selPost) => "",
    setSelectedPostAuthor : (selPostAut) => ""
});

export function UserContextProvider(props) {
    const [user, setUser] = useState({});
    const [restrictions, setRestrictionList] = useState([]);
    const [selectedPost, setSelectedPost] = useState("");
    const [selectedPostAuthor, setSelectedPostAuthor] = useState("");

    function loggedUserHandler(loggedUser){
        setUser(loggedUser);
    }

    function restrictionHandler(userRestrictions){
        setRestrictionList(userRestrictions);
    }

    function selectedPostHandler(selPost){
        setSelectedPost(selPost);
    }

    function selectedPostAuthorHandler(selPostAut){
        setSelectedPostAuthor(selPostAut);
    }

    const openedUser = {
        content : user,
        restrictions : restrictions,
        selectedPost : selectedPost,
        selectedPostAuthor : selectedPostAuthor,
        openUser : loggedUserHandler,
        setRestrictions : restrictionHandler,
        setSelectedPost : selectedPostHandler,
        setSelectedPostAuthor : selectedPostAuthorHandler
    };

    return (
        <UserContext.Provider value={openedUser}>
          {props.children}
        </UserContext.Provider>
    );


}

export default UserContext;
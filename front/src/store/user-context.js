import { createContext, useState } from 'react';

const UserContext = createContext({
    content : {},
    restrictions : [],
    openUser : (loggedUser) => {},
    setRestrictions : (userRestrictions) => {}
});

export function UserContextProvider(props) {
    const [user, setUser] = useState({});
    const [restrictions, setRestrictionList] = useState([]);

    function loggedUserHandler(loggedUser){
        setUser(loggedUser);
    }

    function restrictionHandler(userRestrictions){
        setRestrictionList(userRestrictions);
    }

    const openedUser = {
        content : user,
        restrictions : restrictions,
        openUser : loggedUserHandler,
        setRestrictions : restrictionHandler
    };

    return (
        <UserContext.Provider value={openedUser}>
          {props.children}
        </UserContext.Provider>
    );


}

export default UserContext;
import { useState, useEffect } from 'react';
import React from 'react';

import PostList from "../components/layout/lists/PostList";
import MainLayout from "../components/layout/MainLayout";

import { useContext } from 'react';
import UserContext from '../store/user-context';

import parseJwt from '../logic/JWTutil'
import logout from '../logic/Logout'

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function MainPage() {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedPosts, setLoadedPosts] = useState([]);

    let userId;
    let address;
    let token = localStorage.getItem('Bearer');
    const userCtx = useContext(UserContext);

    if(token !== null){
        userId = parseJwt(token).sub;
        address = 'http://localhost:8080/users/userId/' + userId + '/getFeed';
    }
    


    useEffect(() => {
        setIsLoading(true);
        fetch(
            address,
            {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
            }
        )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const posts = [];
            for (const key in data) {
            const post = {
                id: key,
                ...data[key]
            };

            posts.push(post);
            }
            
            setIsLoading(false);
            setLoadedPosts(posts);
        });
    }, [address]);


    let address2;
    let userSearch;
    const [isUserLogged, setIsUserLogged] = useState(false);
    
    
    if(token !== null){
        userSearch = parseJwt(token).uniq;
        address2 = 'http://localhost:8080/users/' + userSearch;
    }
    
    useEffect(() => {
      if(userSearch !== undefined && isUserLogged === false 
        && JSON.stringify(userCtx.content) === "{}") {
      fetch(
          address2,
          {
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include'
          }
      )
      .then((response) => {
          if(response.status === 404){
            logout();
            alert("USER INACTIVE!")
          }
          return response.json();
      })
      .then((data) => {

          const user = {
              "id" : data.id,
              "name" : data.name,
              "surname" : data.surname,
              "username" : data.username,
              "permission" : data.permission,
              "email" : data.email,
              "imgUrl" : data.imgUrl,
              "friends" : data.friends,
              "subscribed" : data.subscribed,
              "logicDelete" : data.logicDelete
          }
          
          userCtx.openUser(user);
          try{
            userCtx.setRestrictions(data.permission.roleDetails.restrictions);
            }
            catch(error){}
          setIsUserLogged(true);
          });
        }
      }, [userSearch, isUserLogged, address2, userCtx]);
    

    if (isLoading) {
        return (
            <Backdrop
            sx={{ position:"fixed",color: '#fff'}}
            open={true}
            >
            <CircularProgress color="inherit" />
          </Backdrop>
        );
    }

    return(
        <MainLayout>
            <PostList posts={loadedPosts} />
        </MainLayout>
    );
}

export default MainPage;
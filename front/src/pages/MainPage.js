import { useState, useEffect } from 'react';
import React from 'react';

import PostList from "../components/layout/lists/PostList";
import MainLayout from "../components/layout/MainLayout";

import { useContext } from 'react';
import UserContext from '../store/user-context';

import parseJwt from '../logic/JWTutil'

function MainPage() {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedPosts, setLoadedPosts] = useState([]);

    const address = 'http://localhost:8080/posts/all';

    const userCtx = useContext(UserContext);

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
    let token = localStorage.getItem('Bearer');
    
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
              "imgUrl" : data.imgUrl
          }
          userCtx.openUser(user);
          try{
            userCtx.setRestrictions(data.permission.roleDetails.restrictions);
            }
            catch(error){
              console.log(error);
            }
          setIsUserLogged(true);
          });
        }
      }, [userSearch, isUserLogged, address2, userCtx]);
    

    if (isLoading) {
        return (
        <section>
            <p>Loading...</p>
        </section>
        );
    }

    return(
        <MainLayout>
            <PostList posts={loadedPosts} />
        </MainLayout>
    );
}

export default MainPage;
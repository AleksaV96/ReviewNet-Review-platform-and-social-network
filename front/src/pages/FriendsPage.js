import { useState, useEffect } from 'react';

import MainLayout from '../components/layout/MainLayout'
import FriendList from "../components/layout/lists/FriendList" 

import parseJwt from '../logic/JWTutil'

import { useContext } from 'react';
import UserContext from '../store/user-context';

function FriendsPage(){

    const userCtx = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedFriends, setLoadedFriends] = useState([]);

    let token = localStorage.getItem('Bearer');

    if(token !== null){
      const userId = parseJwt(token).sub;
      var address = 'http://localhost:8080/users/userId/' + userId + '/get-friends';

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
          const friends = [];

          for (const key in data) {
            const friend = {
              id: key,
              ...data[key]
            };

            friends.push(friend);
          }

          setIsLoading(false);
          setLoadedFriends(friends);
        });
    }, []);

    if (isLoading) {
      return (
        <section>
          <p>Loading...</p>
        </section>
      );
    }

    return (
        <MainLayout>
          <section>
            <FriendList friends={loadedFriends}/>
          </section>
        </MainLayout>
      );

}
export default FriendsPage;
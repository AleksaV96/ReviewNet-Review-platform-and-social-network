import { useState, useEffect } from 'react';
import { useParams } from "react-router";

import MainLayout from '../components/layout/MainLayout'
import FriendList from "../components/layout/lists/FriendList" 


function UserFriendsPage(){

    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [loadedFriends, setLoadedFriends] = useState([]);

    const address = 'http://localhost:8080/users/userId/' + id + '/get-friends';

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
    }, [address]);

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
export default UserFriendsPage;
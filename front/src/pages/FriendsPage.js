import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import MainLayout from '../components/layout/MainLayout'
import FriendList from "../components/layout/lists/FriendList" 

import Button from '@mui/material/Button';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import parseJwt from '../logic/JWTutil'

function FriendsPage(){

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
          <Button sx={{position:"relative", left:"6.5cm"}} variant="contained" component={Link} to={'/userSearch'}>Find friends<PersonSearchIcon/></Button>
          <section>
            <FriendList friends={loadedFriends}/>
          </section>
        </MainLayout>
      );

}
export default FriendsPage;
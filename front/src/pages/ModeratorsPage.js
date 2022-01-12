import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router";

import MainLayout from '../components/layout/MainLayout'

import ModeratorFriendList from '../components/layout/lists/ModeratorFriendList';
import ModeratorList from "../components/layout/lists/ModeratorList" 


import parseJwt from '../logic/JWTutil'
import UserContext from '../store/user-context';


function ModeratorsPage(){
    
    const { id } = useParams();
    const userCtx = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedFriends, setLoadedFriends] = useState([]);
    const [loadedModerators, setLoadedModerators] = useState([]);
    const [ moderatorsIds, setModeratorsIds ] = useState([]);

    let token = localStorage.getItem('Bearer');

    if(token !== null){
      var userId = parseJwt(token).sub;
      var address = 'http://localhost:8080/users/userId/' + userId + '/get-friends';

    }

    let address2 = 'http://localhost:8080/reviewElements/elementId/' + id + '/get-moderators';

    useEffect(() => {
        setIsLoading(true);
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
            const moderators = [];
            const moderatorsIds = []; 
  
            for (const key in data) {
              const moderator = {
                id: key,
                ...data[key]
              };
              moderators.push(moderator);
              moderatorsIds.push(moderator.id);
            }
  
            setIsLoading(false);
            setLoadedModerators(moderators);
            setModeratorsIds(moderatorsIds)
          });
      }, []);

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
            if(friend.permission.authority === "ROLE_MODERATOR" && !(loadedModerators.includes(friend.id))){
                friends.push(friend);
            }
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
              <ModeratorList elementId={id} friends={loadedModerators}
               moderatorsIds={moderatorsIds} userId={userId}/>
              <ModeratorFriendList elementId={id} friends={loadedFriends} moderatorsIds={moderatorsIds}/>
          </section>
        </MainLayout>
      );

}
export default ModeratorsPage;
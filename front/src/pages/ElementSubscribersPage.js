import { useState, useEffect } from 'react';
import { useParams } from "react-router";

import MainLayout from '../components/layout/MainLayout'
import FriendList from '../components/layout/lists/FriendList';
import { Card, Typography } from '@mui/material';



function ElementSubscribersPage(){

    const { id } = useParams();
    const { elementName } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [loadedSubscribers, setLoadedSubscribers] = useState([]);

    let address = 'http://localhost:8080/reviewElements/elementId/' + id + '/get-subscribers';

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
            const subscribers = [];
  
            for (const key in data) {
              const subscriber = {
                id: key,
                ...data[key]
              };
              subscribers.push(subscriber);
            }
  
            setIsLoading(false);
            setLoadedSubscribers(subscribers);
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
        <Typography sx={{fontWeight:"bold", position:"relative", left:"4cm"}} variant="h4">{elementName} subscribers:</Typography>
          <section>
              <FriendList friends={loadedSubscribers}/>
          </section>
        </MainLayout>
      );

}

export default ElementSubscribersPage;
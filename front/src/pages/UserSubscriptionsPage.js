import { useState, useEffect } from 'react';
import { useParams } from "react-router";

import MainLayout from '../components/layout/MainLayout'
import SubscriptionList from "../components/layout/lists/SubscriptionList" 

function SubscriptionsPage() {

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [loadedElements, setLoadedElements] = useState([]);


    var address = 'http://localhost:8080/users/userId/' + id + '/get-subscriptions';

    

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
          const elements = [];

          for (const key in data) {
            const element = {
              id: key,
              ...data[key]
            };

            elements.push(element);
          }

          setIsLoading(false);
          setLoadedElements(elements);
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
            <SubscriptionList elements={loadedElements}/>
          </section>
        </MainLayout>
      );
    
}

export default SubscriptionsPage;
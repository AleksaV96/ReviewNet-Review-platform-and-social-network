import { useState, useEffect } from 'react';

import MainLayout from '../components/layout/MainLayout'

import parseJwt from '../logic/JWTutil'

import { useContext } from 'react';
import UserContext from '../store/user-context';
import ModeratorReviewElementList from '../components/layout/lists/ModeratorReviewElementList';

function ModeratedPage() {

    const userCtx = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedElements, setLoadedElements] = useState([]);

    let token = localStorage.getItem('Bearer');

    if(token !== null){
      const userId = parseJwt(token).sub;
      var address = 'http://localhost:8080/users/userId/' + userId + '/get-moderated';

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
            <ModeratorReviewElementList elements={loadedElements}/>
          </section>
        </MainLayout>
      );
    
}

export default ModeratedPage;
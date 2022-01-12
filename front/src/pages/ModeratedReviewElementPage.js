import React from 'react';
import { useParams } from "react-router";
import { useState, useEffect } from 'react';
import ModeratedReviewElementView from "../components/layout/views/ModeratedReviewElementView";
import DomainList from "../components/layout/lists/DomainList";

import MainLayout from "../components/layout/MainLayout";

function ModeratedReviewElementPage() {
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [loadedElement, setLoadedElement] = useState([]);
    const [loadedDomains, setLoadedDomains] = useState([]);

    const address = 'http://localhost:8080/reviewElements/reviewElementId/' + id;
    const address2 = 'http://localhost:8080/reviewElement/' + id + '/domains';

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
            const elm = [];
            const element = {
                "id" : data.id,
                "name" : data.name,
                "description" : data.description,
                "imgUrl" : data.imgUrl,
                "moderators" : data.moderators
            }

            elm.push(element);
            setIsLoading(false);
            setLoadedElement(elm);
          });
      }, [address]);

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
            const dmn = [];
            for (const key in data) {
              const domain = {
                id: key,
                ...data[key]
              };
              dmn.push(domain);
            }
            
            setIsLoading(false);
            setLoadedDomains(dmn);
          });
      }, [address2]);
    
    if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

    return(
        <MainLayout>
            <ModeratedReviewElementView element={loadedElement}/>
            <DomainList domains={loadedDomains} element={loadedElement}/>
        </MainLayout>
    );

}

export default ModeratedReviewElementPage;
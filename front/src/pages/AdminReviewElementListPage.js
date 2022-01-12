import { useState, useEffect } from 'react';
import React from 'react';

import MainLayout from '../components/layout/MainLayout'
import AdminReviewElementList from "../components/layout/lists/AdminReviewElementList" 

function AdminReviewElementListPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedElements, setLoadedElements] = useState([]);

    useEffect(() => {
      setIsLoading(true);
      fetch(
        'http://localhost:8080/reviewElements/all',
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
          <AdminReviewElementList elements={loadedElements} />
        </section>
      </MainLayout>
    );
}

export default AdminReviewElementListPage;
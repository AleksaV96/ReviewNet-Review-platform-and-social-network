import { useState, useEffect } from 'react';
import React from 'react';

import MainLayout from '../components/layout/MainLayout'
import AdminReviewElementList from "../components/layout/lists/AdminReviewElementList" 

import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

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
        <Button sx={{position:"relative", left:"6.5cm", marginBottom:"1cm"}} color="secondary" variant="contained" component={Link} to={'/adminElementSearch'}>
          Find elements<TravelExploreIcon/></Button>
        <section>
          <AdminReviewElementList elements={loadedElements} />
        </section>
      </MainLayout>
    );
}

export default AdminReviewElementListPage;
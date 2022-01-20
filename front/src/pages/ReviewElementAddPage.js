import React from 'react';
import ReviewElementForm from "../components/forms/ReviewElementForm";
import MainLayout from '../components/layout/MainLayout';
import {Navigate } from 'react-router-dom';

import { useContext } from 'react';
import UserContext from '../store/user-context';

import {useState} from 'react';
import { Typography } from '@mui/material';

function ReviewElementAddPage() {
    
    const [redirect, setRedirect] = useState(false);

    const userCtx = useContext(UserContext);

    function addReviewElementHandler(reviewElementData) {
    fetch(
        'http://localhost:8080/reviewElements/createCompany',
       {
         method: 'POST',
         body: JSON.stringify(reviewElementData, ),
         headers: {
             'Content-Type': 'application/json',
         },
         credentials: 'include'
         
        },
        
        setRedirect(true)
      
      )};

     if(redirect){
       return <Navigate to="/reviewElements"/>
     }


     if(!(userCtx.restrictions.includes("ADD_NEW_ELEMENT"))) {
     return(
        <MainLayout>
          <section>
            <ReviewElementForm onReviewElementAdd={addReviewElementHandler} />
          </section>
        </MainLayout>
        
      );
    }
    return(
      <MainLayout>
          <section>
            <Typography sx={{fontWeight:"bold"}} variant="h4">User is banned from adding new elements!</Typography>
          </section>
        </MainLayout>
    );

}

export default ReviewElementAddPage;
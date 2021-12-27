import React from 'react';
import ReviewElementForm from "../components/forms/ReviewElementForm";
import MainLayout from '../components/layout/MainLayout';
import {Navigate } from 'react-router-dom';

import {useState} from 'react';

function ReviewElementAddPage() {
    const [redirect, setRedirect] = useState(false);

    function addReviewElementHandler(reviewElementData) {

    fetch(
        'http://localhost:8080/reviewElements/createCompany',
       {
         method: 'POST',
         body: JSON.stringify(reviewElementData),
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

     return(
        <MainLayout>
          <section>
            <ReviewElementForm onReviewElementAdd={addReviewElementHandler} />
          </section>
        </MainLayout>
        
      );

}

export default ReviewElementAddPage;
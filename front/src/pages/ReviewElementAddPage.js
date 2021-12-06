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
         }
         
     },
     setRedirect(true)
      
     )};

     if(redirect){
       return <Navigate to="/reviewElements"/>
     }

     return(
        <MainLayout>
          <section>
            <h1>Create company</h1>
            <ReviewElementForm onReviewElementAdd={addReviewElementHandler} />
          </section>
        </MainLayout>
        
      );

}

export default ReviewElementAddPage;
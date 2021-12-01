import ReviewElementForm from "../components/forms/ReviewElementForm";
import MainLayout from '../components/layout/MainLayout';

function ReviewElementAddPage() {

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
     )};

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
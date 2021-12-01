import RegisterForm from '../components/forms/RegisterForm'
import LandingPageLayout from '../components/layout/LandingPageLayout';

function Register() {

 //http://localhost:8080/users/register/subscriber
 //https://mock-server-a8a92-default-rtdb.firebaseio.com/users.json

  function addUserHandler(userData) {

    
    fetch(
       'http://localhost:8080/users/register/subscriber',
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
        }
        
    },
    console.log(JSON.stringify(userData))
    )};
  

    return(
      <LandingPageLayout>
        <section>
          <h1>Register</h1>
          <RegisterForm onUserAdd={addUserHandler} />
        </section>
      </LandingPageLayout>
    );
}

export default Register;
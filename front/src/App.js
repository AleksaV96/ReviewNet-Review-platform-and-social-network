import { Route, Routes } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import Register from './pages/Register';
import Login from './pages/Login';
import ReviewElementListPage from './pages/ReviewElementListPage';
import ReviewElementView from './pages/ReviewElementPage';
import DomainPage from './pages/DomainPage';
import ReviewElementAddPage from './pages/ReviewElementAddPage';

import parseJwt from './logic/JWTutil'

import { useContext } from 'react';
import UserContext from './store/user-context';
import { useState, useEffect } from 'react';

function App() {

  let address;
  let userSearch;
  const userCtx = useContext(UserContext);
  const [isUserLogged, setIsUserLogged] = useState(false);

  let token = localStorage.getItem('Bearer');
  
  if(token !== null){
    userSearch = parseJwt(token).uniq;
    address = 'http://localhost:8080/users/' + userSearch;
  }
    
    useEffect(() => {
      if(userSearch !== undefined && isUserLogged === false) {
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

          const user = {
              "id" : data.id,
              "name" : data.name,
              "surname" : data.surname,
              "username" : data.username,
              "permission" : data.permission
          }
          userCtx.openUser(user);
          userCtx.setRestrictions(data.permission.roleDetails.restrictions);
          setIsUserLogged(true);
          });
        }
      }, [userSearch, isUserLogged, address, userCtx]);
    
  return (
    <div>
      <Routes>
          <Route path='/' exact element={<LandingPage />} />
          <Route path='/register'element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/main' element={<MainPage />} />
          <Route path='/reviewElements' element={<ReviewElementListPage />} />
          <Route path='/reviewElements/:id' element={<ReviewElementView />} />
          <Route path='/reviewElement/domain/:id' element={<DomainPage />} />
          <Route path='/reviewElements/create-company' element={<ReviewElementAddPage />} />
      </Routes>
    </div>
  );
}

export default App;

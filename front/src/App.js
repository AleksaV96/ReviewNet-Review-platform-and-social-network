import React from 'react';
import { Route, Routes } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import Register from './pages/Register';
import Login from './pages/Login';
import ReviewElementListPage from './pages/ReviewElementListPage';
import AdminReviewElementListPage from './pages/AdminReviewElementListPage';
import ReviewElementView from './pages/ReviewElementPage';
import DomainPage from './pages/DomainPage';
import ReviewElementAddPage from './pages/ReviewElementAddPage';
import Dashboard from './pages/Dashboard';
import ProfileAdminEdit from './components/layout/views/ProfileAdminEdit';

import ProtectedRoutes from './logic/ProtectedRoutes';
import AdminRoutes from './logic/AdminRoutes';

import parseJwt from './logic/JWTutil'

import { useContext } from 'react';
import UserContext from './store/user-context';
import { useState, useEffect } from 'react';
import ProfilePage from './pages/ProfilePage';
import UserPage from './pages/UserPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import UserSubscriptionsPage from './pages/UserSubscriptionsPage';
import FriendsPage from './pages/FriendsPage';
import UserFriendsPage from './pages/UserFriendsPage';
import ThemePage from './pages/ThemePage';
import ModeratedPage from './pages/ModeratedPage';
import ModeratorsPage from './pages/ModeratorsPage';
import ModeratedReviewElementPage from './pages/ModeratedReviewElementPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import UserSearchPage from './pages/UserSearchPage';
import ElementSearchPage from './pages/ElementSearchPage';
import AdminUserSearchPage from './pages/AdminUserSearchPage';
import AdminElementSearchPage from './pages/AdminElementSearchPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ModeratorElementAnalyticsPage from './pages/ModeratorElementAnalyticsPage';

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
              "permission" : data.permission,
              "email" : data.email,
              "imgUrl" : data.imgUrl,
              "friends" : data.friends,
              "subscribed" : data.subscribed
          }
          userCtx.openUser(user);
          
          try{
          userCtx.setRestrictions(data.permission.roleDetails.restrictions);
          }
          catch(error){
            console.log(error);
          }
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
          <Route element={<ProtectedRoutes />}>
              <Route path='/main' element={<MainPage />} />
              <Route path='/reviewElements' element={<ReviewElementListPage />} />
              <Route path='/reviewElement/:id' element={<ReviewElementView />} />
              <Route path='/reviewElement/:elementName/domain/:id' element={<DomainPage />} />
              <Route path='/reviewElements/create-company' element={<ReviewElementAddPage />} />
              <Route path='/profile/:username' element ={<ProfilePage />} />
              <Route path='/user/:username' element={<UserPage />} />
              <Route path='/subscriptions' element={<SubscriptionsPage />} />
              <Route path='/user/:id/subscriptions' element={<UserSubscriptionsPage />} />
              <Route path='/friends' element={<FriendsPage />} />
              <Route path='/user/:id/friends' element={<UserFriendsPage />} />
              <Route path='/reviewElement/:elementName/domain/theme/:id' element={<ThemePage />} />
              <Route path='/reviewElements/moderated' element={<ModeratedPage />} />
              <Route path='/moderatedReviewElement/:id' element={<ModeratedReviewElementPage />} />
              <Route path='/reviewElement/:elementName/moderators/:id' element={<ModeratorsPage />} />
              <Route path='/reviewElement/:elementName/analytics/:id' element={<ModeratorElementAnalyticsPage />} />
              <Route path='/profileSettings' element={<ProfileSettingsPage />} />
              <Route path='/userSearch' element={<UserSearchPage/>} />
              <Route path='/elementSearch' element={<ElementSearchPage/>} />
          </Route>
          <Route element={<AdminRoutes />}>
              <Route path='/dashboard' element={<Dashboard/>} />
              <Route path='/dashboard/user/:id' element={<ProfileAdminEdit/>} />
              <Route path='/adminUserSearch' element={<AdminUserSearchPage/>} />
              <Route path='/adminReviewElements' element={<AdminReviewElementListPage />} />
              <Route path='/adminElementSearch' element={<AdminElementSearchPage/>} />
              <Route path='/analytics' element={<AnalyticsPage/>} />
          </Route>
      </Routes>
    </div>
  );
}

export default App;

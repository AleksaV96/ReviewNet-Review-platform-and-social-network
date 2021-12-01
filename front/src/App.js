import { Route, Routes } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import Register from './pages/Register';
import Login from './pages/Login';
import ReviewElementListPage from './pages/ReviewElementListPage';
import ReviewElementView from './pages/ReviewElementPage';
import DomainPage from './pages/DomainPage';
import ReviewElementAddPage from './pages/ReviewElementAddPage';

function App() {
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

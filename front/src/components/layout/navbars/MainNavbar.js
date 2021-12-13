import classes from './MainNavbar.module.css'

import { Link } from 'react-router-dom';

import { useContext } from 'react';
import UserContext from '../../../store/user-context';

import logout from '../../../logic/Logout'

function MainNavbar() {

    const userCtx = useContext(UserContext);

    return(
    <header className={classes.header}>
      <div className={classes.logo}>ReviewNet</div>
      <nav>
        <ul>
          <li>
            <Link to='/reviewElements'>Review</Link>
          </li>
          <li>
            <Link to={'/profile/' + userCtx.content.username}>{userCtx.content.username}</Link>
          </li>
          <li>
            <img src={userCtx.content.imgUrl} alt=""/>
          </li>
          <li>
            <Link to='/' onClick={logout}>Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
    );



}

export default MainNavbar
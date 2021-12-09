import classes from './MainNavbar.module.css'

import { Link } from 'react-router-dom';

import { useContext } from 'react';
import UserContext from '../../../store/user-context';

function MainNavbar() {

    const userCtx = useContext(UserContext);

    return(
    <header className={classes.header}>
      <div className={classes.logo}>ReviewNet</div>
      <nav>
        <ul>
          <li>
            <Link to='/'>{userCtx.content.username}</Link>
          </li>
          <li>
            <Link to='/reviewElements'>Review</Link>
          </li>
        </ul>
      </nav>
    </header>
    );



}

export default MainNavbar
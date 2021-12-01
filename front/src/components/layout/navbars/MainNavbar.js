import { Link } from 'react-router-dom';

import classes from './MainNavbar.module.css'

function MainNavbar() {

    return(
    <header className={classes.header}>
      <div className={classes.logo}>ReviewNet</div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Profile</Link>
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
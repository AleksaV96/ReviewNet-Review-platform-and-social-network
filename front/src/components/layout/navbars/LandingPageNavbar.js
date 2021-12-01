import { Link } from 'react-router-dom';

import classes from './LandingPageNavbar.module.css'

function LandingPageNavbar() {

    return(
    <header className={classes.header}>
      <div className={classes.logo}>ReviewNet</div>
      <nav>
        <ul>
          <li>
            <Link to='/register'>Register</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
      </nav>
    </header>
    );



}


export default LandingPageNavbar;
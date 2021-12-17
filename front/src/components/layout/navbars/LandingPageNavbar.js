import { AppBar, CssBaseline, Toolbar, Typography, Button } from '@mui/material';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import React from 'react';
import { Link } from 'react-router-dom';

import classes from './LandingPageNavbar.module.css'

function LandingPageNavbar() {

    return(
    <div>
      <CssBaseline />
      <AppBar>
        <Toolbar>
            <ConnectWithoutContactIcon />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>ReviewNet</Typography>
            <Button color="inherit" component={Link} to={'/register'}>Register</Button>
            <Button color="inherit" component={Link} to={'/login'}>Login</Button>
        </Toolbar>
      </AppBar>
      </div>

    /*
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
    */
    );



}


export default LandingPageNavbar;
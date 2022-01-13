import { AppBar, CssBaseline, Toolbar, Typography, Button } from '@mui/material';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import React from 'react';
import { Link } from 'react-router-dom';


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

    );



}


export default LandingPageNavbar;
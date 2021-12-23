import React from 'react';
import classes from './MainNavbar.module.css'

import { Link } from 'react-router-dom';

import { useContext } from 'react';
import UserContext from '../../../store/user-context';

import logout from '../../../logic/Logout'
import { AppBar, CssBaseline, Toolbar, Typography, Button, IconButton, Avatar, Drawer, Container } from '@mui/material';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import LogoutIcon from '@mui/icons-material/Logout';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import PreviewIcon from '@mui/icons-material/Preview';
import FeedIcon from '@mui/icons-material/Feed';


function MainNavbar() {
  
    const userCtx = useContext(UserContext);

    return(
      <div>
      <CssBaseline />
        <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
          <Toolbar>
            <ConnectWithoutContactIcon />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ReviewNet
            </Typography>
            <IconButton>
            <Avatar alt="loggedUser" src={userCtx.content.imgUrl} component={Link} to={'/main'} sx={{ width: 50, height: 50 }}/>
            </IconButton>
            <Button color="inherit" component={Link} to={'/profile/' + userCtx.content.username} sx={{ textTransform : 'none' }}>
            {userCtx.content.username}
            </Button>
            <Button color="inherit" component={Link} to={'/login'} onClick={logout}>
              <LogoutIcon />
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
        variant="permanent"
        sx={{
          width: 180,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 180, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
        <List>
        <ListItem disablePadding>
            <ListItemButton component={Link} to="/main">
              <ListItemIcon>
                <FeedIcon/>
              </ListItemIcon>
              <ListItemText primary="Main Feed" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/friends">
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/subscriptions">
              <ListItemIcon>
                <SubscriptionsIcon />
              </ListItemIcon>
              <ListItemText primary="Subscribed" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/reviewElements">
              <ListItemIcon>
                <PreviewIcon />
              </ListItemIcon>
              <ListItemText primary="Review" />
            </ListItemButton>
          </ListItem>
        <Divider />
        </List>
        </Box>
      </Drawer>
      </div>


    /*
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
    */

    );



}

export default MainNavbar
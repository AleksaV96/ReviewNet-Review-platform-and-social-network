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
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import PageviewIcon from '@mui/icons-material/Pageview';


function ModeratorNavbar() {
  
    const userCtx = useContext(UserContext);

    return(
      <div>
      <CssBaseline />
        <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor:"#009688"}}>
          <Toolbar>
            <ConnectWithoutContactIcon />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ReviewNet Premium
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
          width: 200,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 200, boxSizing: 'border-box' },
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
                <PageviewIcon />
              </ListItemIcon>
              <ListItemText primary="Review" />
            </ListItemButton>
          </ListItem>
        <Divider />
        <ListItem disablePadding>
            <ListItemButton component={Link} to="/reviewElements/create-company">
              <ListItemIcon>
                <AddModeratorIcon />
              </ListItemIcon>
              <ListItemText primary="Create element" />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton component={Link} to="/reviewElements">
              <ListItemIcon>
                <PreviewIcon />
              </ListItemIcon>
              <ListItemText primary="Moderated" />
            </ListItemButton>
        </ListItem>
        </List>
        </Box>
      </Drawer>
      </div>
    );



}

export default ModeratorNavbar;
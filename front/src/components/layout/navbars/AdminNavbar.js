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

import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';


function AdminNavbar() {
  
    const userCtx = useContext(UserContext);

    return(
      <div>
      <CssBaseline />
        <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor:"#673ab7"}}>
          <Toolbar>
            <ConnectWithoutContactIcon />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ReviewNet Admin
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
            <ListItemButton component={Link} to="/dashboard">
              <ListItemIcon>
                <DashboardIcon/>
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/adminReviewElements">
              <ListItemIcon>
                <PageviewIcon />
              </ListItemIcon>
              <ListItemText primary="Elements" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AnalyticsIcon />
              </ListItemIcon>
              <ListItemText primary="Analitics" />
            </ListItemButton>
          </ListItem>
        <Divider />
        </List>
        </Box>
      </Drawer>
      </div>
    );



}

export default AdminNavbar;
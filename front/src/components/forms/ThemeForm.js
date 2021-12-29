import { useRef, useState } from 'react';
import React from 'react';

import { styled } from '@mui/material/styles';

import { useContext } from 'react';
import UserContext from '../../store/user-context';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';
import { CardActions } from '@mui/material';





function ThemeForm(props){

    const userCtx = useContext(UserContext);

    const nameInputRef = useRef();
    const contentInputRef = useRef();

    const address = 'http://localhost:8080/reviewElement/postSpace/' + props.domain.id + '/create-theme';
    
    function submitHandler(event) {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;


    const postData = {
        name: enteredName,
        elementId : props.domain.elementId,
        parentId : props.domain.id,

    }

        fetch(
        address,
        {
         method: 'POST',
         body: JSON.stringify(postData),
         headers: {
             'Content-Type': 'application/json',
        },
        credentials: 'include'
        },
     
        window.location.reload(),
     
        )
    }


    return(
        <Container component="main" maxWidth="sm" sx={{position:"fixed", zIndex:1000, top:"12.1cm"}}>
        <CssBaseline />
        <Card sx={{bgcolor:"#f5f5f5", width:"14.6cm"}}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
                <TextField
                  sx={{bgcolor:"white"}}
                  autoComplete="title"
                  name="title"
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                  inputRef={nameInputRef}
                />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Theme
            </Button>
          </Box>       
        </Box>
        </Card>
      </Container>
    )


}

export default ThemeForm;
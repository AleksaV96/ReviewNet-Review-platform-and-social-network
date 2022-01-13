import { useRef, useState } from 'react';
import React from 'react';

import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';





function ThemeForm(props){

    const nameInputRef = useRef();

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

    const ExpandMore = styled((props) => {
      const { expand, ...other } = props;
      return <IconButton {...other} />;
    })(({ theme, expand }) => ({
      transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    }));
  
    const [expanded, setExpanded] = useState(false);

      
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return(

      
      <Container component="main" maxWidth="sm" sx={{position:"fixed", zIndex:1000, top:"15.1cm"}}>
        <CssBaseline />
        <Card sx={{bgcolor:"#9e9e9e"}}>
            <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
                <ExpandLessIcon sx={{color:"white"}}/>
            </ExpandMore>
        </Card>
        <Collapse in={expanded} timeout="auto" sx={{position:"absolute", bottom:"12mm",  }} unmountOnExit>
        <Card sx={{bgcolor:"#f5f5f5", width:"14.6cm"}}>
        <Box
          sx={{
            paddingLeft:"1cm",
            paddingRight:"1cm"
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
        </Collapse>
      </Container>


          /*
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
      */
    )


}

export default ThemeForm;
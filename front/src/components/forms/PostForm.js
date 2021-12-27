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

function PostForm(props) {

    const userCtx = useContext(UserContext);

    const nameInputRef = useRef();
    const contentInputRef = useRef();
    
    function submitHandler(event) {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredContent = contentInputRef.current.value;
        const authorUsername = userCtx.content.username;

    const postData = {
        name: enteredName,
        content: enteredContent,
        authorUsername: authorUsername,
        elementId : props.elementId,
        domainId : props.domainId,
        postLocation : props.postLocation
    }

      props.onPostAdd(postData);
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{bgcolor:"white"}}
                  required
                  fullWidth
                  id="content"
                  label="Content"
                  name="Content"
                  autoComplete="content"
                  multiline={true}
                  rows={3}
                  inputRef={contentInputRef}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Post
            </Button>
          </Box>       
        </Box>
        </Card>
        </Collapse>
      </Container>


        /*
        <CardPost>
            <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='name'>Title</label>
                <input type='text' required id='name' ref={nameInputRef} />
            </div>
            <div className={classes.control}>
            <label htmlFor='content'>Content</label>
            <textarea
                id='content'
                required
                rows='3'
                ref={contentInputRef}
            ></textarea>
            </div>
            <div className={classes.actions}>
                <button>Post</button>
            </div>
            </form>
      </CardPost>
        */
    )

} 

export default PostForm;
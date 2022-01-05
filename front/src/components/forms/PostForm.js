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

    let buttonText = "Post";
    const nameInputRef = useRef();
    const contentInputRef = useRef();
    
    function submitHandler(event) {
        event.preventDefault();

        var enteredName = "Reply to " + props.domainId;
        if(userCtx.selectedPost === ""){
        enteredName = nameInputRef.current.value;
        }
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

    let title = <Grid item xs={12}>
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

    if(userCtx.selectedPost !== ""){
      title = <Typography variant="h6" color="text.secondary" sx={{width: "100%", textAlign: "center"}}>
        Replying to {userCtx.selectedPostAuthor}</Typography>
      buttonText = "Reply";
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
          <Box component="form" onSubmit={submitHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
            {title}
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
              {buttonText}
            </Button>
          </Box>       
        </Box>
        </Card>
        </Collapse>
      </Container>
    )

} 

export default PostForm;
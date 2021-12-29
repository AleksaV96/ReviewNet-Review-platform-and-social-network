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
import Rating from '@mui/material/Rating';
import { CardActions } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

function ReviewPostForm(props) {

    const userCtx = useContext(UserContext);
    var [value, setValue] = useState(0);
    const [hover, setHover] = React.useState(-1);
    let buttonText = "Post";

    const labels = {
        0.5 : 'Catastrophic',
        1: 'Useless',
        1.5: 'Useless',
        2: 'Useless+',
        2.5: 'Useless+',
        3: 'Poor',
        3.5: 'Poor',
        4: 'Poor+',
        4.5: 'Poor+',
        5: 'Ok',
        5.5: 'Ok',
        6: 'Ok+',
        6.5: 'Ok+',
        7: 'Good',
        7.5: 'Good',
        8: 'Good+',
        8.5: 'Good+',
        9: 'Excellent',
        9.5: 'Excellent',
        10: 'Excellent+',
      };

    const nameInputRef = useRef();
    const contentInputRef = useRef();


    function submitHandler(event) {
        event.preventDefault();

        var enteredName = "Reply to " + props.domainId;
        if(userCtx.selectedPost === ""){
        enteredName = nameInputRef.current.value;
        }
        const enteredContent = contentInputRef.current.value;
        const enteredRating = value;
        const authorUsername = userCtx.content.username;

    const postData = {
        name: enteredName,
        content: enteredContent,
        grade: enteredRating,
        authorUsername : authorUsername,
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

    let rating = <Grid item xs={12}>
                  <Box
                  sx={{
                  width: 200,
                  display: 'flex',
                  alignItems: 'center',
                  }}
                  >
                  <Rating
                      sx={{margin:"3mm"}}
                      name="rating"
                      value={value}
                      max={10}
                      size="large"
                      precision={0.5}
                      onChange={(event, newValue) => {
                      setValue(newValue);         
                      }}
                      onChangeActive={(event, newHover) => {
                      setHover(newHover);
                      }}
                      emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                      />
                  <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                  </Box>
                </Grid>

    if(userCtx.selectedPost !== ""){
      rating = ""
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
    
    const [expanded, setExpanded] = React.useState(false);
      
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
        <Card sx={{bgcolor:"#f5f5f5", width:"14.6cm", paddingLeft:"1cm", paddingRight:"1cm"}}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            {rating}
            {title}
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
                  multiline
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






        /*
        <Card>
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
                rows='5'
                ref={contentInputRef}
            ></textarea>
            </div>
            <div className={classes.control}>
                <label htmlFor="rating">Rate:</label>
                <input type="number" id="rating" name="rating" min="1" max="10" ref={ratingInputRef}/>
            </div>
            <div className={classes.actions}>
                <button>Create</button>
            </div>
            </form>
      </Card>
      */

    )

} 

export default ReviewPostForm;
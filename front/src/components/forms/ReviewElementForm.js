import { useRef } from 'react';
import React from 'react';

import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar';
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

import AddModeratorIcon from '@mui/icons-material/AddModerator';

import { useContext } from 'react';
import UserContext from '../../store/user-context';

function ReviewElementForm(props) {
    const userCtx = useContext(UserContext);
    const nameInputRef = useRef();
    const descriptionInputRef = useRef();
    const imgUrlInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
    
        const enteredName = nameInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredImgUrl = imgUrlInputRef.current.value;
    

    const reviewElementData = {
        name : enteredName,
        description : enteredDescription,
        imgUrl : enteredImgUrl,
        creatorId : userCtx.content.id
    }
        props.onReviewElementAdd(reviewElementData);
    }

    return(
        <Card>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            marginBottom: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AddModeratorIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create element
          </Typography>
          <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  inputRef={nameInputRef}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="description"
                  multiline={true}
                  rows={3}
                  inputRef={descriptionInputRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="imgUrl"
                  label="Element Logo"
                  type="url"
                  id="imgUrl"
                  autoComplete="imgUrl"
                  inputRef={imgUrlInputRef}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Container>
      </Card>


        /*
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='name'>Name</label>
                <input type='text' required id='name' ref={nameInputRef} />
            </div>
            <div className={classes.control}>
            <label htmlFor='description'>Description</label>
            <textarea
                id='description'
                required
                rows='5'
                ref={descriptionInputRef}
            ></textarea>
            </div>
            <div className={classes.control}>
            <label htmlFor='imgUrl'>Company photo link</label>
            <input type='url' required id='imgUrl' ref={imgUrlInputRef} />
            </div>
            <div className={classes.actions}>
                <button>Create</button>
            </div>
            </form>
      </Card>
      */


    )
}

export default ReviewElementForm;
import { useRef } from 'react';
import TextField from '@mui/material/TextField';

import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/system';

function SearchForm(props){

    const nameInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;

        const name = enteredName;

        props.onSearch(name);
    }

    return(
        <Box component="form" onSubmit={submitHandler} sx={{marginBottom:"1cm"}}>
            <TextField sx={{width:"88%"}}
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    autoFocus
                    inputRef={nameInputRef}
            />
            <Button variant="contained" sx={{height:"55px", marginLeft:"5px"}} type="submit">
                <SearchIcon fontSize="large"/></Button>
        </Box>
    );

}

export default SearchForm;
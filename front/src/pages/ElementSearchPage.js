import React from 'react';
import { useState, useEffect } from 'react';
import SearchForm from '../components/forms/SearchForm'
import ReviewElementCard from '../components/layout/cards/ReviewElementCard';
import MainLayout from '../components/layout/MainLayout';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


function ElementSearchPage(){

    let searchCard = "";

    const [loadedElement, setLoadedElement] = useState({});
    const [ address, setAddress ] = useState("");

    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function elementSearchHandler(name){
        setAddress('http://localhost:8080/reviewElements/reviewElementName/' + capitalizeFirstLetter(name));
    }

    
        useEffect(() => {
            if(address !== "") {
            fetch(
                address,
                {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
                }
            )
            .then((response) => {    
                if(response.status === 404) {
                    console.log(response)
                    setLoadedElement({});
                    setErrorMessage("Element not found!")
                    setOpen(true);
                }
                return response.json();
            })
            .then((data) => {
                try{
                const element = {
                    "id" : data.id,
                    "name" : data.name,
                    "description" : data.description,
                    "imgUrl" : data.imgUrl
                }
                setLoadedElement(element);
                }
                catch(e) {}
                });
            }
        }, [address]);
    
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
    }
    setOpen(false);
    };

    

    if(loadedElement.id !== undefined){
        console.log(loadedElement);
        searchCard =<ReviewElementCard
        name={loadedElement.name} description={loadedElement.description}
        image={loadedElement.imgUrl} id={loadedElement.id} />
    }

    return(
        <MainLayout>
            <SearchForm onSearch={elementSearchHandler}/>
            {searchCard}
            <Snackbar sx={{ width: '30%' }} open={open} autoHideDuration={1800} anchorOrigin={{horizontal:"center", vertical:"bottom"}} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {errorMessage}
            </Alert>
            </Snackbar>
        </MainLayout>

    );
}

export default ElementSearchPage;
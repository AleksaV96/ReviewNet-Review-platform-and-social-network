import { React, useState, useEffect } from 'react';
import classes from "./DomainList.module.css";
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import ThemeCard from '../cards/ThemeCard';

function ThemeList(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedThemes, setLoadedThemes] = useState([]);
    const [loadedElement, setLoadedElement] = useState({});
    const [isElementLoaded, setIsElementLoaded] = useState(false);
    const address = "http://localhost:8080/reviewElement/postSpace/" + props.domainId + "/themes"
    const address2 = 'http://localhost:8080/reviewElements/reviewElementName/' + props.elementName;
    

    useEffect(() => {
        setIsLoading(true);
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
            return response.json();
        })
        .then((data) => {
            const themes = [];
            for (const key in data) {
            const theme = {
                id: key,
                ...data[key]
            };
            
            themes.push(theme);
            }
            setIsLoading(false);
            setLoadedThemes(themes);
            
        });
    }, [address]);

    useEffect(() => {
        fetch(
            address2,
            {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
            }
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const element = {
                "id" : data.id,
                "name" : data.name,
                "moderators" : data.moderators
            }
            setLoadedElement(element);
            setIsElementLoaded(true);
          });
      }, [address2]);

    if (isLoading) {
        return (
        <section>
            <p>Loading...</p>
        </section>
        );
    }

    if(isElementLoaded) {
    return (
      <Grid container spacing={0.3}>  
          {loadedThemes.map((theme) => (
            <Grid item xs={12} md={12}>
            <ThemeCard
              key={theme.id}
              id={theme.id}
              name={theme.name}
              type={theme.type}
              posts={theme.postCollection}
              elementName={props.elementName}
              moderators={loadedElement.moderators}
              />
            </Grid>
          ))}
       </Grid>
      );
    }
    
    else{
        return "";
    }


}

export default ThemeList;
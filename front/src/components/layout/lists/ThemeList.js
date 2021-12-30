import { React, useState, useEffect } from 'react';
import classes from "./DomainList.module.css";
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import ThemeCard from '../cards/ThemeCard';

function ThemeList(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedThemes, setLoadedThemes] = useState([]);
    const address = "http://localhost:8080/reviewElement/postSpace/" + props.domainId + "/themes"
    

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

    if (isLoading) {
        return (
        <section>
            <p>Loading...</p>
        </section>
        );
    }

    return (
      <Grid container spacing={0.3}>  
          {loadedThemes.map((theme) => (
            <Grid item xs={12} md={12}>
            <Link to={'/reviewElement/' + props.elementName + '/domain/theme/'+ theme.id}>
            <ThemeCard
              key={theme.id}
              id={theme.id}
              name={theme.name}
              type={theme.type}
              posts={theme.postCollection}
              />
            </Link>
            </Grid>
          ))}
       </Grid>
      );


}

export default ThemeList;
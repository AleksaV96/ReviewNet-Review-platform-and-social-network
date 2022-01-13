import React from 'react';
import DomainCard from "../cards/DomainCard"
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

function DomainList(props) {

    let elementName;
    try{
      elementName = props.element[0].name
    }
    catch(e){}

    return (
      <Grid container spacing={2}>  
          {props.domains.map((domain) => (
            <Grid item xs={6} md={6}>
            <Link style={{ textDecoration: 'none' }} to={'/reviewElement/'+ elementName +'/domain/'+ domain.id}>
            <DomainCard
              key={domain.id}
              id={domain.id}
              name={domain.name}
              type={domain.type}
              />
            </Link>
            </Grid>
          ))}
       </Grid>
      );


}

export default DomainList;
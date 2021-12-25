import React from 'react';
import classes from "./DomainList.module.css";
import DomainCard from "../cards/DomainCard"
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

function DomainList(props) {

    return (
      <Grid container spacing={2}>  
          {props.domains.map((domain) => (
            <Grid item xs={6} md={6}>
            <Link to={'/reviewElement/domain/'+ domain.id}>
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
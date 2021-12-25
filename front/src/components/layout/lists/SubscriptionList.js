import { Link } from 'react-router-dom';
import SubscriptionCard from "../cards/SubscriptionCard";
import { Grid } from '@mui/material';

function SubscriptionList(props){
    return (
      <Grid container spacing={2}>  
            {props.elements.map((element) => (
              <Grid item xs={6} md={6}>
              <SubscriptionCard
                key={element.id}
                id={element.id}
                name={element.name}
                description={element.description}
                image={element.imgUrl}     
              />
            </Grid>
            ))}
        </Grid>
        );
  
}

export default SubscriptionList;
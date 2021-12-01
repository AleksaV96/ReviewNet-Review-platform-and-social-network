import classes from "./DomainList.module.css";
import DomainCard from "../cards/DomainCard"
import { Link } from 'react-router-dom';

function DomainList(props) {

    return (
        <div className={classes.list}>
          {props.domains.map((domain) => (
            <Link to={'/reviewElement/domain/'+ domain.id}>
            <DomainCard
              key={domain.id}
              id={domain.id}
              name={domain.name}
              />
            </Link>
          ))}
        </div>
      );


}

export default DomainList;
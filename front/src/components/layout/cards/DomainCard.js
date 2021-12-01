import classes from "./DomainCard.module.css";
import Card from "../../ui/Card";

function DomainCard(props) {

    return (
        <div className={classes.item} key={props.id} id={props.id}>
          <Card>
            <div className={classes.content}>
              <h3>{props.name}</h3>
            </div>
          </Card>
        </div>
      );

}

export default DomainCard;
import classes from "./PostCard.module.css";
import Card from "../../ui/Card";

function PostCard(props) {

    if(props.grade != null) {
      var grade = <h2>{props.grade}</h2>;
    }

    return (
        <div className={classes.item} key={props.id} id={props.id}>
          <Card>
            <div className={classes.content}>
              <div>
              {grade}
              </div>
              <h3>{props.name}</h3>
              <p>{props.content}</p>
              <p>By: {props.authorUsername}</p>
            </div>
          </Card>
        </div>
      );

}

export default PostCard;
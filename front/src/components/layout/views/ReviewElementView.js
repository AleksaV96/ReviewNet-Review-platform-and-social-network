import classes from '../cards/ReviewElementCard.module.css';
import ReviewElementViewCard from '../cards/ReviewElementViewCard';

function ReviewElementView(props) {
  return (
    <div className={classes.list}>
      {props.element.map((element) => (
        <div>
        <ReviewElementViewCard
          key={element.id}
          id={element.id}
          name={element.name}
          description={element.description}
          image={element.imgUrl}
        />
        </div>
      ))}
    </div>
  );

}

export default ReviewElementView;
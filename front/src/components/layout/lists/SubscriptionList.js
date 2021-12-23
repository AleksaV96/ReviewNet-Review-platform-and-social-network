import { Link } from 'react-router-dom';
import SubscriptionCard from "../cards/SubscriptionCard";

function SubscriptionList(props){
    return (
        <div>
          <ul>
            {props.elements.map((element) => (
              <div>
              <SubscriptionCard
                key={element.id}
                id={element.id}
                name={element.name}
                description={element.description}
                image={element.imgUrl}
              />
              </div>
            ))}
          </ul>
          </div>
        );

}

export default SubscriptionList;
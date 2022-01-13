import { Link } from 'react-router-dom';
import FriendCard from "../cards/FriendCard";

function FriendList(props){
    return (
        <div>
          <ul>
            {props.friends.map((friend) => (
              <Link style={{ textDecoration: 'none' }} to={'/user/'+ friend.username}>
              <FriendCard
                key={friend.id}
                id={friend.id}
                username={friend.username}
                name={friend.name}
                surname={friend.surname}
                image={friend.imgUrl}
              />
              </Link>
            ))}
          </ul>
          </div>
        );

}

export default FriendList;
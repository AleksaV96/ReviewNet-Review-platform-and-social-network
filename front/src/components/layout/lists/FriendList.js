import FriendCard from "../cards/FriendCard";

function FriendList(props){
    return (
        <div>
          <ul>
            {props.friends.map((friend) => (
              <FriendCard
                key={friend.id}
                id={friend.id}
                username={friend.username}
                name={friend.name}
                surname={friend.surname}
                image={friend.imgUrl}
                settings={friend.profile.profileSettings}
              />
            ))}
          </ul>
          </div>
        );

}

export default FriendList;
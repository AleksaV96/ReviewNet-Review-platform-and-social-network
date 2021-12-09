import PostCard from "../cards/PostCard";
import classes from "./PostList.module.css";
import { Link } from 'react-router-dom';

function PostList(props) {

    return (
        <ul className={classes.list}>
          {props.posts.map((post) => (
            <div component={Link} to="">
            <PostCard
              key={post.id}
              id={post.id}
              name={post.name}
              content={post.content}
              authorUsername={post.authorUsername}
              grade={post.grade}
            />
            </div>
          ))}
        </ul>
      );

}

export default PostList;
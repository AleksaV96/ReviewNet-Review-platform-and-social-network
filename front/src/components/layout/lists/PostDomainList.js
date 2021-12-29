import React from 'react';
import PostDomainCard from "../cards/PostDomainCard";
import classes from "./PostList.module.css";
import { Link } from 'react-router-dom';

function PostDomainList(props) {
    return (
        <ul className={classes.list}>
          {props.posts.map((post) => (
            <div component={Link} to="">
            <PostDomainCard
              key={post.id}
              id={post.id}
              name={post.name}
              content={post.content}
              likes={post.likes}
              replies={post.replies}
              authorUsername={post.authorUsername}
              grade={post.grade}
              elementId={post.elementId}
              domainId={post.domainId}
              postLocation={post.postLocation}
              user={post.author}
            />
            </div>
          ))}
        </ul>
      );

}

export default PostDomainList;
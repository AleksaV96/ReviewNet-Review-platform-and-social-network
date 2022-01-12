import React from 'react';
import PostDomainCard from "../cards/PostDomainCard";
import classes from "./PostList.module.css";
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import { useState, useEffect } from 'react';

function PostDomainList(props) {
    
    var elementId;
    var address;
    const { elementName } = useParams();
    if(props.domain.elementId !== undefined){

      elementId = props.domain.elementId;
      address = 'http://localhost:8080/reviewElements/reviewElementId/' + elementId;
    }
    else{
      address = 'http://localhost:8080/reviewElements/reviewElementName/' + elementName;
    }

    const [loadedElement, setLoadedElement] = useState({});
    const [isElementLoaded, setIsElementLoaded] = useState(false);

    useEffect(() => {
      fetch(
          address,
          {
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include'
          }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const element = {
              "id" : data.id,
              "name" : data.name,
              "moderators" : data.moderators
          }
          setLoadedElement(element);
          setIsElementLoaded(true);
        });
    }, [address]);

    if(isElementLoaded) {
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
              parentId={props.domain.elementId}
              postLocation={post.postLocation}
              user={post.author}
              moderators={loadedElement.moderators}
            />
            </div>
          ))}
        </ul>
      );
      }
      else{
        return "";
      }

}

export default PostDomainList;
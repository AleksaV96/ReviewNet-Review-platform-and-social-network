import { React, useState, useEffect } from 'react';
import { useParams } from "react-router";

import MainLayout from '../components/layout/MainLayout'
import PostDomainList from '../components/layout/lists/PostDomainList';
import DomainHeader from '../components/layout/headers/DomainHeader';
import PostAddPage from './PostAddPage';

function ThemePage() {

    const { id } = useParams();
    const { elementName } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isThemeLoaded, setIsThemeLoaded] = useState(false);
    const [loadedPosts, setLoadedPosts] = useState([]);
    const [loadedTheme, setLoadedTheme] = useState({});

    const address = 'http://localhost:8080/reviewElement/postSpace/theme/' + id;
    const address2 = 'http://localhost:8080/reviewElement/postSpace/theme/' + id + '/feed';

    useEffect(() => {
        setIsLoading(true);
        fetch(
            address2,
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
            const posts = [];
            for (const key in data) {
            const post = {
                id: key,
                ...data[key]
            };
            
            posts.push(post);
            }
            setIsLoading(false);
            setLoadedPosts(posts);
            
        });
    }, [address2]);

    useEffect(() => {
        setIsLoading(true);
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
            const theme = {
                "id" : data.id,
                "name" : data.name,
                "type" : data.type,
                "parentId" : data.parentId,
                "elementId" : data.elementId,
                "posts" : data.postCollection
            }
            setIsLoading(false);
            setLoadedTheme(theme);
            setIsThemeLoaded(true);
          });
      }, [address]);
    

    if (isLoading) {
        return (
        <section>
            <p>Loading...</p>
        </section>
        );
    }
    
    if(isThemeLoaded) {
    return (
        <MainLayout>
        <section>
            <PostAddPage domain={loadedTheme}/>
            <DomainHeader domain={loadedTheme}/>
            <PostDomainList posts={loadedPosts} domain={loadedTheme}/>
        </section>
        </MainLayout>
    );
    }
    else{
        return "";
    }


}

export default ThemePage;
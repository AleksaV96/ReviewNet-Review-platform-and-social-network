import { useState, useEffect } from 'react';

import PostList from "../components/layout/lists/PostList";
import MainLayout from "../components/layout/MainLayout";

import { useContext } from 'react';
import UserContext from '../store/user-context';

function MainPage() {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedPosts, setLoadedPosts] = useState([]);

    const address = 'http://localhost:8080/posts/all';

    const userCtx = useContext(UserContext);

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
    }, [address]);


    try {
        if(userCtx.restrictions.length !== 0)
            console.log(userCtx.restrictions);
    }
    catch(err){
        console.log(err);
    }


    if (isLoading) {
        return (
        <section>
            <p>Loading...</p>
        </section>
        );
    }

    return(
        <MainLayout>
            <PostList posts={loadedPosts} />
        </MainLayout>
    );
}

export default MainPage;
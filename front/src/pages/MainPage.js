import { useState, useEffect } from 'react';

import PostList from "../components/layout/lists/PostList";
import MainLayout from "../components/layout/MainLayout";

function MainPage() {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedPosts, setLoadedPosts] = useState([]);

    const address = 'http://localhost:8080/posts/all';

    useEffect(() => {
        setIsLoading(true);
        fetch(
            address
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
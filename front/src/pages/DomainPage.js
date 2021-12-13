import { useState, useEffect } from 'react';
import { useParams } from "react-router";

import MainLayout from '../components/layout/MainLayout'
import PostList from '../components/layout/lists/PostList';
import DomainHeader from '../components/layout/headers/DomainHeader';
import PostAddPage from './PostAddPage';

function DomainPage() {

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    //const [isDomainLoaded, isDomainLoadedSet] = useState(false);
    const [loadedPosts, setLoadedPosts] = useState([]);
    const [loadedDomain, setLoadedDomain] = useState([]);
    const [loadedGrades, setLoadedGrades] = useState([]);

    const address = 'http://localhost:8080/reviewElement/postSpace/' + id + '/feed';
    const address2 = 'http://localhost:8080/reviewElement/postSpace/' + id;
    //var type;
    //var list;

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
            const dmn = [];
            const domain = {
                "id" : data.id,
                "name" : data.name,
                "type" : data.type,
                "description" : data.description,
                "imgUrl" : data.imgUrl
            }

            dmn.push(domain);
            setIsLoading(false);
            setLoadedDomain(dmn);
        
            //isDomainLoadedSet(true);
          });
      }, [address2]);
    
    useEffect(() => {
        setIsLoading(true);

        const grd = [];
        for (var i = 0; i< loadedPosts.length; i++){
            grd.push(loadedPosts[i].grade);
        }
        if(grd[0] !== undefined){
            setLoadedGrades(grd);
        }
        setIsLoading(false);

    },[loadedPosts]);
      

    if (isLoading) {
        return (
        <section>
            <p>Loading...</p>
        </section>
        );
    }

    /*
    if (isDomainLoaded === true) {
        type = loadedDomain[0].type;
        if(type === "forum") {
            list = <p>Forum List</p>;
        }
        else{
            list = <PostList posts={loadedPosts} />
        }
    }
    */
    
    return (
        <MainLayout>
        <section>
            <DomainHeader domain={loadedDomain} grades={loadedGrades}/>
            <PostList posts={loadedPosts} />
            <PostAddPage domain={loadedDomain}/>
        </section>
        </MainLayout>
    );



}

export default DomainPage;
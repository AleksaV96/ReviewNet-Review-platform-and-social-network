import { React, useState, useEffect } from 'react';
import { useParams } from "react-router";

import MainLayout from '../components/layout/MainLayout'
import PostDomainList from '../components/layout/lists/PostDomainList';
import DomainHeader from '../components/layout/headers/DomainHeader';
import PostAddPage from './PostAddPage';
import ThemeList from '../components/layout/lists/ThemeList';
import ThemeForm from '../components/forms/ThemeForm';

function DomainPage() {

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isDomainLoaded, isDomainLoadedSet] = useState(false);
    const [loadedPosts, setLoadedPosts] = useState([]);
    const [loadedDomain, setLoadedDomain] = useState({});
    const [loadedGrades, setLoadedGrades] = useState([]);

    const address = 'http://localhost:8080/reviewElement/postSpace/' + id + '/feed';
    const address2 = 'http://localhost:8080/reviewElement/postSpace/' + id;
    let type;
    let postAdd;
    let list;

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
            const domain = {
                "id" : data.id,
                "name" : data.name,
                "type" : data.type,
                "parentId" : data.parentId,
                "posts" : data.postCollection
            }
            setIsLoading(false);
            setLoadedDomain(domain);
        
            isDomainLoadedSet(true);
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

    if (isDomainLoaded === true) {
        type = loadedDomain.type;
        if(type === "forum") {
            list = <ThemeList domainId={loadedDomain.id}/>
            postAdd = <ThemeForm domain={loadedDomain}/>
        }
        else{
            list = <PostDomainList posts={loadedPosts} />
            postAdd = <PostAddPage domain={loadedDomain}/>
        }
    }

    return (
        <MainLayout>
        <section>
            {postAdd}
            <DomainHeader domain={loadedDomain} grades={loadedGrades}/>
            {list}
        </section>
        </MainLayout>
    );



}

export default DomainPage;
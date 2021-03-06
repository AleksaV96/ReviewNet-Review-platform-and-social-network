import React from 'react';
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import UserList from "../components/layout/lists/UserList";
import MainLayout from "../components/layout/MainLayout";
import Button from '@mui/material/Button';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

function Dashboard() {

    const [isLoading, setIsLoading] = useState(true);
    const [loadedUsers, setLoadedUsers] = useState([]);
    
    const address = 'http://localhost:8080/users/all';

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
            const users = [];
            for (const key in data) {
            const user = {
                id: key,
                ...data[key]
            };

            users.push(user);
            }
            
            setIsLoading(false);
            setLoadedUsers(users);
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
            <Button sx={{position:"relative", left:"6.5cm", marginBottom:"1cm"}} variant="contained" component={Link} to={'/adminUserSearch'}>
                Search users<PersonSearchIcon/></Button>
            <section>
            <UserList users={loadedUsers} />
            </section>
        </MainLayout>
    );

}

export default Dashboard;
import React from 'react';
import { useParams } from "react-router";
import { useState, useEffect } from 'react';

import MainLayout from "../../layout/MainLayout";
import UserRestrictionsForm from "../../forms/UserRestrictionsForm";

function ProfileAdminEdit(props) {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [loadedUser, setLoadedUser] = useState({});
    const [activeStatus, setActiveStatus] = useState("");

    const address = 'http://localhost:8080/users/admin/userId/' + id;
    const address2 = 'http://localhost:8080/users/userId/' + id + '/set-active-status';

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

            if(data.logicDelete){
                setActiveStatus("INACTIVE");
            }
            else{
                setActiveStatus("ACTIVE");
            }
            
            const user = {
                "id" : data.id,
                "username" : data.username,
                "name" : data.name,
                "surname" : data.surname,
                "email" : data.email,
                "activeStatus" : data.logicDelete,
                "permission" : data.permission
            }
            console.log(data.permission);
            setLoadedUser(user);
            setIsLoading(false);
          });
      }, [address]);

      function activeStatusHandler(event) {
        fetch(
            address2,
            {
             method: 'PUT',
             body: JSON.stringify(event.target.value),
             headers: {
                 'Content-Type': 'application/json',
            },
            credentials: 'include'
            }        
            ).then((response) => {
                console.log(response);
                window.location.reload();
              }
            )};  
            
      if (isLoading) {
        return (
          <section>
            <p>Loading...</p>
          </section>
        );
      }

      

      return(
          <MainLayout>
              <h1>{loadedUser.username}</h1>
              <h3>{activeStatus}</h3>
              <button onClick={activeStatusHandler} value={true}>MAKE INACTIVE</button>
              <button onClick={activeStatusHandler} value={false}>MACE ACTIVE</button>
              <UserRestrictionsForm user={loadedUser}/>
          </MainLayout>
      )
} 

export default ProfileAdminEdit;
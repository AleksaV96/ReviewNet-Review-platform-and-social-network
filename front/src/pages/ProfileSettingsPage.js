import { useState, useEffect } from 'react';
import MainLayout from "../components/layout/MainLayout";
import ProfileSettingsForm from '../components/forms/ProfileSettingsForm'
import parseJwt from '../logic/JWTutil'

function ProfileSettingsPage() {

    let userId;
    let address;
    let address1;

    const [isLoaded, setIsLoaded] = useState(false);
    const [loadedProfile, setLoadedProfile] = useState({});

    let token = localStorage.getItem('Bearer');
    if(token !== null){
        userId = parseJwt(token).sub;
        address = 'http://localhost:8080/users/userId/' + userId;
        address1 = 'http://localhost:8080/users/userId/' + userId + '/update-profile-settings';
    }

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
  
            const profile = {
               "addFriend" : data.profile.profileSettings.addFriend,
               "showFriends" : data.profile.profileSettings.showFriends,
               "showSubscriptions" : data.profile.profileSettings.showSubscriptions,
            }
            setLoadedProfile(profile);
            setIsLoaded(true)
            });

        }, [address]);

    function profileSettingsHandler(profileSettings) {
        fetch(
            address1,
            {
             method: 'PUT',
             body: JSON.stringify(profileSettings),
             headers: {
                 'Content-Type': 'application/json',
            },
            credentials: 'include'
            },
         
            window.location.reload(),
            )
        }
    
    console.log(loadedProfile)
    
    if(isLoaded){
    return(
        <MainLayout>
            <ProfileSettingsForm onSettingsChange={profileSettingsHandler} loadedProfile={loadedProfile}/>
        </MainLayout>
    );
    }
    else{
        return "";
    }
}

export default ProfileSettingsPage;
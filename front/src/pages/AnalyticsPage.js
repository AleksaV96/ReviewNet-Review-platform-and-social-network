import { React, useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout'
import BarChart from '../components/layout/views/BarChart';
import PieChart from '../components/layout/views/PieChart';
// eslint-disable-next-line
import Chart from 'chart.js/auto'
import { ButtonGroup, Button, Typography } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';

function AnalyticsPage(){

    const [isLoading, setIsLoading] = useState(true);
    const [postStats, setPostStats] = useState([]);
    const [userStats, setUserStats] = useState([]);
    const [displayType, setDisplayType] = useState("");

    const postSum = postStats.reduce((a, b) => a + b, 0);
    const userSum = userStats.reduce((a, b) => a + b, 0);

    const address = 'http://localhost:8080/analytics/postTypeStatistics';
    const address2 = 'http://localhost:8080/analytics/userTypeStatistics';

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
            setIsLoading(false);
            setPostStats(data);

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
            setIsLoading(false);
            setUserStats(data);

          });
      }, [address2]);
    
    if (isLoading) {
        return (
        <section>
            <p>Loading...</p>
        </section>
        );
    }

    let postsData= {
        labels: ["Forum", "Review", "Complain", "RoadMap", "Replies"],
        datasets: [
          {
            label: 'Posts type rate',
            data: postStats,
            backgroundColor: [
              "#1e88e5",
              "#00897b",
              "#d81b60",
              "#8e24aa",
              "grey"
            ],
            borderColor: [
              "black",
              "black",
              "black",
              "black",
              "black"
            ],
            borderWidth: 1,
          },
        ],
      }
    
    let usersData= {
        labels: ["Subscriber", "Moderator", "Admin"],
        datasets: [
          {
            label: 'Posts type rate',
            data: userStats,
            backgroundColor: [
              "#2196f3",
              "#009688",
              "#673ab7"
            ],
            borderColor: [
              "black",
              "black",
              "black"
            ],
            borderWidth: 1,
          },
        ],
      }

    function choosePostsHandler(){
        setDisplayType("posts")
    }

    function chooseUsersHandler(){
        setDisplayType("users")
    }

    if(displayType === "posts" || displayType === ""){
        return (
            <MainLayout>
            <ButtonGroup sx={{position:"relative", left:"6cm"}}>
                <Button variant="contained" onClick={choosePostsHandler}>Posts<DynamicFeedIcon/></Button>
                <Button variant="contained" onClick={chooseUsersHandler}>Users<GroupIcon/></Button>
            </ButtonGroup>
            <section>
            <Typography variant="h5"><span style={{fontWeight:"bold"}}>Total posts:</span> {postSum}</Typography>
            <Typography><span style={{fontWeight:"bold"}}>Forum:</span> {postStats[0]}</Typography>
            <Typography><span style={{fontWeight:"bold"}}>Review:</span> {postStats[1]}</Typography>
            <Typography><span style={{fontWeight:"bold"}}>Complain:</span> {postStats[2]}</Typography>
            <Typography><span style={{fontWeight:"bold"}}>RoadMap:</span> {postStats[3]}</Typography>
            <Typography><span style={{fontWeight:"bold"}}>Replies:</span> {postStats[4]}</Typography>
            <BarChart  data={postsData} />
            <PieChart  data={postsData} />
            </section>
            </MainLayout>
        );
    }
    else if(displayType === "users"){
        return (
            <MainLayout>
            <ButtonGroup sx={{position:"relative", left:"6cm"}}>
                <Button variant="contained" onClick={choosePostsHandler}>Posts<DynamicFeedIcon/></Button>
                <Button variant="contained" onClick={chooseUsersHandler}>Users<GroupIcon/></Button>
            </ButtonGroup>
            <section>
            <Typography variant="h5"><span style={{fontWeight:"bold"}}>Total users:</span> {userSum}</Typography>
            <Typography><span style={{fontWeight:"bold"}}>Subscribers:</span> {userStats[0]}</Typography>
            <Typography><span style={{fontWeight:"bold"}}>Moderators:</span> {userStats[1]}</Typography>
            <Typography><span style={{fontWeight:"bold"}}>Admins:</span> {userStats[2]}</Typography>
            <BarChart  data={usersData} />
            <PieChart  data={usersData} />
            </section>
            </MainLayout>
        );
    }




    

}

export default AnalyticsPage;
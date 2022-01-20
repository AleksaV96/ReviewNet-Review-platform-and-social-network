import { React, useState, useEffect } from 'react';
import { useParams } from "react-router";
import MainLayout from '../components/layout/MainLayout'
import BarChart from '../components/layout/views/BarChart';
import PieChart from '../components/layout/views/PieChart';
// eslint-disable-next-line
import Chart from 'chart.js/auto'
import { Typography } from '@mui/material';


function ModeratorElementAnalyticsPage(){

    const { id } = useParams();
    const { elementName } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [postStats, setPostStats] = useState([]);
    

    const postSum = postStats.reduce((a, b) => a + b, 0);

    const address = 'http://localhost:8080/analytics/elementPostTypeStatistics/' + id;

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
    



        return (
            <MainLayout>
            <section>
            <Typography sx={{marginBottom:"5mm", fontWeight:"bold"}}variant="h3">{elementName} post statistics</Typography>
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

export default ModeratorElementAnalyticsPage;
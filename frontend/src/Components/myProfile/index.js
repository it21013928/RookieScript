import React, { useState } from "react";
import { useEffect, useRef } from "react";

//import { LineChart } from '@mui/x-charts/LineChart';
//import './profileStyles.css'; // Include your CSS file for styling

import Chart from "chart.js/auto";
import Axioss from "../../api/Axioss";

function UserProfile() {
  const chartRefLine = useRef();
  const chartRef = useRef(null);

  const [searchResults, setSearchResults] = useState([]);
  const [userData, setUserData] = useState({ user: {} });
  const [lineChartData, setLineChartData] = useState({
    scoreCount: 0,
    scoreList: [],
  });
  const [barChartData, setBarChartData] = useState([]);
  const [rank, setRank] = useState([]);

  useEffect(() => {
    Axioss.get("api/user/getUserProfile")
      .then((response) => {
        console.log(response.data); // Access the response data here
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error); // Handle any errors here
      });
  }, []);

  useEffect(() => {
    Axioss.get("api/user/getScoresList")
      .then((response) => {
        const { scoreCount, scoreList } = response.data;

        // Generate X-axis labels dynamically
        const xLabels = Array.from({ length: scoreCount }, (_, index) =>
          (index + 1).toString()
        );

        // Update the chart data
        const updatedData = {
          labels: xLabels,
          datasets: [
            {
              label: "My Score Board",
              data: scoreList,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        };

        setLineChartData(updatedData);

        // Get the 2D rendering context for the canvas
        const ctx = chartRefLine.current.getContext("2d");

        // Create the Chart.js line chart
        const myChart = new Chart(ctx, {
          type: "line",
          data: updatedData,
          options: {
            responsive: true,
            maintainAspectRatio: true,
          },
        });

        // Return a cleanup function to destroy the chart when the component unmounts
        return () => {
          myChart.destroy();
        };
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Averages chart
  useEffect(() => {
    Axioss.get("api/user/getAverages")
      .then((averages) => {
        const data = {
          labels: averages.data.map((_, index) => `User${index + 1}`),
          datasets: [
            {
              label: "Users Averages",
              data: averages.data.map((item) => item.average),
              backgroundColor: "rgba(255, 50, 0, 0.2)",
              borderColor: "rgb(75, 192, 192)",
              borderWidth: 1,
              width: "100px",
            },
          ],
        };

        // Get the 2D rendering context for the canvas
        const ctx = chartRef.current.getContext("2d");

        // Create the Chart.js bar chart
        new Chart(ctx, {
          type: "bar",
          data: data,
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  /////////////////////////////
  useEffect(() => {
    Axioss.get("api/user/getUserRank")
      .then((response) => {
        console.log(response.data); // Access the response data here
        setRank(response.data);
        console.log(rank.rank);
      })
      .catch((error) => {
        console.error(error); // Handle any errors here
      });
  }, []);

  return (
    <div className="user-profile-container">
      <div className="user-details-card">
        <div className="left-side">
          <div className="left-side-content">
            <h1>My Account</h1>
            <img src="user-photo.jpg" alt="User" className="user-photo" />
          </div>
        </div>
        <div>
          <h2>User Details</h2>
          <p>Name: {userData.user.firstName}</p>
          <p>Email:{userData.user.email} </p>
        </div>
      </div>
      <div className="right-side">
        <div className="user-leaderboard-card">
          <h2>Scoreboard</h2>

          {/* Add more leaderboard details as needed */}
          <canvas
            id="lineChart"
            ref={chartRefLine}
            width={400}
            height={200}
          ></canvas>
        </div>
      </div>
      <div className="bottom-cards">
        <div className="bottom-card">
          <canvas ref={chartRef} />
        </div>
        <div className="bottom-card">
          <h2 align="center">Your Rank:{rank.rank}</h2>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

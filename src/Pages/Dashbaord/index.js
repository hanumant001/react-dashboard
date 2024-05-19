import React, { useState, useEffect } from 'react';
import { DollarCircleOutlined, StarOutlined ,DeploymentUnitOutlined } from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import mockData from '../Analytics/AnalyticsData';
import MoviesPieChart from './MoviesPieChart';
import './Dashboard.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [movies, setMovies] = useState(mockData);
  const [totalCollections, setTotalCollections] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const total = movies.reduce((sum, movie) => sum + movie.collections, 0);
    const average = movies.reduce((sum, movie) => sum + movie.userRating, 0) / movies.length;

    setTotalCollections(total);
    setAverageRating(average.toFixed(1));
  }, [movies]);

  return (
    <Space direction="vertical">
      <Typography.Title level={4}>Movie Reports</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <DollarCircleOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Total Collections"}
          value={`₹${totalCollections.toLocaleString()}`}
        />
        <DashboardCard
          icon={
            <DeploymentUnitOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Total Movies"}
          value={movies.length}
        />
        <DashboardCard
          icon={
            <StarOutlined 
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Average Rating"}
          value={averageRating}
        />
      </Space>
      <Space direction="horizontal" style={{ width: "100%" }}>
        {/* <RecentMovies movies={movies} /> */}
        <div style={{ marginTop: "10px", height: "auto", width: "600px", overflow: "auto", borderRadius: 8 }}>
          <MoviesPieChart movies={movies} />
        </div>
        <div style={{ marginTop: "10px", height: "auto", width: "600px" }}>
          <MoviesChart movies={movies} />
        </div>
      </Space>
    </Space>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

function RecentMovies({ movies }) {
  const recentMovies = movies.slice(0, 5);

  return (
    <>
      <Typography.Text>Recent Movies</Typography.Text>
      <Table
        columns={[
          {
            title: "Title",
            dataIndex: "name",
          },
          {
            title: "Category",
            dataIndex: "category",
          },
          {
            title: "Collections",
            dataIndex: "collections",
            render: (value) => `₹${value.toLocaleString()}`,
          },
          {
            title: "Ratings",
            dataIndex: "userRating",
          }
        ]}
        dataSource={recentMovies}
        pagination={false}
      ></Table>
    </>
  );
}

function MoviesChart({ movies }) {
  const labels = movies.map(movie => movie.name);
  const data = movies.map(movie => movie.collections);

  const dataSource = {
    labels,
    datasets: [
      {
        label: "Collections",
        data: data,
        backgroundColor: "rgba(255, 0, 0, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Movie Collections",
      },
    },
  };

  return (
    <Card className="chartBarDashBoard">
      <Bar options={options} data={dataSource} />
    </Card>
  );
}

export default Dashboard;

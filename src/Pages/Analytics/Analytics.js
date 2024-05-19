import React from 'react';
import { Chart } from 'primereact/chart';
import mockData from './AnalyticsData';
import  './Analytics.css';
function Analytics() {
  const lineChartData = {
    labels: mockData.map(movie => movie.name),
    datasets: [
      {
        label: 'Box Office Collections',
        data: mockData.map(movie => movie.collections),
        fill: false,
        borderColor: '#4bc0c0'
      }
    ]
  };

  const barChartData = {
    labels: [...new Set(mockData.map(movie => movie.category))],
    datasets: [
      {
        label: 'Average Collections by Category',
        backgroundColor: '#42A5F5',
        data: mockData.reduce((acc, movie) => {
          acc[movie.category] = (acc[movie.category] || []).concat(movie.collections);
          return acc;
        }, {})
      }
    ]
  };

  const ratingDistributionData = {
    labels: mockData.map(movie => movie.userRating),
    datasets: [
      {
        label: 'User Ratings',
        backgroundColor: '#FFA726',
        data: mockData.map(movie => movie.userRating)
      }
    ]
  };

  const collectionVsRatingData = {
    labels: mockData.map(movie => movie.name),
    datasets: [
      {
        label: 'Collections vs Ratings',
        backgroundColor: '#66BB6A',
        data: mockData.map(movie => ({
          x: movie.userRating,
          y: movie.collections
        }))
      }
    ]
  };

  return (
    <div className="analytics">
      <h2>Analytics</h2>
      <div className='_1stRow'>
      <div className="chart">
        <h3>Box Office Collections Over Time</h3>
        <Chart type="line" data={lineChartData} />
      </div>
      <div className="chart">
        <h3>Average Collections by Category</h3>
        <Chart type="bar" data={barChartData} />
      </div>
      </div>
      <div className='_2stRow'>
      <div className="chart">
        <h3>User Ratings Distribution</h3>
        <Chart type="bar" data={ratingDistributionData} />
      </div>
      <div className="chart">
        <h3>Collections vs Ratings</h3>
        <Chart type="scatter" data={collectionVsRatingData} />
      </div>
      </div>
    </div>
  );
}

export default Analytics;

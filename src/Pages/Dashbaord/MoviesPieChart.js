import React from 'react';
import { Chart } from 'primereact/chart';

function MoviesPieChart({ movies }) {
    const categoryCount = movies.reduce((acc, movie) => {
        acc[movie.category] = acc[movie.category] || { count: 0, movies: [] };
        acc[movie.category].count += 1;
        acc[movie.category].movies.push(movie.name);
        return acc;
    }, {});

    const labels = Object.keys(categoryCount);
    const data = Object.values(categoryCount).map(item => item.count);

    const dataSource = {
        labels,
        datasets: [
            {
                data,
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                    "#FF6347",
                    "#ADFF2F",
                    "#8A2BE2",
                    "#FF4500"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                    "#FF6347",
                    "#ADFF2F",
                    "#8A2BE2",
                    "#FF4500"
                ]
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: "Movie Categories Distribution",
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const category = tooltipItem.label;
                        const moviesInCategory = categoryCount[category].movies;
                        return [`${category}: ${moviesInCategory.length} movies`, ...moviesInCategory];
                    }
                }
            }
        },
    };

    return (
        <div style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
            <Chart type="pie" data={dataSource} options={options} />
        </div>
    );
}

export default MoviesPieChart;

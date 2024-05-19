import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Space, Statistic, Typography, List, Avatar } from 'antd';
import { UserOutlined, BarChartOutlined, LineChartOutlined, StarOutlined } from '@ant-design/icons';
import { Chart } from 'primereact/chart';
import mockData from '../Analytics/AnalyticsData';

function Overview() {
    const [movies, setMovies] = useState(mockData);
    const [totalCollections, setTotalCollections] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [topCollectionMovies, setTopCollectionMovies] = useState([]);
    const [mostActiveUsers, setMostActiveUsers] = useState([]);

    useEffect(() => {
        const total = movies.reduce((sum, movie) => sum + movie.collections, 0);
        const average = movies.reduce((sum, movie) => sum + movie.userRating, 0) / movies.length;

        setTotalCollections(total);
        setAverageRating(average.toFixed(1));
        setTopRatedMovies(movies.sort((a, b) => b.userRating - a.userRating).slice(0, 5));
        setTopCollectionMovies(movies.sort((a, b) => b.collections - a.collections).slice(0, 5));
        setMostActiveUsers(getMostActiveUsers(movies));
    }, [movies]);

    const getMostActiveUsers = (movies) => {
        return [
            { username: 'Prashant Neel', reviews: 10 },
            { username: 'James Cameron', reviews: 8 },
            { username: 'Christopher Nolan', reviews: 7 }
        ];
    };

    const barData = {
        labels: [...new Set(movies.map(movie => movie.category))],
        datasets: [
            {
                label: 'Movies by Category',
                data: [...new Set(movies.map(movie => movie.category))].map(
                    category => movies.filter(movie => movie.category === category).length
                ),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    };

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Typography.Title level={4}>Overview</Typography.Title>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Total Collections"
                            value={`₹${totalCollections.toLocaleString()}`}
                            prefix={<BarChartOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Total Movies"
                            value={movies.length}
                            prefix={<LineChartOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Average Rating"
                            value={averageRating}
                            prefix={<StarOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Card title="Top Rated Movies">
                        <List
                            itemLayout="horizontal"
                            dataSource={topRatedMovies}
                            renderItem={movie => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar icon={<UserOutlined />} />}
                                        title={movie.name}
                                        description={`Rating: ${movie.userRating}`}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Top Movies by Collection">
                        <List
                            itemLayout="horizontal"
                            dataSource={topCollectionMovies}
                            renderItem={movie => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar icon={<UserOutlined />} />}
                                        title={movie.name}
                                        description={`Collections: ₹${movie.collections.toLocaleString()}`}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Card title="Movies by Category">
                        <Chart type="bar" data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Most Active Users">
                        <List
                            itemLayout="horizontal"
                            dataSource={mostActiveUsers}
                            renderItem={user => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar icon={<UserOutlined />} />}
                                        title={user.username}
                                        description={`Reviews: ${user.reviews}`}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </Space>
    );
}

export default Overview;

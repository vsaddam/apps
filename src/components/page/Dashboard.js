import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../template/Nav';
import Sidebar from '../template/Sidebar';
import PieChart from '../charts/PieChart';
import axios from 'axios';
import useToggleButton  from 'use-toggle-button';


const Dashboard = () => {
    const [isOn, setIsOn] = useToggleButton();
    const baseUrl = 'https://6338473d937ea77bfdbd6cf2.mockapi.io/user';
    const [usersData, setUsersData] = useState([]);
    const [chartData, setChartData] = useState({
        labels: usersData && usersData.map((data) => data.statusName),
        datasets: [
            {
                label: "Users Gained",
                data: usersData && usersData.map((data) => data.statusValue),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    });

    useEffect(() => {
        axios.get(baseUrl).then((response) => {

            let res = response.data;
            let counter = {}
            let counterArr = []
            res.forEach(function (key) {

                counter[key.status] = (counter[key.status] || 0) + 1
            });

            for (let key in counter) {
                counterArr.push({ "statusName": key, "statusValue": counter[key] });
            }
            setUsersData(counterArr);
            setChartData({
                labels: counterArr && counterArr.map((data) => data.statusName),
                datasets: [
                    {
                        label: "Users Gained",
                        data: counterArr && counterArr.map((data) => data.statusValue),
                        backgroundColor: [
                            "rgba(75,192,192,1)",
                            "#ecf0f1",
                            "#50AF95",
                            "#f3ba2f",
                            "#2a71d0",
                        ],
                        borderColor: "black",
                        borderWidth: 2,
                    },
                ],
            });

        });

    }, []);




    return (
        <>
            <Container fluid >
                <Row className='navbar-row'>
                    <Col className='navbar-col'>
                        <Navbar />
                    </Col>
                </Row>
                <Row className="mainpage-sidebar-cnt-row">
                    <Col md={2} className="mainpage-sidebar"><Sidebar /></Col>
                    <Col md={10} className="main-page">
                        <Col md={5} className="main-page">
                            <h2>Dashboard</h2>
                            <PieChart chartData={chartData} />
                        </Col>
                    </Col>

                    <div>Custom hook : {`${isOn}`} </div>
                    <button onClick={() => setIsOn(isOn => !isOn)}>Status</button>

                </Row>
            </Container>
        </>
    )
}

export default Dashboard
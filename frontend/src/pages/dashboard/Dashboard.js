import React, { useEffect, useState } from 'react';

import objectDetectionSketch from '../../../src/ObjectDetectionSketch';

import P5Wrapper from 'react-p5-wrapper';

import SimpleImageSlider from "react-simple-image-slider";

import Popout from 'react-popout'

import { useSelector } from 'react-redux';
import {
    Row,
    Col,
    Button,
} from 'reactstrap';

import Widget from '../../components/Widget';

import s from './Dashboard.module.scss';

import ReportsTable from 'pages/CRUD/Reports/table/ReportsTable';

import Graph from '../../components/Charts/Graph';

import { Doughnut } from 'react-chartjs-2';


const rootElement = document.getElementById('root');

const images = [
    { url: "https://wallpaperaccess.com/full/13189.jpg" },
    { url: "https://i.ytimg.com/vi/zm3uP9Zf7L0/maxresdefault.jpg" },
    { url: "https://images.firstpost.com/wp-content/uploads/2021/07/Nintendo-switch-OLED.jpg" },
    // { url: "insert image publicURL" },
    // { url: "insert image publicURL" },
];


const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};



const Dashboard = () => {
    const currentUser = useSelector((store) => store.auth.currentUser);


    const [data, setData] = useState('');

    const parentToChild = () => {
        setData("This is data from Parent Component to the Child Component.");
    }

    return (
        <div className={s.root}>
            <h1 className="page-title">Welcome, {currentUser ? (currentUser.firstName || "User") : "User"}! <br />
                <small>
                    <small>Your role is {currentUser && currentUser.role}</small>
                </small>
            </h1>

            <Row>
                <Col lg={10}>
                    <Widget>
                        <Row className={"align-items-center"}>
                            <Col md={12}>
                                <h2>Face Recognition Input</h2>
                                <P5Wrapper sketch={objectDetectionSketch} />
                            </Col>
                        </Row>
                    </Widget>
                </Col>
                <Col lg={2}>
                    <Widget>
                        <Row className={"align-items-center"}>
                            <Col md={12}>
                                <h2>Charts</h2>
                                <Graph />
                                <div style={{ height: 40 }} />
                            </Col>
                        </Row>
                    </Widget>
                </Col>
            </Row>

            {/* Dashboard Component as advertisment Output 
            <Row>
                <Col lg={12}>
                    <Widget>
                        <Row className={"align-items-center"}>
                            <Col md={12}>
                                <h2>Adverisment Output</h2>
                                <div>
                                    <SimpleImageSlider
                                        width={1920}
                                        height={1080}
                                        images={images}
                                        loop={true}
                                        showBullets={false}
                                        showNavs={false}
                                        autoPlay={true}
                                        autoPlayDelay={5}
                                        duration={0.7}
                                        bgColor={'#000'}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Widget>
                </Col>
            </Row>
            */}

            {/* Pop-Out Window as advertisment Output */}
            <Popout>
                <SimpleImageSlider
                    width={1920}
                    height={1080}
                    images={images}
                    loop={true}
                    showBullets={false}
                    showNavs={false}
                    autoPlay={true}
                    autoPlayDelay={10}
                    duration={0.7}
                    slideDuration={2}
                    bgColor={'#000'}
                />
            </Popout>

            <Row>
                <Col lg={12}>
                    <Widget>
                        <Row className={"align-items-center"}>
                            <Col md={12}>
                                <ReportsTable />
                            </Col>
                        </Row>
                    </Widget>
                </Col>
            </Row>


        </div>
    );
}

export default Dashboard;

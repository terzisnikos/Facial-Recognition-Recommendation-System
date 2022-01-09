import React, { useEffect, useState } from 'react';

import objectDetectionSketch, { imagesList } from '../../../src/ObjectDetectionSketch';

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

import { PieChart } from '../../components/Charts/PieChart';

import { Pie } from 'react-chartjs-2';

import axios from 'axios';


const rootElement = document.getElementById('root');



const Dashboard = () => {
    const currentUser = useSelector((store) => store.auth.currentUser);

    const [data, setData] = useState('');

    const parentToChild = () => {
        setData("This is data from Parent Component to the Child Component.");
    }
    
       // data.datasets.data.push(menCounter);
       // data.datasets.data.push(womenCounter);

   
    
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
                                   <PieChart /> 
                                <div style={{ height: 40 }} />
                            </Col>
                        </Row>
                    </Widget>
                </Col>
            </Row>

            {/* Pop-Out Window as advertisment Output */}
            <Popout title='Advertisment display'>
                <SimpleImageSlider
                    width={1920}
                    height={1080}
                    images={imagesList}
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

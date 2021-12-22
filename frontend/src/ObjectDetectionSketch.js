import React, { useState } from "react";
import * as p5 from "p5";
import "p5/lib/addons/p5.dom";
import * as faceapi from "face-api.js";
import {
  extendWithFaceLandmarks,
  FaceLandmarks,
  FaceLandmarks68,
  isWithFaceLandmarks,
} from "face-api.js";
import axios from 'axios';

import Graph from '../src/components/Charts/Graph';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import qs from 'qs';

ChartJS.register(ArcElement, Tooltip, Legend);


const MODEL_URL = "/models";

var startingTimestamp = new Date().getTime();

//Function is called only once.
export default function sketch(p) {


  let capture = null;
  let faceDrawings = [];
  let currentFaces = new Array(10);
  let firstElement;

  function showFaceDetectionData(data) {
    faceDrawings = data;
  }

  p.setup = async function () {
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
    await faceapi.loadAgeGenderModel(MODEL_URL);
    await faceapi.loadFaceExpressionModel(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);

    p.createCanvas(1280, 720);
    const constraints = {
      video: {
        mandatory: {
          minWidth: 1280,
          minHeight: 720,
        },
        optional: [{ maxFrameRate: 40 }],
        //size: (1280,720),
      },
      audio: false,
    };

    capture = p.createCapture(constraints, () => { });

    capture.id("video_element");
    capture.size(1280, 720);
    capture.hide();
  };

  var NumOfDrawTimes = 0;
  console.log("Initial NumofDrawTimes:" + NumOfDrawTimes);
  p.draw = async () => {




    if (!capture) {
      return;
    }
    p.background(255);
    p.image(capture, 0, 0);
    p.fill(0, 0, 0, 0);

    faceDrawings.map((drawing) => {
      if (drawing) {
        p.textSize(15);
        p.strokeWeight(1);

        const textX = drawing.detection.box._x + drawing.detection.box._width;
        const textY = drawing.detection.box._y + drawing.detection.box._height;

        const confidencetext = "Gender: " + drawing.gender;
        const textWidth = p.textWidth(confidencetext);
        p.text(confidencetext, textX - textWidth - 10, textY - 60);

        const agetext = "Age: " + drawing.age.toFixed(0);
        const ageTextWidth = p.textWidth(agetext);
        p.text(agetext, textX - ageTextWidth - 10, textY - 30);

        const copiedExpression = drawing.expressions;
        const expressions = Object.keys(copiedExpression).map((key) => {
          const value = copiedExpression[key];
          return value;
        });

        const max = Math.max(...expressions);

        const expression_value = Object.keys(copiedExpression).filter((key) => {
          return copiedExpression[key] === max;
        })[0];

        const expressiontext = "Mood: " + expression_value;
        const expressionWidth = p.textWidth(expressiontext);
        p.text(expressiontext, textX - expressionWidth - 10, textY - 10);

        p.strokeWeight(4);
        p.stroke("rgb(0%,100%,100%)");
        p.rect(
          drawing.detection.box._x,
          drawing.detection.box._y,
          drawing.detection.box._width,
          drawing.detection.box._height
        );
      }
    });

    // Saving last 5 faces in array - FIFO

    //var intervalID = window.setInterval(checkFaceAPI, 5000);
    faceapi
      .detectAllFaces(capture.id())
      .withAgeAndGender()
      .withFaceExpressions()
      .then((data) => {
        showFaceDetectionData(data);
        printResultOnlyAfter10Seconds(data);
      });

    //var intervalID = window.setInterval(calcAgeAvg, 5000);
  };

}


const menCounters = [0, 0, 0, 0, 0, 0, 0];
const womenCounters = [0, 0, 0, 0, 0, 0, 0];


export function printResultOnlyAfter10Seconds(data) {

  let currentTimeStamp = new Date().getTime();
  if ((Math.floor(currentTimeStamp / 1000)) - (Math.floor(startingTimestamp / 1000)) > 10) {
    startingTimestamp = currentTimeStamp;
    console.log("time difference  more than 10 secs.We will print the value");

    console.log('DATA LENGHT-------: ', Object.keys(data).length);

    console.log('Faces-------: ', data);

    /*

    var faceJSON;

    for (let i = 0; i < Object.keys(data).length; i++) {

      faceJSON = JSON.stringify(data[i])
      console.log('JSON: ', faceJSON);

      axios.post('http://localhost:8080/api/faces', faceJSON, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          console.log(response);
        })
    }
    
    */

    // Get Advertisments data from DB

    // For MEN
    for (let i = 0; i < Object.keys(data).length; i++) {

      if (data[0].gender == 'male') {

          if (data[i].age > 12 && data[i].age < 18) {
            console.log('Fetch male ads 12-18')
            axios.get('http://localhost:8080/api/advertisments', {
              headers: {
                'Content-Type': 'application/json'
              },
              params: {
                gender: 'male',
                age: '12 – 17',
                active: '1',
              }
            })
              .then(function (response) {
                console.log(response);
              })
              menCounters[0]++;
          }
          else if (data[i].age >= 18 && data[i].age < 25) {
            console.log('Fetch male ads 18-24')
            axios.get('http://localhost:8080/api/advertisments', {
              headers: {
                'Content-Type': 'application/json'
              },
              params: {
                gender: 'male',
                age: '18 – 24',
                active: '1',
              }
            })
              .then(function (response) {
                console.log(response);
              })
              menCounters[1]++;
          }   
          else if (data[i].age >= 25 && data[i].age < 35) {
            console.log('Fetch male ads 25-34')
            axios.get('http://localhost:8080/api/advertisments', {
              headers: {
                'Content-Type': 'application/json'
              },
              params: {
                gender: 'male',
                age: '25 – 34',
                active: '1',
              }
            })
              .then(function (response) {
                console.log(response);
              })
              menCounters[2]++;
          } 
          else if (data[i].age >= 35 && data[i].age < 45) {
            console.log('Fetch male ads 35-44')
            axios.get('http://localhost:8080/api/advertisments', {
              headers: {
                'Content-Type': 'application/json'
              },
              params: {
                gender: 'male',
                age: '35 – 44',
                active: '1',
              }
            })
              .then(function (response) {
                console.log(response);
              })
              menCounters[3]++;
          } 
          else if (data[i].age >= 45 && data[i].age < 55) {
            console.log('Fetch male ads 45-54')
            axios.get('http://localhost:8080/api/advertisments', {
              headers: {
                'Content-Type': 'application/json'
              },
              params: {
                gender: 'male',
                age: '45 – 54',
                active: '1',
              }
            })
              .then(function (response) {
                console.log(response);
              })
              menCounters[4]++;
          } 
          else if (data[i].age >= 55 && data[i].age < 65) {
            console.log('Fetch male ads 55-64')
            axios.get('http://localhost:8080/api/advertisments', {
              headers: {
                'Content-Type': 'application/json'
              },
              params: {
                gender: 'male',
                age: '55 – 64',
                active: '1',
              }
            })
              .then(function (response) {
                console.log(response);
              })
              menCounters[5]++;
          } 
          else if (data[i].age >= 64) {
            console.log('Fetch male ads 65+')
            axios.get('http://localhost:8080/api/advertisments', {
              headers: {
                'Content-Type': 'application/json'
              },
              params: {
                gender: 'male',
                age:'65+',
                active: '1',
              }
            })
              .then(function (response) {
                console.log(response);
              })
              menCounters[6]++;
          }
          
        console.log('MEN age-range counters', menCounters)

      }


      // For WOMEN

      if (data[0].gender == 'female') {

        if (data[i].age > 12 && data[i].age < 18) {
          console.log('Fetch female ads 12-18')
          axios.get('http://localhost:8080/api/advertisments', {
            headers: {
              'Content-Type': 'application/json'
            },
            params: {
              gender: 'female',
              age: '12 – 17',
              active: '1',
            }
          })
            .then(function (response) {
              console.log(response);
            })
            womenCounters[0]++;
        }
        else if (data[i].age >= 18 && data[i].age < 25) {
          console.log('Fetch male ads 18-24')
          axios.get('http://localhost:8080/api/advertisments', {
            headers: {
              'Content-Type': 'application/json'
            },
            params: {
              gender: 'female',
              age: '18 – 24',
              active: '1',
            }
          })
            .then(function (response) {
              console.log(response);
            })
            womenCounters[1]++;
        }   
        else if (data[i].age >= 25 && data[i].age < 35) {
          console.log('Fetch male ads 25-34')
          axios.get('http://localhost:8080/api/advertisments', {
            headers: {
              'Content-Type': 'application/json'
            },
            params: {
              gender: 'female',
              age: '25 – 34',
              active: '1',
            }
          })
            .then(function (response) {
              console.log(response);
            })
            womenCounters[2]++;
        } 
        else if (data[i].age >= 35 && data[i].age < 45) {
          console.log('Fetch male ads 35-44')
          axios.get('http://localhost:8080/api/advertisments', {
            headers: {
              'Content-Type': 'application/json'
            },
            params: {
              gender: 'female',
              age: '35 – 44',
              active: '1',
            }
          })
            .then(function (response) {
              console.log(response);
            })
            womenCounters[3]++;
        } 
        else if (data[i].age >= 45 && data[i].age < 55) {
          console.log('Fetch male ads 45-54')
          axios.get('http://localhost:8080/api/advertisments', {
            headers: {
              'Content-Type': 'application/json'
            },
            params: {
              gender: 'female',
              age: '45 – 54',
              active: '1',
            }
          })
            .then(function (response) {
              console.log(response);
            })
            womenCounters[4]++;
        } 
        else if (data[i].age >= 55 && data[i].age < 65) {
          console.log('Fetch male ads 55-64')
          axios.get('http://localhost:8080/api/advertisments', {
            headers: {
              'Content-Type': 'application/json'
            },
            params: {
              gender: 'female',
              age: '55 – 64',
              active: '1',
            }
          })
            .then(function (response) {
              console.log(response);
            })
            womenCounters[5]++;
        } 
        else if (data[i].age >= 64) {
          console.log('Fetch male ads 65+')
          axios.get('http://localhost:8080/api/advertisments', {
            headers: {
              'Content-Type': 'application/json'
            },
            params: {
              gender: 'female',
              age:'65+',
              active: '1',
            }
          })
            .then(function (response) {
              console.log(response);
            })
            womenCounters[6]++;
        }
        
      console.log('WOMEN age-range counters', womenCounters)

    }

    }

    // Count per age range every 10 sec
/*
    for (let i = 0; i < Object.keys(data).length; i++) {
      if (data[i].age > 12 && data[i].age < 18) {
        counters[0]++;
      } else if (data[i].age >= 18 && data[i].age < 25) {
        counters[1]++;
      } else if (data[i].age >= 25 && data[i].age < 35) {
        counters[2]++;
      } else if (data[i].age >= 35 && data[i].age < 45) {
        counters[3]++;
      } else if (data[i].age >= 45 && data[i].age < 55) {
        counters[4]++;
      } else if (data[i].age >= 55 && data[i].age < 65) {
        counters[5]++;
      } else if (data[i].age >= 64) {
        counters[6]++;
      }
    }

    console.log('Face age-range counters', counters)*/

  }

}


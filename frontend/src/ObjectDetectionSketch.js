import "p5/lib/addons/p5.dom";
import * as faceapi from "face-api.js";
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
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

        var expression_value = Object.keys(copiedExpression).filter((key) => {
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
    //var intervalID = window.setInterval(checkFaceAPI, 5000);
    faceapi
      .detectAllFaces(capture.id())
      .withAgeAndGender()
      .withFaceExpressions()
      .then((data) => {
        showFaceDetectionData(data);
        printResultOnlyAfter10Seconds(data);
      });
  };
}

console.log(' EXXPRESION VAL')

export var imagesList = [
  { url: "https://vafloc01.s3.amazonaws.com/WBStatic/site1102601/dist/img/loader.gif" },
  { url: "https://vafloc01.s3.amazonaws.com/WBStatic/site1102601/dist/img/loader.gif" }
];

console.log('images list from dashboard', imagesList)

const menCounters = [0, 0, 0, 0, 0, 0, 0];
const womenCounters = [0, 0, 0, 0, 0, 0, 0];

let adTickets = [
  {
    "id": "0",
    "adImageUrl": "",
  }
]

let faceTickets = [
  {
    "id": "0",
    "holder": "",
  }
]

var recordTime = 10;
var numOfTicketsPerFace = 3
var numOfTicketsPerAd = 5
var extraAdTicketsNum = 0
var extraFaceTicketsNum = 0
var suspensionCounter = 0;
var facesReached = 0;
var facesDimensions = [];

export function printResultOnlyAfter10Seconds(data, expression_value) {

  let currentTimeStamp = new Date().getTime();
  if ((Math.floor(currentTimeStamp / 1000)) - (Math.floor(startingTimestamp / 1000)) > recordTime) {
    startingTimestamp = currentTimeStamp;
    console.log("");
    console.log("---------- New record ----------");
    console.log('Number of faces: ', Object.keys(data).length);
    console.log('Faces data: ', data);

    var adImageUrl = ''

    // turn to sleep mode every 2 times with no faces detected
    if (Object.keys(data).length == 0) {
      suspensionCounter++;
      if (suspensionCounter == 2) {
        imagesList.push({ url: 'https://cdn.wallpapersafari.com/17/13/Ff9pNa.png' })
        imagesList.push({ url: 'https://cdn.wallpapersafari.com/17/13/Ff9pNa.png' })
        imagesList.splice(0, 2);
      }
    } else {
      suspensionCounter = 0;
    }

    // DB Post faces data  
    var faceJSON;

    for (let i = 0; i < Object.keys(data).length; i++) {

      data[i].id = i;
      faceJSON = JSON.stringify(data[i])
      console.log('JSON: ', data[i]);

      // Add tickets to faces

      if (data[i] != null) {

        // Add promotion points to the face with the highest confidence score
        if (data[i].detection._score > 0.75)
          data[i].coefficient = +2;
        else if (data[i].detection._score > 0.5)
          data[i].coefficient++;

        // Add promotion points for close distance
        facesDimensions.push(data[i].detection._box._height);

        // Add promotion points if face is happy
        /*if (expression_value === 'happy'){
          data[i].coefficient++;}
        else if (expression_value === 'sad')
          data[i].coefficient--;*/

        // console.log('Face Coefficient is ', data[i].coefficient)
        // extraFaceTicketsNum = Math.round(data[i].coefficient / 10 * numOfTicketsPerFace)
      }
      else { extraFaceTicketsNum = 0 }

      var idFaceCount = 0;
      for (let k = 0; k < numOfTicketsPerFace + extraFaceTicketsNum; k++) {
        idFaceCount++;
        let faceTicket = {
          "id": idFaceCount,
          "holder": i,
        }
        faceTickets.push(faceTicket);
      }

      axios.post('http://localhost:8080/api/faces', faceJSON, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          console.log('AXIOS POST ', response);
        })


    }

    console.log('Face tickets +++++++++++++++++++', faceTickets)

    // Height relative differnce to the largest face as reference
   /* const sortedFacesByHeight = data.sort((a, b) => b.detection._box._height - a.detection._box._height);
    console.log('>> sorted by height', sortedFacesByHeight)
    const largestFaceHeight = sortedFacesByHeight[0]
    console.log('Largest face ', largestFaceHeight)
    for (let i = 1; i <= sortedFacesByHeight.length; i++) {
      if (largestFaceHeight - sortedFacesByHeight[i] / largestFaceHeight < 0.25)
        console.log('>>0.25')
      else
        console.log(largestFaceHeight - sortedFacesByHeight[i] / largestFaceHeight)
        console.log('>>0.50')
    }
*/


    // Returns a random face value:
    const randFaceNum = Math.floor(Math.random() * idFaceCount) + 1;

    console.log('rand2', randFaceNum)
    // finding the face holder whose id is equal to the random number
    const pickedFace = faceTickets.find(face => face.id === randFaceNum);

    //Empty generated tickets after draw
    faceTickets = [];

    // printing object on the console
    console.log('face picked ', pickedFace)


    // Get Advertisments data from DB every refreshTime(sec)

    if (typeof data[0] === 'undefined') {
      console.log('No faces found')
    } else
      var current_gender = data[0].gender;

    for (let i = 0; i < Object.keys(data).length; i++) {
      // For MEN
      if (data[i].gender == 'male') {

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
              adImageUrl = response.data.rows[0].ad_image[0].publicUrl;
              imagesList.push({ url: adImageUrl })
              imagesList.shift();

              console.log('Ad image:', adImageUrl);
              console.log('imagesList.url', imagesList)
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
              var idCount = 0

              for (let i = 0; i < response.data.rows.length; i++) {
                if (response.data.rows[i].coefficient != null) {
                  console.log('Coefficient is ', response.data.rows[i].coefficient)
                  extraAdTicketsNum = Math.round(response.data.rows[i].coefficient / 10 * numOfTicketsPerAd)
                }
                else { extraAdTicketsNum = 0 }
                for (let j = 0; j < numOfTicketsPerAd + extraAdTicketsNum; j++) {
                  idCount++;
                  let adTicket = {
                    "id": idCount,
                    "adImageUrl": response.data.rows[i].ad_image[0].publicUrl,
                  }
                  adTickets.push(adTicket);
                }
              }

              console.log(adTickets)

              // Returns a random integer from 1 to 10:
              const randAdNum = Math.floor(Math.random() * idCount) + 1;

              console.log('rand', randAdNum)
              // finding the object whose id is equal to the random number
              const pickedAd = adTickets.find(ad => ad.id === randAdNum);

              //Empty generated tickets after draw
              adTickets = [];

              // printing object on the console
              console.log('ad picked ', pickedAd)

              adImageUrl = pickedAd.adImageUrl;
              imagesList.push({ url: adImageUrl })
              imagesList.shift();

              // faces that ad reached

              facesReached = facesReached + data.length
              console.log('faces reached', facesReached)

              console.log('Ad image:', adImageUrl);
              console.log('imagesList.url', imagesList)
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
              adImageUrl = response.data.rows[0].ad_image[0].publicUrl;
              imagesList.push({ url: adImageUrl })
              imagesList.shift();
              console.log("about to write to localStorage");
              localStorage.setItem('imagesList', JSON.stringify(imagesList));

              console.log('Ad image:', adImageUrl);
              console.log('imagesList.url', imagesList)
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
              adImageUrl = response.data.rows[0].ad_image[0].publicUrl;
              imagesList.push({ url: adImageUrl })
              imagesList.shift();
              console.log('Ad image:', adImageUrl);
              console.log('imagesList.url', imagesList)
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
              adImageUrl = response.data.rows[0].ad_image[0].publicUrl;
              imagesList.push({ url: adImageUrl })
              imagesList.shift();
              console.log('Ad image:', adImageUrl);
              console.log('imagesList.url', imagesList)
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
              adImageUrl = response.data.rows[0].ad_image[0].publicUrl;
              imagesList.push({ url: adImageUrl })
              imagesList.shift();
              console.log('Ad image:', adImageUrl);
              console.log('imagesList.url', imagesList)
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
              age: '65+',
              active: '1',
            }
          })
            .then(function (response) {
              console.log(response);
              adImageUrl = response.data.rows[0].ad_image[0].publicUrl;
              imagesList.push({ url: adImageUrl })
              imagesList.shift();
              console.log('Ad image:', adImageUrl);
              console.log('imagesList.url', imagesList)
            })
          menCounters[6]++;
        }

        console.log('Men age-range counters', menCounters)

      }
      // For WOMEN
      if (data[i].gender == 'female') {

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
              console.log('Ad image:', response.data.rows[0].ad_image[0].publicUrl);
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
              age: '65+',
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

  }

}


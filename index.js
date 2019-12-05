// index.js
// const { fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP("66.207.199.230", (error, data) => {
//   if (error) {
//     console.log("it didnt work", error);
//     return;
//   }
  
//   console.log("It worked", data);
// });

// const myCoords = { latitude: '43.63830', longitude: '-79.43010' };
// fetchISSFlyOverTimes(myCoords, (error, data) => {

//   if (error) {
//     console.log("it didnt work", error);
//     return;
//   }

//   console.log("It worked", data);
// });

const { nextISSTimesForMyLocation } = require('./iss');

const nextPassTimes = function(passTimes) {

  for (const pass of passTimes) {
    console.log("pass", pass)
    const datetime = new Date(pass.risetime * 1000);

    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  nextPassTimes(passTimes);
});
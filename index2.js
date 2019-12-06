const { nextISSTimesForMyLocation } = require('./iss_promised');
const nextPassTimes = require('./index');

nextISSTimesForMyLocation() 
  .then((passTimes) => {
    nextPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });


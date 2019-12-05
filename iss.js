const request = require('request');

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */



const fetchMyIP = function(callback) {

  request("https://api.ipify.org?format=json", (error, response, body) => {

    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {

  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {

    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body).data;

    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
  

    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP: ${body}`;
      callback(Error(msg), null);
      return;

     
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};


const nextISSTimesForMyLocation = function(callback) {
  
  fetchMyIP((error, ip) => {

    if (error) {
      return callback(error);
    }
 
    fetchCoordsByIP(ip, (error, data) => {

      if (error) {
        return callback(error);
      }

      fetchISSFlyOverTimes(data, (error, passes) => {

        if (error) {
          return callback(error);
        }

        callback(null, passes);
      });
    });
  });
};



module.exports = { nextISSTimesForMyLocation };


// Function to extract the username from the URL
function getUsernameFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('username');
}

// Get the username and display it on the page
const username = getUsernameFromURL();



if (username) {
  document.getElementById('username').textContent = `Hello, ${username}!`;

  // Reference to the Firebase Realtime Database
  const database = firebase.database();
  const playerInfoRef = database.ref('player_info');

  const playLink = document.getElementById('play-link');
  const tutorialLink = document.getElementById('tutorial-link');

  // Append the username as a query parameter to the link
  playLink.href = `stage.html?username=${username}`;
  tutorialLink.href = `toturials.html?username=${username}`;

  // Fetch data from the database based on the username
  playerInfoRef.orderByChild('username').equalTo(username).once('value')
      .then(snapshot => {
          if (snapshot.exists()) {
              const playerData = snapshot.val();
              const playerKey = Object.keys(playerData)[0]; // Assuming there is only one matching user

              // Update the HTML elements with data from the database
              document.getElementById('coin').textContent = playerData[playerKey].coin;
              document.getElementById('rank').textContent = `RANK ${playerData[playerKey].rank}`;
              document.getElementById('brilliance').textContent = playerData[playerKey].brilliance_pts || 0;
          } else {
              console.log('User not found in the database');
          }
      })
      .catch(error => {
          console.error('Error fetching data from the database:', error);
      });
}

const database = firebase.database();
// Reference to the player's data in the Realtime Database
const playerDataRef = database.ref(`player_info/${username}`);

// Function to update overallpts and overallmax
function updateOverall(player) {
  var totalPts = 0;
  var totalMax = 0;

  // Loop through stage1 to stage_final
  for (var i = 1; i <= 10; i++) {
      var stageKey = "stage" + i;
      var maxKey = stageKey + "max";
      var ptsKey = stageKey + "pts";

      // Convert values to integers
      var stageMax = parseInt(player[maxKey]);
      var stagePts = parseInt(player[ptsKey]);

      // Sum up values
      totalMax += stageMax;
      totalPts += stagePts;
  }

  // Include "stagefinalmax" and "stagefinalpts" in the overall calculations
  var stageFinalMax = parseInt(player["stagefinalmax"]);
  var stageFinalPts = parseInt(player["stagefinalpts"]);

  totalMax += stageFinalMax;
  totalPts += stageFinalPts;

  // Calculate overallpts and overallmax
  var overallPts = totalPts / 100;
  var overallMax = totalMax / 100;

  // Update player data
  player["overallpts"] = overallPts.toString();
  player["overallmax"] = overallMax.toString();
}

// Update overallpts and overallmax for the fetched player
playerDataRef.once("value").then(function (snapshot) {
  var playerData = snapshot.val();

  // Update overall and rank
  updateOverall(playerData);

  // Update data in the Firebase Realtime Database
  playerDataRef.set(playerData)
      .then(() => {
          console.log("Data updated successfully.");
      })
      .catch(error => {
          console.error('Error updating data in the database:', error);
      });
});

// Fetch player data from the database
const allplayerDataRef = database.ref("player_info");

// Function to update brilliance and rank
function updateBrillianceAndRank(playerData) {
  var players = Object.values(playerData);

  // Sort players based on brilliance_pts in descending order
  players.sort(function (a, b) {
      return parseFloat(b.brilliance_pts || 0) - parseFloat(a.brilliance_pts || 0);
  });

  // Update rank_brilliance for each player
  for (var i = 0; i < players.length; i++) {
      players[i].rank = (i + 1).toString();
  }

  // Sort players again based on rank_brilliance
  players.sort(function (a, b) {
      return parseInt(a.rank) - parseInt(b.rank);
  });

  // Update data in the Firebase Realtime Database
  allplayerDataRef.set(playerData)
      .then(() => {
          console.log("Brilliance ranking updated successfully.");
      })
      .catch(error => {
          console.error('Error updating data in the database:', error);
      });
}

// Update brilliance and rank for all players
allplayerDataRef.once("value").then(function (snapshot) {
  var playerData = snapshot.val();

  // Update brilliance and rank
  updateBrillianceAndRank(playerData);
});

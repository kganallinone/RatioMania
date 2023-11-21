


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
            } else {
                console.log('User not found in the database');
            }
        })
        .catch(error => {
            console.error('Error fetching data from the database:', error);
        });
}

var database = firebase.database();
const usernameplayer = getUsernameFromURL();

var playerDataRef = database.ref(`player_info/${usernameplayer}`);


playerDataRef.once("value").then(function(snapshot) {
    var playerData = snapshot.val();
      // Reference to your Realtime Database

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
    updateOverall(playerData);

    // Update data in the Firebase Realtime Database
    playerDataRef.update(playerData);

    console.log("Data updated successfully.");
  });


  // Fetch player data from the database
  var allplayerDataRef = database.ref("player_info");

  allplayerDataRef.once("value").then(function(snapshot) {
    var playerData = snapshot.val();

    // Function to update overallpts, overallmax, and rank
    function updateOverallAndRank(playerData) {
      var players = Object.values(playerData);

      // Sort players based on overallpts in descending order
      players.sort(function(a, b) {
        return parseFloat(b.overallpts) - parseFloat(a.overallpts);
      });

      // Update rank for each player
      for (var i = 0; i < players.length; i++) {
        players[i].rank = (i + 1).toString();
      }

      // Update data in the Firebase Realtime Database
      allplayerDataRef.update(playerData);

      console.log("Ranking updated successfully.");
    }

    // Update overallpts, overallmax, and rank for all players
    updateOverallAndRank(playerData);
  });
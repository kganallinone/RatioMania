
function CreateAccount() {
    // Get form values
    var usernameInput = document.getElementById("username");
    var ageInput = document.getElementById("age");

    var username = usernameInput.value;
    var age = ageInput.value;

    // Get a reference to the database
    var database = firebase.database();

    // Save data to the database using the username as the key
    return database.ref('player_info/' + username).once('value')
        .then(function(snapshot) {
            if (snapshot.exists()) {
                // Username already exists, show alert and clear input fields
                alert("Username already exists. Please choose a different username.");
                usernameInput.value = '';
                ageInput.value = '';
            } else {
                // Username does not exist, save data to the database
                return database.ref('player_info/' + username).set({
                    username: username,
                    age: age,
                    brilliance_pts: "0",
                    stage1: "OPEN",
                    stage2: "OFF",
                    stage3: "OFF",
                    stage4: "OFF",
                    stage5: "OFF",
                    stage6: "OFF",
                    stage7: "OFF",
                    stage8: "OFF",
                    stage9: "OFF",
                    stage10: "OFF",
                    stage_final: "OFF",
                    stage1pts: '0',
                    stage1max: '0',
                    stage2pts: '0',
                    stage2max: '0',
                    stage3pts: '0',
                    stage3max: '0',
                    stage4pts: '0',
                    stage4max: '0',
                    stage5pts: '0',
                    stage5max: '0',
                    stage6pts: '0',
                    stage6max: '0',
                    stage7pts: '0',
                    stage7max: '0',
                    stage8pts: '0',
                    stage8max: '0',
                    stage9pts: '0',
                    stage9max: '0',
                    stage10pts: '0',
                    stage10max: '0',
                    stagefinalpts: '0',
                    stagefinalmax: '0',
                    overallpts: '0',
                    overallmax: '0',
                    rank: '0',
                    coin: '200'
                });
            }
        })
        .then(function() {
            alert("Data saved successfully!");

            // Clear input fields
            usernameInput.value = '';
            ageInput.value = '';

            // Redirect or perform any other actions after saving data
        })
        .catch(function(error) {
            console.error("Error saving data: ", error);
        });
}

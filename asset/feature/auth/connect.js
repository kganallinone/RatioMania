function loginUser() {
    // Get username from the input field
    var username = document.getElementById("username").value;

    // Get a reference to the database
    var database = firebase.database();

    // Check if the username exists in the 'player_info' node
    database.ref('player_info').orderByChild('username').equalTo(username).once('value')
        .then(function(snapshot) {
            if (snapshot.exists()) {
                // Username exists, retrieve and log the user data
                snapshot.forEach(function(childSnapshot) {
                    var userData = childSnapshot.val();
                    console.log("User Data:", userData);
                    window.location.href = `dashboard.html?username=${username}`;
                    // Redirect or perform other actions after successful login
                });
            } else {
                // Username does not exist, show an alert or perform other actions
                alert("Username not found. Please check your username or create an account.");
            }
        })
        .catch(function(error) {
            console.error("Error retrieving user data: ", error);
        });
}
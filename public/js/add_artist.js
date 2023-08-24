// Citation for the following code:
// Date: 08/01/2023
// Copied From
// OSU nodejs-starter-app Github. Modified to run with our database
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// Get the objects we need to modify
let addArtistForm = document.getElementById('add-artist-form-ajax');

// Modify the objects we need
addArtistForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputArtistName = document.getElementById("input-artistName");

    
    // Get the values from the form fields
    let artistNameValue = inputArtistName.value;
    // Put our data we want to send in a javascript object
    let data = {
        artistName: artistNameValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-artist-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputArtistName.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log(xhttp.status)
            console.log(xhttp.response)
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record
function addRowToTable(data) {
    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("artist-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];
    
    location.reload();
}
// Get the objects we need to modify
let addDiscographyForm = document.getElementById('add-discography-form-ajax');

// Modify the objects we need
addDiscographyForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputArtistID = document.getElementById("input-artistID");
    let inputAlbumID = document.getElementById("input-albumID");

    // Get the values from the form fields
    let artistIDValue = inputArtistID.value;
    let albumIDValue = inputAlbumID.value;

    // Put our data we want to send in a JavaScript object
    let data = {
        artistID: artistIDValue,
        albumID: albumIDValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-discography-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputArtistName.value = '';
            inputAlbumName.value = '';
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


// Creates a single row from an Object representing a single record from genres
addRowToTable = (data) => {

    let currentTable = document.getElementById("discography-table");
    let newRow = JSON.parse(data);
    console.log('Server response:', newRow);
    location.reload();
}

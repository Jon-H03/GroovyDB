
// Get the objects we need to modify
let addSongForm = document.getElementById('add-song-form-ajax');

// Modify the objects we need
addSongForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSongName = document.getElementById("input-songName");
    let inputAlbumID = document.getElementById("input-albumID");
    let inputArtistID = document.getElementById("input-artistID");
    let inputStreamCount = document.getElementById("input-streamCount");
    
    // Get the values from the form fields
    let songNameValue = inputSongName.value;
    let albumIDValue = inputAlbumID.value;
    let artistIDValue = inputArtistID.value;
    let streamCountValue = inputStreamCount.value;

    // Put our data we want to send in a javascript object
    let data = {
        songName: songNameValue,
        albumID: albumIDValue,
        artistID: artistIDValue,
        streamCount: streamCountValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-song-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputSongName.value = '';
            inputAlbumID.value = '';
            inputArtistID.value = '';
            inputStreamCount.value = '';
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


// Creates a single row from an Object representing a single record from songs
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("song-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let songNameCell = document.createElement("TD");
    let albumIDCell = document.createElement("TD");
    let artistIDCell = document.createElement("TD");
    let streamCountCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");


    // Fill the cells with correct data
    idCell.innerText = newRow.songID;
    songNameCell.innerText = newRow.songName;
    albumIDCell.innerText = newRow.albumID;
    artistIDCell.innerText = newRow.artistID;
    streamCountCell.innerText = newRow.streamCount;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deletePerson(newRow.songID);
    };
    location.reload();

}

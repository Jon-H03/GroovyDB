// Get the objects we need to modify
let updateSongForm = document.getElementById('update-song-form-ajax');

// Modify the objects we need
updateSongForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputSongID = document.getElementById("songSelect");
    let inputStreamCount = document.getElementById("editStreamCount");

    // Get the values from the form fields
    let songIDValue = inputSongID.value;
    let streamCountValue = inputStreamCount.value;
    
    //console.log(songIDValue)

    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(streamCountValue)) 
    {
        return;
    }
    // Put our data we want to send in a javascript object
    let data = {
        songID: songIDValue,
        streamCount: streamCountValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-song-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //console.log(songIDValue)
            // Add the new data to the table
            updateRow(streamCountValue, songIDValue); 
            
            location.reload();
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log(xhttp.status);
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, songID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("song-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
    
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == songID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let td = updateRowIndex.getElementsByTagName("td")[4];

            td.innerHTML = parsedData[0].streamCount; 
       }
    }
    location.reload();
}

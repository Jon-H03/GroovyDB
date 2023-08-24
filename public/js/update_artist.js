// Get the objects we need to modify
let updateArtistForm = document.getElementById('update-artist-form-ajax');

// Modify the objects we need
updateArtistForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputArtistID = document.getElementById("artistSelect");
    let inputName = document.getElementById("editArtistName");

    // Get the values from the form fields
    let artistIDValue = inputArtistID.value;
    let nameValue = inputName.value;



    // Put our data we want to send in a javascript object
    let data = {
        artistID: artistIDValue,
        nameValue: nameValue,
    }
    
    // Setup our AJAX request 
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-artist-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRow(nameValue, artistIDValue); 

            location.reload();
        }

        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log(xhttp.status);
            console.log("There was an error with the input.");
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, artistID){
    let table = document.getElementById("artist-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == artistID) {
            // Get the location of the row where we found the matching artist ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of description cell (assuming it's the third cell)
            let td = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign description to our updated value
            td.innerHTML = description; 
       }
    }
}

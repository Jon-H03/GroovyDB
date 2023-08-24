// Citation for the following code:
// Date: 08/07/2023
// Copied From
// OSU nodejs-starter-app Github. Modified to run with our database
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

const genreDropdown = document.getElementById("input-genre");

fetch("/genres") 
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(genresData => {
        // Populate the genre dropdown with options
        genresData.forEach(genre => {
            const option = document.createElement("option");
            option.value = genre.genreID;
            option.textContent = genre.genreName;
            genreDropdown.appendChild(option);
        });
    })
    .catch(error => {
        console.error("Error fetching genres:", error);
});

let addAlbumForm = document.getElementById('add-album-form-ajax');

// Modify the objects we need
addAlbumForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputAlbumName = document.getElementById("input-albumName");
    let inputGenre = document.getElementById("input-genre");
    let inputYear = document.getElementById("input-year")

    
    // Get the values from the form fields
    let albumNameValue = inputAlbumName.value;
    let genreValue = inputGenre.value;
    let yearValue = inputYear.value;
    // Put our data we want to send in a javascript object
    let data = {
        albumName: albumNameValue,
        year: yearValue,
        genreID: genreValue,


    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-album-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
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


function addRowToTable(data) {
    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("album-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    function getGenreName(genreID) {
        for (let i = 0; i < parsedData.length; i++) {
            if (parsedData[i].albumID === genreID) {
                return parsedData[i].albumName; 
            }
        }
    }
    location.reload();
}
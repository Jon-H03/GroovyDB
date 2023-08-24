// Citation for the following code:
// Date: 08/02/2023
// Copied and adapted from
// OSU nodejs-starter-app Github. Modified to run with our database
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data


document.addEventListener("DOMContentLoaded", () => {

    const genreDropdown = document.getElementById("input-genreEdit");

    fetch("/genres") 
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(genresData => {
            for (const key in genresData) {
                const genre = genresData[key];
                const option = document.createElement("option");
                option.value = genre.genreID;
                option.textContent = genre.genreName;
                genreDropdown.appendChild(option);
            }
        })
        .catch(error => {
            console.error("Error fetching genres:", error);
        });

    const albumDropdown = document.getElementById("input-album");

    fetch("/albums_edit")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(albumData => {
            for (const key in albumData) {
                const album = albumData[key];
                const option = document.createElement("option");
                option.value = album.albumID;
                option.textContent = album.albumName;
                albumDropdown.appendChild(option);
            }
        })
        .catch(error => {
            console.error("Error fetching albums:", error);
        });


let updateAlbumForm = document.getElementById('put-album-form-ajax');

// Modify the objects we need
updateAlbumForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputAlbumID = document.getElementById("input-album")
    let inputAlbumName = document.getElementById("editAlbumName")
    let inputGenreID = document.getElementById("input-genreEdit");
    let inputYear = document.getElementById("editYear");

    // Get the values from the form fields
    let albumIDValue = inputAlbumID.value;
    let albumNameValue = inputAlbumName.value;
    let genreIDValue = inputGenreID.value;
    let yearValue = inputYear.value;


    // Put our data we want to send in a javascript object
    let data = {
        albumID: albumIDValue,
        albumName: albumNameValue,
        genreID: genreIDValue,
        year: yearValue,
    }
    console.log(data)
    
    // Setup our AJAX request 
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-album-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRow(albumIDValue, albumNameValue, genreIDValue, yearValue); 

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


function updateRow(data, albumID){
    let table = document.getElementById("album-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == albumID) {
            // Get the location of the row where we found the matching album ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of description cell (assuming it's the third cell)
            let td = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign description to our updated value
            td.innerHTML = description; 
       }
    }
}
});
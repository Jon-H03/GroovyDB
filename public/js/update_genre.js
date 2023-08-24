// Citation for the following code:
// Date: 08/02/2023
// Copied and adapted from
// OSU nodejs-starter-app Github. Modified to run with our database
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

// Get the objects we need to modify
let updateGenreForm = document.getElementById('update-genre-form-ajax');

// Modify the objects we need
updateGenreForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputGenreID = document.getElementById("genreSelect");
    let inputDescription = document.getElementById("editDescription");

    // Get the values from the form fields
    let genreIDValue = inputGenreID.value;
    let descriptionValue = inputDescription.value;



    // Put our data we want to send in a javascript object
    let data = {
        genreID: genreIDValue,
        description: descriptionValue,
    }
    
    // Setup our AJAX request 
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-genre-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateRow(descriptionValue, genreIDValue); 

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


function updateRow(data, genreID){
    let table = document.getElementById("genre-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == genreID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let td = updateRowIndex.getElementsByTagName("td")[2];

            td.innerHTML = description; 
       }
    }
}
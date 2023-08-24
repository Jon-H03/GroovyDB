// Citation for the following code:
// Date: 08/13/2023
// Copied from OSU nodejs-starter-app Github. Modified to run with our database
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data


function deleteGenre(genreID) {
    
    let link = '/delete-genre-ajax/';
    let data = {
      genreID: genreID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(genreID);
        location.reload();
      }
    });
  }
  
  function deleteRow(genreID){
      let table = document.getElementById("genre-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == genreID) {
              table.deleteRow(i);
              break;
         }
      }
  }
// Citation for the following code:
// Date: 08/07/2023
// Copied from OSU nodejs-starter-app Github. Modified to run with our database
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteArtist(artistID) {
    
    let link = '/delete-artist-ajax/';
    let data = {
      artistID: artistID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(artistID);
        location.reload();
      }
    });
  }
  
  function deleteRow(artistID){
      let table = document.getElementById("artist-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == artistID) {
              table.deleteRow(i);
              break;
         }
      }
  }
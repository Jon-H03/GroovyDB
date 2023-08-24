// Citation for the following code:
// Date: 08/13/2023
// Copied from OSU nodejs-starter-app Github. Modified to run with our database
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteDiscography(artistID, albumID) {
    
    let link = '/delete-discography-ajax/';
    let data = {
      artistID: artistID,
      albumID: albumID
    };
    console.log(artistID, albumID)
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(artistID, albumID);
        location.reload();
      }
    });
  }
  
  function deleteRow(artistID, albumID){
      let table = document.getElementById("discography-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-artist-id") == artistID && table.rows[i].getAttribute("data-album-id") == albumID) {
            table.deleteRow(i);
            break;
          }
         }
      }
  
// Citation fr the following code:
// Date: 08/09/2023
// Copied from OSU nodejs-starter-app Github. Modified to run with our database
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data


function deleteAlbum(albumID) {
    
    let link = '/delete-album-ajax/';
    let data = {
      albumID: albumID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(albumID);
        location.reload();
      }
    });
  }
  
  function deleteRow(albumID){
      let table = document.getElementById("album-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == albumID) {
              table.deleteRow(i);
              break;
         }
      }
  }

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
  

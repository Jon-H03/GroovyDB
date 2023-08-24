// Citations 
// 1. Citation for the following code:
// Date: 07/31/2023
// Adapted from OSU nodejs-starter-app Github. Modified to run with our database
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app 



// App.js

/*
    SETUP
*/
// Express 
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 1351;                 // Set a port number at the top so it's easy to change in the future
// Database
var db = require('./database/db-connector')

// Handlebars / Templating Engine
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


/*
    ROUTES
*/
app.get('/', function(req, res)
    {
        res.render('index');    
    });
        

/* Get all the main pages data */
app.get('/songs.hbs', function(req, res)
{
    let query1;
    if (req.query.songName === undefined)
    {
        query1 = "SELECT * FROM songs;";
    }    
    else
    {
        query1 = `SELECT * FROM songs WHERE songName LIKE "${req.query.songName}%"`;
    }

    let query2 = "SELECT * FROM artists;";
    let query3 = "SELECT * FROM albums;"; 

    db.pool.query(query1, function(error, songs, fields) {
        db.pool.query(query2, (error, artists, fields) => {
            db.pool.query(query3, (error, albums, fields) => { 

                // Mapping for artists
                let artistmap = {};
                artists.forEach(artist => {
                    let id = parseInt(artist.artistID, 10);
                    artistmap[id] = artist.artistName;
                });

                // Mapping for albums
                let albummap = {};
                albums.forEach(album => {
                    let id = parseInt(album.albumID, 10); 
                    albummap[id] = album.albumName; 
                });
                
                songs = songs.map(song => {
                    return Object.assign(song, {
                        artistName: artistmap[song.artistID],
                        albumName: albummap[song.albumID] 
                    });
                });

                return res.render('songs', { data: songs, artists: artists, albums: albums });
            });
        });
    });
});


app.get('/genres.hbs', function(req, res) {
    
    let query1 = "SELECT * FROM genres;";
      
    db.pool.query(query1, function(error, genres, fields) {
        return res.render('genres', { data: genres });
    });
});

app.get('/genres', function(req, res) {
    let query1 = "SELECT * FROM genres;";
      
    db.pool.query(query1, function(error, genres, fields) {
        if (error) {
            console.error("Error fetching genres:", error);
            res.status(500).json({ error: "An error occurred while fetching genres." });
        } else {
            res.json(genres);
        }
    });
});

app.get('/albums_edit', function(req, res) {
    let query1 = "SELECT * FROM albums;";
      
    db.pool.query(query1, function(error, albums, fields) {
        if (error) {
            console.error("Error fetching albums:", error);
            res.status(500).json({ error: "An error occurred while fetching albums." });
        } else {
            res.json(albums);
        }
    });
});


app.get('/albums.hbs', function(req, res) {
    let query1 = "SELECT a.albumID, a.albumName, a.year, g.genreName " +
                 "FROM albums a " +
                 "JOIN genres g ON a.genreID = g.genreID;";
      
    db.pool.query(query1, function(error, albums, fields) {
        return res.render('albums', { data: albums });
    });
});

app.get('/artists.hbs', function(req, res)
{
    let query1 = "SELECT * FROM artists;";
      
    db.pool.query(query1, function(error, artists, fields) {
        return res.render('artists', { data: artists });
})
})
;

app.get('/discographies.hbs', function(req, res)
{

    let query1 = "SELECT * FROM artists;";
    let query2 = "SELECT * FROM albums;";
    let query3 = "SELECT * FROM discographies;";

    db.pool.query(query1, (error, artists, fields) => {
        if (error) {
            console.error("Error in query1: ", error);
            return res.sendStatus(500);
        }
        db.pool.query(query2, (error, albums, fields) => { 
            if (error) {
                console.error("Error in query1: ", error);
                return res.sendStatus(500); 
            }
            db.pool.query(query3, (error, discography, fields) => {
                if (error) {
                    console.error("Error in query1: ", error);
                    return res.sendStatus(500); 
                }

                // Mapping for artists
                let artistmap = {};
                artists.forEach(artist => {
                    artistmap[artist.artistID] = artist.artistName;
                });

                // Mapping for albums
                let albummap = {};
                albums.forEach(album => {
                    albummap[album.albumID] = album.albumName; 
                });

                // Map artists and albums to discography
                let discographies = discography.map(discog => {
                    return {
                        artistID: discog.artistID,
                        albumID: discog.albumID,
                        artistName: artistmap[discog.artistID],
                        albumName: albummap[discog.albumID]
                    };
                });
                return res.render('discographies', { discographies: discographies, artists: artists, albums: albums });
            });
        });
    })
});


app.get('/genres.hbs', function(req, res) {
    
    let query1 = "SELECT * FROM genres;";
      
    db.pool.query(query1, function(error, genres, fields) {
        return res.render('genres', { data: genres });
    });
});

app.get('/add-album', function(req, res) {
    let queryGenres = "SELECT genreID, genreName FROM genres;";
    db.pool.query(queryGenres, function(error, genres, fields) {
        if (error) throw error;

        return res.render('add_album', { genres: genres });
    });
});


/* End of main pages */

// POST ROUTES
app.post("/add-song-ajax", function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let streamCount = parseInt(data.streamCount);
    if (isNaN(streamCount))
    {
        streamCount = 'NULL'
    }
    // Create the query and run it on the database
    query1 = `INSERT INTO songs (songName, albumID, artistID, streamCount) VALUES ('${data.songName}', '${data.albumID}', '${data.artistID}', ${streamCount})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM songs;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-album-ajax', (req, res) => {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query to insert the new album into the database
    query = `INSERT INTO albums (albumName, genreID, year) VALUES ('${data.albumName}', '${data.genreID}', '${data.year}')`;
    
    // Run the query on the database
    db.pool.query(query, (error, rows) => {
        if (error) {
            // Log the error and send an HTTP response 400 indicating a bad request
            console.log(error);
            res.sendStatus(400);
        } else {
            // If the insertion was successful, perform a SELECT * query on the albums table
            query = `SELECT * FROM albums`;
            db.pool.query(query, (error, rows) => {
                if (error) {
                    // Log the error and send an HTTP response 400
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    // Send the results of the query back to the client
                    res.send(rows);
                }
            });
        }
    });
});



app.post("/add-discography-ajax", function(req, res) 
{
    let data = req.body;
    let artistID = data.artistID;
    let albumID = data.albumID;

    
    let query1 = `INSERT INTO discographies (artistID, albumID) VALUES (?, ?)`;

    db.pool.query(query1, [artistID, albumID], function(error, result) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.json({ artistID: artistID, albumID: albumID });
      }
    });
});

app.post("/add-genre-ajax", function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO genres (genreName, description) VALUES ('${data.genreName}', '${data.description}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM genres;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post("/add-artist-ajax", function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO artists (artistName) VALUES ('${data.artistName}')`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error
            query2 = `SELECT * FROM artists;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// DELETE ROUTES
app.delete('/delete-song-ajax/', function(req, res, next) {
    let data = req.body;
    let songID = parseInt(data.songID); 
    let deleteSongQuery = `DELETE FROM songs WHERE songID = ?`; 
  
    db.pool.query(deleteSongQuery, [songID], function(error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204); 
      }
    });
});

app.delete('/delete-album-ajax/', function(req, res, next) {
    let data = req.body;
    let albumID = parseInt(data.albumID); 
    let deleteAlbumQuery = `DELETE FROM albums WHERE albumID = ?`;
  
    db.pool.query(deleteAlbumQuery, [albumID], function(error, rows, fields) {
      if (error) {

        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204); 
      }
    });
});

app.delete('/delete-genre-ajax/', function(req, res, next) {
    
    let data = req.body;
    let genreID = parseInt(data.genreID); 
    let deleteGenreQuery = `DELETE FROM genres WHERE genreID = ?`;
  
    db.pool.query(deleteGenreQuery, [genreID], function(error, rows, fields) {
      if (error) {

        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204); 
      }
    });
});

app.delete('/delete-artist-ajax/', function(req, res, next) {
    let data = req.body;
    let artistID = parseInt(data.artistID); 
    let deleteArtistQuery = `DELETE FROM artists WHERE artistID = ?`;
  
    db.pool.query(deleteArtistQuery, [artistID], function(error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(204); 
      }
    });
});

app.delete('/delete-discography-ajax/', function(req, res, next) {
   
    let data = req.body;
    let artistID = parseInt(data.artistID); 
    let albumID = parseInt(data.albumID)
    let deleteDiscographyQuery = `DELETE FROM discographies WHERE artistID = ? AND albumID = ?`;
  
    db.pool.query(deleteDiscographyQuery, [artistID, albumID], function(error, rows, fields) {
      if (error) {
        
        console.log(error);
        res.sendStatus(400);
      } else {
        
        res.sendStatus(204); 
      }
    });
  });

app.put('/put-song-ajax/', function(req,res,next){
    let data = req.body;

    let songID = parseInt(data.songID); 
    let streamCount = parseInt(data.streamCount); 

    let queryUpdateSong = `UPDATE songs SET streamCount = ? WHERE songs.songID = ?`;

    db.pool.query(queryUpdateSong, [streamCount, songID], function(error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    });
});

app.put('/put-genre-ajax', function(req,res,next){
    
    let data = req.body
    let genreID = parseInt(data.genreID); 
    let description = req.body.description; 

    let queryUpdateGenre = `UPDATE genres SET description = ? WHERE genres.genreID = ?`;

    db.pool.query(queryUpdateGenre, [description, genreID], function(error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    });
});

app.put('/put-artist-ajax', function(req,res,next){
    let data = req.body
    let artistID = parseInt(data.artistID);
    let nameValue = req.body.nameValue; 

    let queryUpdateArtist = `UPDATE artists SET artistName = ? WHERE artists.artistID = ?`;

    db.pool.query(queryUpdateArtist, [nameValue, artistID], function(error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.sendStatus(200);
      }
    });
});

app.put('/put-album-ajax', function(req, res, next) {
    let data = req.body;
    let albumID = parseInt(data.albumID);
    let albumName = req.body.albumName; 
    let genreID = parseInt(data.genreID);
    let year = parseInt(data.year); 

    let queryUpdateAlbum = `UPDATE albums
                            SET albumName = ?, genreID = ?, year = ?
                            WHERE albumID = ?`;

    db.pool.query(queryUpdateAlbum, [albumName, genreID, year, albumID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400); 
        } else {
            res.sendStatus(200); 
        }
    });
});

/*
    LISTENER
*/
app.listen(PORT, function(){         
    console.log('Express started on  flip1.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});

-- GROUP 15
-- Jonathan Hirsch and Stephanie Conner

-- Query syntax from: https://canvas.oregonstate.edu/courses/1922991/assignments/9287073?module_item_id=23329629

-- Add a Song
INSERT INTO songs (songName, albumID, artistID, streamCount)
VALUES (songName, albumID, artistID, streamCount);

-- Add an Album
INSERT INTO albums (albumName, artistID, genreID, year)
VALUES (albumName, artistID, genreId, year);

-- Add an Artist
INSERT INTO artists(:artistName)
VALUES (artistName);

-- Add a Discography
INSERT INTO discographies(artistID, albumID)
VALUES (artistID, albumID);

-- Add a Genre
INSERT INTO genres (genreName, description)
VALUES (genreName, description);


-- Update song
UPDATE songs
SET songID = editSongID, songName = editSongName, albumID = editAlbumID, artistID = editArtistID, streamCount = editStreamCount;

-- Update album
UPDATE albums
SET albumName = editAlbumName, albumID = editAlbumID, genreID = editGenreID, year = editYear;

-- Update artist
UPDATE artists
SET artistID = editArtistID, artistName = editArtistName;

-- Update discography
UPDATE discographies
SET artristID = editDiscographyArtistID, albumID = editDiscographyAlbumID;

-- Update genre
UPDATE genres
SET genreID = editGenreID, genreName = editGenreName, description = editGenreDescription;


DELETE FROM songs
WHERE songID = deleteSongID;

DELETE FROM artists
WHERE artistID = deleteArtistID;

DELETE FROM albums
WHERE albumID = deleteAlbumID;

DELETE FROM genres
WHERE genreID = deleteGenreID;

DELETE FROM discographies
WHERE discographyArtistID = deleteDiscographyArtistID;


SELECT songName FROM songs;

SELECT artistName FROM artists;

SELECT albumName FROM albums;

SELECT genreName FROM genres;

SELECT discography FROM discographies;



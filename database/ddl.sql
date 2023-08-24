/*
Group 15
Stephanie Conner
Jonathan Hirsch
*/

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Create Genres Table
CREATE TABLE IF NOT EXISTS genres (
    genreID int AUTO_INCREMENT UNIQUE NOT NULL, 
    genreName varchar(75) NOT NULL,
    description text,
    PRIMARY KEY (genreID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Artists Table
CREATE TABLE IF NOT EXISTS artists (
    artistID int AUTO_INCREMENT UNIQUE NOT NULL,
    artistName varchar(50) NOT NULL UNIQUE,
    description text,
    PRIMARY KEY (artistID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Albums Table
CREATE TABLE IF NOT EXISTS albums (
    albumID int AUTO_INCREMENT UNIQUE NOT NULL,
    albumName varchar(75) NOT NULL,
    year int NOT NULL,
    genreID int NOT NULL,
    PRIMARY KEY (albumID),
    FOREIGN KEY (genreID) REFERENCES genres(genreID)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Songs Table
CREATE TABLE IF NOT EXISTS songs (
    songID int AUTO_INCREMENT UNIQUE NOT NULL,
    songName varchar(75) NOT NULL,
    albumID int,
    artistID int NOT NULL,
    streamCount int,
    PRIMARY KEY (songID),
    FOREIGN KEY (albumID) REFERENCES albums(albumID)
    ON DELETE CASCADE,
    FOREIGN KEY (artistID) REFERENCES artists(artistID)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Artists Table
CREATE TABLE IF NOT EXISTS artists (
    artistID int AUTO_INCREMENT UNIQUE NOT NULL,
    artistName varchar(50) NOT NULL,
    description text,
    PRIMARY KEY (artistID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Create Discographies Table
CREATE TABLE IF NOT EXISTS discographies (
    artistID int,
    albumID int,
    FOREIGN KEY (artistID) REFERENCES artists(artistID)
    ON DELETE CASCADE,
    FOREIGN KEY (albumID) REFERENCES albums(albumID)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert data into artists Table
INSERT INTO artists (artistName) VALUES
('Jay-Z'),
('Kanye West'),
('Beyonce'),
('21 Savage'),
('Drake');

-- Insert data into genres Table
INSERT INTO genres (genreName, description) VALUES
('Hip Hop', 'Originated in the Bronx borough of New York City in the early 1970s'),
('Rap', 'Musical form of vocal delivery that incorporates "rhyme, rhythmic speech, and street vernacular"'),
('Trap', 'Uses synthesized drums and is characterized by complex hi-hat patterns'),
('Alternative Rap', 'Genre of hip hop music that encompasses a wide range of styles that are not typically identified as mainstream');

-- Insert data into albums Table
INSERT INTO albums (albumName, year, genreID) VALUES
('Watch The Throne', 2011, 1),
('Her Loss', 2016, 1),
('Dangerously In Love', 2003, 2),
('SAVAGE MODE II', 2020, 3),
('Graduation', 2007, 1);

-- Insert data into songs Table
INSERT INTO songs (songName, albumID, artistID, streamCount) VALUES 
('No Church in the Wild', 1, 1, 8),
('Rich Flex', 2, 5, 1),
('Me, Myself, and I', 3, 3, 7),
('No Opp Left Behind', 4, 4, 6),
('Champion', 5, 2, 15);

-- Insert data into artists_albums Table
INSERT INTO discographies (artistID, albumID) VALUES
(1, 1),
(2, 1),
(2, 6),
(3, 3),
(4, 2),
(4, 4),
(5, 6);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;


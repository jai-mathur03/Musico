import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import './Playlist.css'; // Import the CSS file

function Playlist() {
  const [playlist, setPlaylist] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      axios
        .get(`http://localhost:7000/playlist/${user.id}`)
        .then((response) => {
          const playlistData = response.data;
          setPlaylist(playlistData);
        })
        .catch((error) => {
          console.error('Error fetching playlist items: ', error);
        });
    } else {
      console.log('ERROR: User not found');
    }

    const handleAudioPlay = (itemId, audioElement) => {
      if (currentlyPlaying && currentlyPlaying !== audioElement) {
        currentlyPlaying.pause(); // Pause the currently playing audio
      }
      setCurrentlyPlaying(audioElement); // Update the currently playing audio
    };

    // Event listener to handle audio play
    const handlePlay = (itemId, audioElement) => {
      audioElement.addEventListener('play', () => {
        handleAudioPlay(itemId, audioElement);
      });
    };

    // Add event listeners for each audio element
    playlist.forEach((item) => {
      const audioElement = document.getElementById(`audio-${item._id}`);
      if (audioElement) {
        handlePlay(item._id, audioElement);
      }
    });

    // Cleanup event listeners
    return () => {
      playlist.forEach((item) => {
        const audioElement = document.getElementById(`audio-${item._id}`);
        if (audioElement) {
          audioElement.removeEventListener('play', () =>
            handleAudioPlay(item._id, audioElement)
          );
        }
      });
    };
  }, [playlist, currentlyPlaying]);

  const removeFromPlaylist = async (itemId) => {
    try {
      await axios.post(`http://localhost:7000/playlist/remove`, { itemId });
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const response = await axios.get(`http://localhost:7000/playlist/${user.id}`);
        setPlaylist(response.data);
      } else {
        console.log('ERROR: User not found');
      }
    } catch (error) {
      console.error('Error removing item from playlist: ', error);
    }
  };

  const playAllSongs = () => {
    const currentSongAudio = document.getElementById(`audio-${playlist[0]._id}`);

    if (currentSongAudio.paused) {
      // Start playing from the first song
      currentSongAudio.play();

      // Set up the event listener to play the next song when the current one ends
      currentSongAudio.addEventListener('ended', () => {
        const nextIndex = (playlist.indexOf(playlist[0]) + 1) % playlist.length;
        const nextSongAudio = document.getElementById(`audio-${playlist[nextIndex]._id}`);

        if (nextSongAudio) {
          // Play the next song
          nextSongAudio.play();
        }
      });
      setIsPlaying(true);
    } else {
      // Pause the currently playing audio
      currentSongAudio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="playlist-container">
        <div className="playlist-content">
          <h2 className="playlist-title">Playlist</h2>
          <Button
            className="playlist-button"
            style={{ backgroundColor: 'green', border: 'none', marginBottom: '10px' }}
            onClick={playAllSongs}
          >
            {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
          </Button>
          <Table striped bordered hover responsive className="playlist-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Actions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {playlist.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="item-info">
                      <img
                        src={item.image}
                        alt="Item"
                        className="item-image"
                      />
                      <div className="item-details">
                        <strong>{item.title}</strong>
                        <p>{item.singer}</p>
                      </div>
                    </div>
                  </td>
                  <td>{item.genre}</td>
                  <td>
                    <audio controls id={`audio-${item._id}`} className="audio-player">
                      <source src={`http://localhost:7000/${item.songUrl}`} />
                    </audio>
                  </td>
                  <td>
                    <Button
                      className="playlist-button"
                      style={{ backgroundColor: 'blue', border: 'none' }}
                      onClick={() => removeFromPlaylist(item.itemId)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <div className="footer">Enjoy your playlist! 🎵</div>
    </div>
  );
}

export default Playlist;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../User/Sidebar';
import { Button, Table, Container } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import './Favourites.css'; // Import the CSS file


function Favourites() {
  const [items, setItems] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      console.log('ERROR: User not found');
      return;
    }

    // Fetch all items
    axios
      .get(`http://localhost:7000/wishlist/${user.id}`)
      .then((response) => {
        const taskData = response.data;
        setItems(taskData);
      })
      .catch((error) => {
        console.error('Error fetching tasks: ', error);
      });

    // Function to handle audio play
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
    items.forEach((item) => {
      const audioElement = document.getElementById(`audio-${item._id}`);
      if (audioElement) {
        handlePlay(item._id, audioElement);
      }
    });

    // Cleanup event listeners
    return () => {
      items.forEach((item) => {
        const audioElement = document.getElementById(`audio-${item._id}`);
        if (audioElement) {
          audioElement.removeEventListener('play', () =>
            handleAudioPlay(item._id, audioElement)
          );
        }
      });
    };
  }, [items, currentlyPlaying]);

  const removeFromWishlist = async (itemId) => {
    try {
      // Remove item from the wishlist
      await axios.post(`http://localhost:7000/wishlist/remove`, { itemId });

      // Refresh the wishlist items
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const response = await axios.get(`http://localhost:7000/wishlist/${user.id}`);
        setItems(response.data);
      } else {
        console.log('ERROR: User not found');
      }
    } catch (error) {
      console.error('Error removing item from wishlist: ', error);
    }
  };

  return (
    <div>
      <Sidebar />
      <Container className="wishlist-container">
        <div className="wishlist-content">
          <h2 className="wishlist-title">Favorites</h2>
          <Table striped bordered hover variant="dark" className="wishlist-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Genre</th>
                <th></th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id} className="wishlist-row">
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
                    <Button
                      className="wishlist-button"
                      onClick={() => removeFromWishlist(item.itemId, item.songUrl)}
                    >
                      <FaHeart className="heart-icon" />
                    </Button>
                  </td>
                  <td>
                    <audio controls id={`audio-${item._id}`} className="audio-player">
                      <source src={`http://localhost:7000/${item.songUrl}`} />
                    </audio>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
      <div className="footer">Happy Listening! 🎵</div>
    </div>
  );
}

export default Favourites;


import React from 'react';
import Unavbar from './Unavbar';
import './Uhome.css';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';


const Uhome = () => {
  return (
    <div className="uhome-container">
      <Unavbar />
      <div>
        <h1 className="section-title">Best Seller</h1>
        <div className="card-container">
          <Card className="card-item">
            <Link to="/uproducts">
              <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1524451661i/39924789.jpg" />
            </Link>
            <Card.Body>
              <Card.Title className="card-title">RICH DAD<br />POOR DAD</Card.Title>
            </Card.Body>
          </Card>

          <Card className="card-item">
            <Link to="/uproducts">
              <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1463241782i/30186948.jpg" />
            </Link>
            <Card.Body>
              <Card.Title className="card-title">THINK AND<br />GROW RICH</Card.Title>
            </Card.Body>
          </Card>

          <Card className="card-item">
            <Link to="/uproducts">
              <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1674147285i/80830635.jpg" />
            </Link>
            <Card.Body>
              <Card.Title className="card-title">DON'T LET HER STAY</Card.Title>
            </Card.Body>
          </Card>

          <Card className="card-item">
            <Link to="/uproducts">
              <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1675642559i/65214203.jpg" />
            </Link>
            <Card.Body>
              <Card.Title className="card-title">KILLING THE WITCHES</Card.Title>
            </Card.Body>
          </Card>
        </div>

        <h1 className="section-title">Top Recommendation</h1>
        <div className="card-container">
          <Card className="card-item">
            <Link to="/uproducts">
              <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1663805647i/136251.jpg" />
            </Link>
            <Card.Body>
              <Card.Title className="card-title">HARRY POTTER</Card.Title>
            </Card.Body>
          </Card>

          <Card className="card-item">
            <Link to="/uproducts">
              <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1692288251i/122765395.jpg" />
            </Link>
            <Card.Body>
              <Card.Title className="card-title">ELON MUSK</Card.Title>
            </Card.Body>
          </Card>

          <Card className="card-item">
            <Link to="/uproducts">
              <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1544102229i/42983957.jpg" />
            </Link>
            <Card.Body>
              <Card.Title className="card-title">THE MOSQUITO</Card.Title>
            </Card.Body>
          </Card>

          <Card className="card-item">
            <Link to="/uproducts">
              <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1347493537i/1979210.jpg" />
            </Link>
            <Card.Body>
              <Card.Title className="card-title">JOURNEY ON THE JAMES</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>
      <Footer className="footer" />
    </div>
  );
}

export default Uhome;

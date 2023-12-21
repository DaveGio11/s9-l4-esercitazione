import React, { useState } from 'react';
import { Card, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import SearchBar from './SearchBar';  
import BookData from '../data/fantasy.json';

const MyComponent = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    // Reset comments when selecting a new book
    setComments([]);
  };

  const handleAddComment = async () => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          asin: selectedBook.id,
          comment: newComment,
          rate: '3',  // You may want to set a proper rate here
        }),
      });

      if (response.ok) {
        // Refresh comments after adding a new comment
        handleViewComments();
        handleCloseModal();
      } else {
        console.error('Error adding comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleViewComments = async () => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${selectedBook.id}`, {
        headers: {
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg0NDcwZGI1MjViYjAwMThlZDA4MTMiLCJpYXQiOjE3MDMxNjc3NTcsImV4cCI6MTcwNDM3NzM1N30.BOEWb5H7bIO2OX3L-iP15dJ_j3_sCZat58juWbiqXaU',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        console.error('Error fetching comments:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Clear the new comment field when closing the modal
    setNewComment('');
  };

  const handleShowModal = () => setShowModal(true);

  // Filtra i libri in base al termine di ricerca
  const filteredBooks = BookData.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <Row>
        {filteredBooks.map((book) => (
          <Col key={book.id} sm={4}>
            <Card
              className={`g-3 ${selectedBook && selectedBook.id === book.id ? 'selected' : ''}`}
              style={{ marginBottom: '20px', marginTop: '20px' }}
              onClick={() => handleBookSelect(book)}
            >
              <img src={book.img} className="card-img-top" alt="..."/>
              <Card.Body className=' mb-4'>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>{book.text}</Card.Text>
                <h3>{book.price}€</h3>
                <div className="btn-group mt-3" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-sm btn-primary rounded-pill">Buy</button>
                  <button type="button" className="btn btn-sm btn-dark mx-2 rounded-pill" onClick={() => { handleShowModal(); }}>Add Comment</button>
                  <button type="button" className="btn btn-sm btn-info rounded-pill" onClick={handleViewComments}>View Comments</button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add Comment Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="commentText">
              <Form.Label>Comment Text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddComment}>
            Add Comment
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Display Comments */}
      {comments.length > 0 && (
        <div>
          <h3>Comments:</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment._id}>
                {comment.comment} - Rate: {comment.rate}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyComponent;

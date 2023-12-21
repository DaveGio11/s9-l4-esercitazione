import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CommentArea = ({ asin, authToken }) => {
  const [showModal, setShowModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [rate, setRate] = useState('1'); // Default rate
  const [comments, setComments] = useState([]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleAddComment = async () => {
    try {
      // Convert rate to a number (it's received as a string from the form)
      const rateNumber = parseInt(rate, 10);

      if (isNaN(rateNumber) || rateNumber < 1 || rateNumber > 5) {
        console.error('Invalid rate. Rate must be a number between 1 and 5.');
        return;
      }

      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          asin: asin,
          comment: commentText,
          rate: rateNumber, // Use the parsed number
        }),
      });

      if (response.ok) {
        // Refresh comments after adding a new comment
        fetchComments();
        handleClose();
      } else {
        console.error('Error adding comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${asin}`, {
        headers: {
          'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg0NDcwZGI1MjViYjAwMThlZDA4MTMiLCJpYXQiOjE3MDMxNjc3NTcsImV4cCI6MTcwNDM3NzM1N30.BOEWb5H7bIO2OX3L-iP15dJ_j3_sCZat58juWbiqXaU",
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [asin, authToken]);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Add Comment
      </Button>
      <Button variant="secondary" onClick={fetchComments}>
        View Comments
      </Button>

      <Modal show={showModal} onHide={handleClose}>
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
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="rate">
              <Form.Label>Rate (1-5)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                min="1"
                max="5"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleAddComment}>
            Add Comment
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

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

export default CommentArea;

import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userFeedback", feedback);
    setSubmitted(true);
  };

  return (
    <div className="feedback-form">
      <h4>Feedback</h4>
      {submitted ? <Alert variant="success">Thanks for your feedback!</Alert> : null}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Was the prediction accurate?</Form.Label>
          <Form.Control as="textarea" rows={3} onChange={(e) => setFeedback(e.target.value)} />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default FeedbackForm;

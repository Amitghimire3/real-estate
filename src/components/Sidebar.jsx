import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { validateFormData } from "../utils/errorHandling";
import FeedbackForm from "./FeedbackForm";

const SidebarForm = ({ onPredict, formData, setFormData }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onPredict(formData);
  };

  return (
    <div className="sidebar">
      <h4>Enter Property Details</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Area (sq ft)</Form.Label>
          <Form.Control type="number" name="area" onChange={handleChange} required />
          {errors.area && <Alert variant="danger">{errors.area}</Alert>}
        </Form.Group>

        <Form.Group>
          <Form.Label>Bedrooms</Form.Label>
          <Form.Control type="number" name="bedrooms" onChange={handleChange} required />
          {errors.bedrooms && <Alert variant="danger">{errors.bedrooms}</Alert>}
        </Form.Group>

        <Form.Group>
          <Form.Label>Bathrooms</Form.Label>
          <Form.Control type="number" name="bathrooms" onChange={handleChange} required />
          {errors.bathrooms && <Alert variant="danger">{errors.bathrooms}</Alert>}
        </Form.Group>

        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control as="select" name="location" onChange={handleChange}>
            <option value="Downtown">Downtown</option>
            <option value="Suburban">Suburban</option>
            <option value="Rural">Rural</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Age of Property</Form.Label>
          <Form.Control type="number" name="age" onChange={handleChange} required />
          {errors.age && <Alert variant="danger">{errors.age}</Alert>}
        </Form.Group>
        <br />
        <Form.Group>
          <Button variant="primary" type="submit">
            Predict Price
          </Button>
        </Form.Group>
      </Form>
      <FeedbackForm />
    </div>
  );
};

export default SidebarForm;

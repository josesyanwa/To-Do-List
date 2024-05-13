import React, { useState } from "react";
import { Card, Button, Form } from 'react-bootstrap';

function TodoCard({
  workout,
  handleDelete,
}) {
  const [editedWorkout, setEditedWorkout] = useState({ ...workout });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedWorkout({
      ...editedWorkout,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/workouts/${workout.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedWorkout),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setEditedWorkout({ ...data });
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };

  return (
    <Card style={{ width: "18rem", marginBottom: "20px" }}>
      <Card.Body>
        <Form>
          <Form.Group controlId="formExercise">
            <Form.Label>Task</Form.Label>
            <Form.Control
              type="text"
              name="exercise"
              value={editedWorkout.exercise}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formDuration">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="text"
              name="duration"
              value={editedWorkout.duration}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="text"
              name="date"
              value={editedWorkout.date}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formNotes">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={editedWorkout.notes}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant="warning" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="danger" onClick={() => handleDelete(workout.id)}>
            Delete
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default TodoCard;

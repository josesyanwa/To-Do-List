import React, { useState } from 'react';
import '../App.css'; 

function TodoForm({ onAddWorkout }) {
  const [workoutDetails, setWorkoutDetails] = useState({
    exercise: '',
    duration: '',
    date: '',
    notes: '',
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setWorkoutDetails({
      ...workoutDetails,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch('http://localhost:3001/workouts', {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workoutDetails),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        
        console.log('Workout details saved:', data);

         // Call the onAddWorkout function with the new workout details
         onAddWorkout(data);

        setWorkoutDetails({
          exercise: '',
          duration: '',
          date: '',
          notes: '',
        });
      })
      .catch(error => {
        console.error('Error saving workout details:', error);
      });
  }

  return (

    <form onSubmit={handleSubmit} className="workout-form">
      <div className="form-group">
        <label>
          Exercise:
          <input
            type="text"
            name="exercise"
            value={workoutDetails.exercise}
            onChange={handleInputChange}
            required
            style={{ marginBottom: '10px' }}
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          Duration (minutes):
          <input
            type="number"
            name="duration"
            value={workoutDetails.duration}
            onChange={handleInputChange}
            required
            style={{ marginBottom: '10px' }}
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={workoutDetails.date}
            onChange={handleInputChange}
            required
            style={{ marginBottom: '10px' }}
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          Notes:
          <textarea
            name="notes"
            value={workoutDetails.notes}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
        </label>
      </div>

      <button type="submit" className="small-button">Submit</button>
    </form>
  );
}

export default TodoForm;

// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import TodoForm from './Components/TodoForm';
import TodList from './Components/TodList';
import './App.css';

function App() {
  const [workouts, setWorkouts] = useState([]);

  const handleEdit = (id) => {
    console.log("Edit workout with id:", id);
  };

  const handleAddWorkout = (newWorkout) => {
    // Update the state with the new workout
    setWorkouts((prevWorkouts) => [newWorkout, ...prevWorkouts]);
  };

  useEffect(() => {
    const fetchData = () => {
      console.log("Before fetching data...");
      
      fetch("http://localhost:3001/workouts")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setWorkouts(data);
          console.log("Fetched data:", data);
        })
        .catch((error) => {
          console.error("Error fetching workouts:", error);
        });
    };
  
    fetchData();
  }, []);

  const handleDelete = function(id) {

    // Perform the DELETE request

    fetch(`http://localhost:3001/workouts/${id}`, {
      method: 'DELETE',
    })
      .then(function(response) {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        setWorkouts(function(prevWorkouts) {
          return prevWorkouts.filter(function(workout) {
            return workout.id !== id;
          });
        });
        console.log(`Workout with ID ${id} deleted successfully.`);
      })
      .catch(function(error) {
        console.error("Error deleting workout:", error);
      });
  };
  
  
  
  

  console.log("Workouts in App:", workouts);

  return (
    <Router>
      <div>
        {/* Header */}
        {/* Uncomment the following line if you're using NavBar */}
        <header><NavBar /></header>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/workout-form"
              element={<TodoForm onAddWorkout={handleAddWorkout}/>}
            />
            <Route
              path="/workout-list"
              element={
                <TodList
                  workouts={workouts}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer>
          <p>GROUP SEVEN</p>
        </footer>
      </div>
    </Router>
  );
}

// Home component
const Home = () => {
  return <h1>To Do List</h1>;
};

export default App;

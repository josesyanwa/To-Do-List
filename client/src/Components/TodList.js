import React from "react";
import TodoCard from "./TodoCard";

const TodList = ({
  workouts,
  handleEdit,
  handleDelete,
  isModalOpenned,
  setIsModalOpenned,
  setWorkoutId,
}) => {

  return (
    <div className="card-container">
      <h2>My list of Tasks</h2>
      <ul>
        {workouts &&
    
          workouts
            ?.reverse()
            .map((workout, i) => (
              <TodoCard
                workout={workout}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                setIsModalOpenned={setIsModalOpenned}
                isModalOpenned={isModalOpenned}
                setWorkoutId={setWorkoutId}
                key={workout.id}
              />
            ))}
      </ul>
    </div>
  );
};


export default TodList;
// rfce snippet (React Functional Component Export)
import React from 'react';
import Create from './create';

const Home = ({ todos }) => {
  return (
    <>
      <Create />
      {todos.length === 0 ? (
        <div className="container-two">
          <h2>There is no task in the To-do List</h2>
        </div>
      ) : (
        todos.map((todo, index) => (
          <div key={index}>
            {todo}
          </div>
        ))
      )}
    </>
  );
};

export default Home;

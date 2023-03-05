import React from 'react';

const Course = ({ courses }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map((course) => {
        return (
          <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </>
        );
      })}
    </>
  );
};

export default Course;

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => {
        return (
          <Part partName={part.name} exercises={part.exercises} key={part.id} />
        );
      })}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => {
    console.log(s);
    return s + p.exercises;
  }, 0);

  return <h3>Number of exercises {total}</h3>;
};

const Part = ({ partName, exercises }) => {
  return (
    <p>
      {partName} {exercises}
    </p>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

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
  return (
    <p>
      Number of exercises{' '}
      {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  );
};

const Part = ({ partName, exercises }) => {
  return (
    <p>
      {partName} {exercises}
    </p>
  );
};

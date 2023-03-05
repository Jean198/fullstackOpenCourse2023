const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content part1={parts[0]} part2={parts[1]} part3={parts[2]} />
      <Total part1={parts[0]} part2={parts[1]} part3={parts[2]} />
    </div>
  );
};

export default App;

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ part1, part2, part3 }) => {
  return (
    <div>
      <Part partName={part1.name} exercises={part1.exercises} />
      <Part partName={part2.name} exercises={part2.exercises} />
      <Part partName={part3.name} exercises={part3.exercises} />
    </div>
  );
};

const Total = ({ part1, part2, part3 }) => {
  return (
    <p>
      Number of exercises {part1.exercises + part2.exercises + part3.exercises}
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

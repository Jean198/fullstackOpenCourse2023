const App = () => {
  const course = 'Half Stack application development';
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={{ part1, part2, part3 }} />
      <Total parts={{ part1, part2, part3 }} />
    </div>
  );
};

export default App;

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  const { part1, part2, part3 } = parts;

  return (
    <div>
      <Part partName={part1.name} exercises={part1.exercises} />
      <Part partName={part2.name} exercises={part2.exercises} />
      <Part partName={part3.name} exercises={part3.exercises} />
    </div>
  );
};

const Total = ({ parts }) => {
  const { part1, part2, part3 } = parts;
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

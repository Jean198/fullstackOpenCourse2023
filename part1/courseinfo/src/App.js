const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        parts={{ part1, part2, part3 }}
        exercises={{ exercises1, exercises2, exercises3 }}
      />
      <Total exercises={{ exercises1, exercises2, exercises3 }} />
    </div>
  );
};

export default App;

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts, exercises }) => {
  const { part1, part2, part3 } = parts;
  const { exercises1, exercises2, exercises3 } = exercises;

  return (
    <div>
      <Part partName={part1} exercisesNumber={exercises1} />
      <Part partName={part2} exercisesNumber={exercises2} />
      <Part partName={part3} exercisesNumber={exercises3} />
    </div>
  );
};

const Total = ({ exercises }) => {
  const { exercises1, exercises2, exercises3 } = exercises;
  return <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>;
};

const Part = ({ partName, exercisesNumber }) => {
  return (
    <p>
      {partName} {exercisesNumber}
    </p>
  );
};

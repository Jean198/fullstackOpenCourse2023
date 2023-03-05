import { useState } from 'react';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + bad + neutral;
  const average =
    (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad) || 0;
  const positive = (good / total) * 100 || 0;

  return (
    <div>
      <h1>Give feedback</h1>
      <Statistics
        bad={bad}
        good={good}
        neutral={neutral}
        total={total}
        average={average}
        positive={positive}
        setBad={setBad}
        setGood={setGood}
        setNeutral={setNeutral}
      />
    </div>
  );
};

export default App;

const Statistics = ({
  bad,
  good,
  neutral,
  total,
  average,
  positive,
  setBad,
  setGood,
  setNeutral,
}) => {
  return (
    <>
      <div>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>

      <div>
        <h1>Statistics</h1>
      </div>
      <p>Good {good}</p>
      <p>neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {total}</p>
      <p>Average {average}</p>
      <p>Positive {positive} %</p>
    </>
  );
};

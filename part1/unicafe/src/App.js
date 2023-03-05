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
      <div>
        <Button text='good' clickAction={setGood} feedbackType={good} />
        <Button
          text='neutral'
          clickAction={setNeutral}
          feedbackType={neutral}
        />
        <Button text='bad' clickAction={setBad} feedbackType={bad} />
      </div>
      <div>
        <h1>Statistics</h1>
      </div>
      {total > 0 ? (
        <Statistics
          bad={bad}
          good={good}
          neutral={neutral}
          total={total}
          average={average}
          positive={positive}
        />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;

const Statistics = ({ bad, good, neutral, total, average, positive }) => {
  return (
    <>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='All' value={total} />
      <StatisticLine text='Average' value={average} />
      <StatisticLine text='Positive' value={positive} percentage='%' />
    </>
  );
};

const StatisticLine = ({ text, value, percentage }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>
            {value} {percentage}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const Button = ({ clickAction, feedbackType, text }) => {
  return <button onClick={() => clickAction(feedbackType + 1)}>{text}</button>;
};

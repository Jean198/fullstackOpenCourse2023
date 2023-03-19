import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

const App = () => {
  const setGood = () => {
    store.dispatch({
      type: 'GOOD',
    });
  };

  const setNeutral = () => {
    store.dispatch({
      type: 'OK',
    });
  };

  const setBad = () => {
    store.dispatch({
      type: 'BAD',
    });
  };

  const setReset = () => {
    store.dispatch({
      type: 'ZERO',
    });
  };

  return (
    <div>
      <button onClick={setGood}>Good</button>
      <button onClick={setNeutral}>Neutral</button>
      <button onClick={setBad}>Bad</button>
      <button onClick={setReset}>Reset statistics</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);

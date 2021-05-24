import React, { useState } from "react";
import Anecdotes from "../components/Anecdotes";

const Header = ({ text }) => <h1>{text}</h1>;
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;
const StatisticsLine = ({ text, value }) => (
  <tbody>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </tbody>
);
const Statistics = ({ good, neutral, bad, average, total, positive }) => {
  const noFeedbackGiven = !good && !neutral && !bad;

  return noFeedbackGiven ? (
    <div>
      <Header text="Statistics" />
      <p>No feedback given</p>
    </div>
  ) : (
    <div>
      <Header text="Statistics" />
      <table>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="total" value={total} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={positive} />
      </table>
    </div>
  );
};

const getUpdatedHistoryState = (historyState, propsToUpdate) => {
  const tempHistory = { ...historyState, ...propsToUpdate };
  const { good, bad, neutral } = tempHistory;
  const total = good + bad + neutral;

  const getAverage = (total, good, bad) => (total > 0 ? (good - bad) / total : 0);
  const getPositive = (total, good) => (total > 0 ? ((good / total) * 100).toFixed(2) + " %" : "0.0 %");

  const average = getAverage(total, good, bad);
  const positive = getPositive(total, good);

  return { ...tempHistory, total, average, positive };
};

const App = () => {
  const [state, updateState] = useState({ good: 0, neutral: 0, bad: 0, average: 0, total: 0, positive: "0.0 %" });

  const handleClickEvent = (eventType) => {
    const lastValue = state[eventType];
    const updatedHistory = getUpdatedHistoryState(state, { [eventType]: lastValue + 1 });
    updateState(updatedHistory);
  };

  return (
    <div>
      <Header text="Give feedback" />
      <Button handleClick={() => handleClickEvent("good")} text="good" />
      <Button handleClick={() => handleClickEvent("neutral")} text="neutral" />
      <Button handleClick={() => handleClickEvent("bad")} text="bad" />
      <Statistics {...state} />
      <Anecdotes />
    </div>
  );
};

export default App;

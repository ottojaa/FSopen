import React, { useState } from "react";

const getRandomIntBetween = (lastSelected, min, max) => {
  const selectedNum = Math.floor(min + Math.random() * (max + 1 - min));

  return selectedNum === lastSelected ? getRandomIntBetween(lastSelected, min, max) : selectedNum;
};

const Anecdotes = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const initialVotes = Array(6).fill(0);
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(initialVotes);

  const handleVoteClick = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const getAnecdoteWithMostVotes = () => {
    let anecdoteWithMostVotes = 0;
    let maxIndex = 0;

    for (let i = 0; i < votes.length; i++) {
      if (votes[i] > anecdoteWithMostVotes) {
        anecdoteWithMostVotes = votes[i];
        maxIndex = i;
      }
    }

    return maxIndex;
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]} </p>
      <p>has {votes[selected]} votes </p>
      <button onClick={() => setSelected(getRandomIntBetween(selected, 0, anecdotes.length - 1))}>next anecdote</button>
      <button onClick={() => handleVoteClick()}>vote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[getAnecdoteWithMostVotes()]}</p>
      <p>has {votes[getAnecdoteWithMostVotes()]} votes</p>
    </div>
  );
};

export default Anecdotes;

import React from 'react';
import ToggleDrivingSwitch from '../containers/toggle-driving-swtich';
import GameArea from '../components/game-area';

const Game = () => (
  <div>
    <h1>Gridlock</h1>
    <ToggleDrivingSwitch />
    <GameArea />
  </div>
);

export default Game;

import React from 'react';
import ToggleDrivingSwitch from '../containers/toggle-driving-swtich';
import LevelGameArea from '../containers/level-game-area';

const Game = () => (
  <div>
    <h1>Gridlock</h1>
    <ToggleDrivingSwitch />
    <LevelGameArea />
  </div>
);

export default Game;

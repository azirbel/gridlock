import React from 'react';
import { connect } from 'react-redux';
import { toggleDriving } from '../actions';

let ToggleDrivingSwitch = ({ dispatch }) => {
  return (
    <div>
      <button onClick={e => {
        dispatch(toggleDriving());
      }}>
        Play/Pause
      </button>
    </div>
  );
}
ToggleDrivingSwitch = connect()(ToggleDrivingSwitch);

export default ToggleDrivingSwitch;

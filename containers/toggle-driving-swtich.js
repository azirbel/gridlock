import React from 'react';
import { connect } from 'react-redux';
import { toggleDriving } from '../actions';

let ToggleDrivingSwitch = ({ dispatch }) => {
  return (
    <div>
      Here I am.
      <button onClick={e => {
        dispatch(toggleDriving());
      }}>
        Click me!
      </button>
    </div>
  );
}
ToggleDrivingSwitch = connect()(ToggleDrivingSwitch);

export default ToggleDrivingSwitch;

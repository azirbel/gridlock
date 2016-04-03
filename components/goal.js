import React from 'react';

export default class Goal extends React.Component {
  render() {
    return (
      <circle
        cx={this.props.pos[0]}
        cy={this.props.pos[1]}
        r='0.25'
        fill='none'
        stroke='white'
        strokeWidth='0.03'
      />
  )
  }
}

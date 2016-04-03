import React from 'react';

export default class Car extends React.Component {
  render() {
    return (
      <circle
        cx={this.props.pos[0]}
        cy={this.props.pos[1]}
        r='0.2'
        fill='white'
      />
  )
  }
}

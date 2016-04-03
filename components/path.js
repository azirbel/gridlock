import React from 'react';

export default class Path extends React.Component {
  render() {
    if (this.props.type === 'line') {
      return (
        <line
          x1={this.props.from[0]}
          x2={this.props.to[0]}
          y1={this.props.from[1]}
          y2={this.props.to[1]}
          stroke='white'
          strokeWidth='0.03'
        />
      )
    } else {
      console.error('Only line paths supported for now.');
      return null;
    }
  }
}

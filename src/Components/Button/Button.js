import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  onClick = () => {
    return this.props.onLoadMoreClick(1);
  };

  render() {
    return (
      <div className="Button__box">
        <button type="button" className="Button" onClick={this.onClick}>
          Load more
        </button>
      </div>
    );
  }
}

export default Button;

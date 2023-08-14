import React, { Component } from 'react';
import propTypes from 'prop-types';

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

Button.propTypes = {
  onLoadMoreClick: propTypes.func.isRequired,
};

export default Button;

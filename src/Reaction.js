import React, { Component } from 'react';
import isNull from 'lodash/fp/isNull';

class Reaction extends Component {

  handleClick = () => {
    const { onClick, content } = this.props;
    onClick(content);
  }

  render() {
    const { emojy, content, count } = this.props;
    return (
      <button className="Reaction" onClick={ this.handleClick }>
        <span role="img" aria-label={ content }>{ emojy }</span>
        { !isNull(count) && <span className="count">{ count }</span> }
      </button>
    );
  }

}

export default Reaction;

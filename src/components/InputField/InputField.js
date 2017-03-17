import React, { Component } from 'react';

export default class InputField extends Component {

  static propTypes = {
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onKeyUp: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    isEnabled: React.PropTypes.bool,
    isFocused: React.PropTypes.bool,
    showCursor: React.PropTypes.bool,
    blinkCursor: React.PropTypes.bool,
    cursorPosition: React.PropTypes.number.isRequired,
    chars: React.PropTypes.array.isRequired,
    keys: React.PropTypes.array.isRequired
  };

  /*
  constructor(props) {
    super(props);
    if (props.text) {
      //const chars = props.text ? props.text.split('') : [];
      //const keys = props.chars.map((ch, index) => index);
      //const nextKey = keys.length;
    }
  }
  */

  render() {
    const styles = require('./InputField.scss');
    const { isEnabled, isFocused, showCursor, blinkCursor, cursorPosition, chars, keys } = this.props;
    const filterCursorClass = (style, index) => {
      if (showCursor) {
        if (index === cursorPosition) {
          if (blinkCursor) {
            return style.cursor;
          }
          return style._cursor;
        }
      }
      return style.inputField;
    };

    const _isEnabled = isEnabled ? 'enabled' : '';
    const _isFocused = isFocused ? 'focused' : '';
    return (
      <div
        role="button"
        aria-pressed="true"
        tabIndex="0"
        className={`${styles.inputField} ${_isEnabled} ${_isFocused}`}
        onMouseOver={this.props.onFocus}
        onMouseLeave={this.props.onBlur}
        onKeyDown={this.props.onKeyDown}
        onKeyUp={this.props.onKeyUp}
        onSubmit={this.props.onSubmit}
      >
        {chars.map((ch, index) => (
          <span className={filterCursorClass(styles, index)} key={keys[index]} >
            <span>{ch}</span>
          </span>
        ))}
        <span className={filterCursorClass(styles, (chars) ? chars.length : 0)} >
        </span>
      </div>
    );
  }
}

InputField.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
  onKeyDown: () => {},
  onKeyUp: () => {},
  onSubmit: () => {},
  isEnabled: true,
  isFocused: true,
  showCursor: true,
  blinkCursor: true
};


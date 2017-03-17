import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as inputFieldActions from 'redux/modules/inputField';
import PCKeyboard from '../../components/PCKeyboard/PCKeyboard';
import InputField from '../../components/InputField/InputField';

const IGNORABLE_KEYCODE = {
  0: true,
  9: true, // tab
  91: true, // Command-R
  93: true // Command-L
};

@connect(
  (state) => ({
    inputField: {
      chars: state.inputField.chars,
      keys: state.inputField.keys,
      cursorPosition: state.inputField.cursorPosition,
      nextKey: state.inputField.nextKey
    } }),
  (dispatch) => ({ actions: bindActionCreators(inputFieldActions, dispatch) })
)

export default class Practice extends React.Component {

  static propTypes = {
    inputField: React.PropTypes.object,
    actions: React.PropTypes.object
  };


  constructor(props) {
    super(props);
    this.state = {
      inputField: {
        chars: [],
        keys: [],
        cursorPosition: 0,
        isEnabled: true,
        isFocused: true,
        showCursor: true,
        blinkCursor: true
      }
    };
  }

  onKeyFocus = () => {
    // this.props.actions.keyFocus(ev.keyCode);
  }

  onKeyBlur = () => {
    // this.props.actions.keyBlur(ev.keyCode);
  }

  onKeyUp = (ev) => {
    if (IGNORABLE_KEYCODE[ev.keyCode] === false) {
      // this.props.actions.keyDown(ev.keyCode);
    }
    ev.preventDefault();
  }

  onKeyDown = (ev) => {
    // if (!this.props.inputField.isEnabled) {
    /*
    if (!this.props.isEnabled) {
      return;
    }
    */
    const code = ev.keyCode;
    if (IGNORABLE_KEYCODE[code]) {
      return;
    }
    if (code === 9) { // tab
      return;
    }

    if (code === 13) { // Enter
      this.props.actions.setText('', 0);
    } if (code === 75 && ev.ctrlKey) { // k
      this.props.actions.killChars();
    } else if (code === 8 || (code === 72 && ev.ctrlKey)) { // backspace
      this.props.actions.backspaceChar();
    } else if (code === 46 || (code === 68 && ev.ctrlKey)) { // delete
      this.props.actions.deleteChar();
    } else if (code === 37 || (code === 66 && ev.ctrlKey)) { // backward
      this.props.actions.moveCursor(-1);
    } else if (code === 39 || (code === 70 && ev.ctrlKey)) { // forward
      this.props.actions.moveCursor(1);
    } else if (code === 65 && ev.ctrlKey) { // ahead
      this.props.actions.moveCursorStart();
    } else if (code === 69 && ev.ctrlKey) { // end
      this.props.actions.moveCursorEnd();
    } else if (ev.key.length === 1) {
      // this.props.actions.insertText(ev.key);
      this.props.actions.inputRomanChar(ev.key);
    }
    ev.preventDefault();
  }

  render() {
    const inputField = this.props.inputField;
    return (
      <div className="container">
        <br />
        <Helmet
          title="Typing Practice"
        />
        <InputField
          chars={inputField.chars}
          keys={inputField.keys}
          cursorPosition={inputField.cursorPosition}
          isEnabled={inputField.isEnabled}
          isFocused={inputField.isFocused}
          showCursor={inputField.showCursor}
          blinkCursor={inputField.blinkCursor}
        />
        <br />
        <PCKeyboard
          id="keyboard"
          lang="en"
          onKeyFocus={this.onKeyFocus}
          onKeyBlur={this.onKeyBlur}
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
        />
      </div>
    );
  }
}

Practice.defaultProps = {
  inputField: {
    chars: [],
    keys: [],
    cursorPosition: 0,
    isEnabled: true,
    isFocused: true,
    showCursor: true,
    blinkCursor: true
  },
  actions: {}
};

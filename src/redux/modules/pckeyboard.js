const initialState = {
};

export function keyDown(code) {
  return {
    type: 'KEY_DOWN',
    code,
    isPressed: true
  };
}

export function keyUp(code) {
  return {
    type: 'KEY_UP',
    code,
    isPressed: false
  };
}

export function keyFocus(code) {
  return {
    type: 'KEY_FOCUS',
    code,
    isFocused: true
  };
}

export function keyBlur(code) {
  return {
    type: 'KEY_BLUR',
    code,
    isFocused: false
  };
}

export default function reducer(state = initialState, action = {}) {
  const diff = {};
  switch (action.type) {
    case 'KEY_DOWN':
    case 'KEY_UP':
      diff[`p${action.code}`] = action.isPressed;
      return Object.assign({}, state, diff);
    case 'KEY_FOCUS':
    case 'KEY_BLUR':
      diff[`f${action.code}`] = action.isFocused;
      return Object.assign({}, state, diff);
    default:
      return state;
  }
}


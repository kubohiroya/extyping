import kana from './kana';

const SET_TEXT = 'extyping/input-field/SET_TEXT';
const INSERT_TEXT = 'extyping/input-field/INSERT_TEXT';
const DELETE_TEXT = 'extyping/input-field/DELETE_TEXT';
const INPUT_ROMAN_CHAR = 'extyping/input-field/INPUT_ROMAN_CHAR';

const MOVE_CURSOR = 'extyping/input-field/MOVE_CURSOR';
const MOVE_CURSOR_START = 'extyping/input-field/MOVE_CURSOR_START';
const MOVE_CURSOR_END = 'extyping/input-field/MOVE_CURSOR_END';

const BACKSPACE_CHAR = 'extyping/input-field/BACKSPACE_CHAR';
const DELETE_CHAR = 'extyping/input-field/DELETE_CHAR';
const KILL_CHARS = 'extyping/input-field/KILL_CHARS';

export const initialState = {
  cursorPosition: 0,
  chars: [],
  keys: [],
  nextKey: 0
};

export function setText(text, cursorPosition = undefined) {
  if (cursorPosition) {
    return {
      type: SET_TEXT,
      text,
      cursorPosition
    };
  }
  return {
    type: SET_TEXT,
    text
  };
}

export function insertText(text) {
  return {
    type: INSERT_TEXT,
    text
  };
}

export function inputRomanChar(ch) {
  return {
    type: INPUT_ROMAN_CHAR,
    ch
  };
}

export function deleteText(length) {
  return {
    type: DELETE_TEXT,
    length
  };
}

export function moveCursor(offset) {
  return {
    type: MOVE_CURSOR,
    offset
  };
}

export function moveCursorStart() {
  return {
    type: MOVE_CURSOR_START
  };
}

export function moveCursorEnd() {
  return {
    type: MOVE_CURSOR_END
  };
}

export function backspaceChar() {
  return {
    type: BACKSPACE_CHAR
  };
}

export function deleteChar() {
  return {
    type: DELETE_CHAR
  };
}

export function killChars() {
  return {
    type: KILL_CHARS
  };
}

function setTextActionReducer(state, action) {
  const _chars = action.text.split('');
  let _cursorPosition = action.cursorPosition;
  if (!_cursorPosition) {
    _cursorPosition = _chars.length;
  }
  if (_cursorPosition <= _chars.length) {
    const _keys = Array(_chars.length);
    let _nextKey = state.nextKey;
    for (let index = 0; index < _chars.length; index++) {
      _keys[index] = _nextKey++;
    }
    return Object.assign({}, state, {
      cursorPosition: _cursorPosition,
      chars: _chars,
      keys: _keys,
      nextKey: _nextKey
    });
  }
  throw new Error('cursorPosition is out of string length');
}

function insertTextActionReducer(state, action) {
  const { chars, keys, nextKey, cursorPosition } = state;
  const insertChars = action.text.split('');
  const insertCharsLength = insertChars.length;
  const prefixLength = cursorPosition;
  const postfixLength = chars.length - cursorPosition;

  const _length = prefixLength + insertCharsLength + postfixLength;
  const _chars = Array(_length);
  const _keys = Array(_length);
  let _nextKey = nextKey;

  for (let index = 0; index < prefixLength; index++) {
    _chars[index] = chars[index];
    _keys[index] = keys[index];
  }
  for (let index = prefixLength; index < prefixLength + insertCharsLength; index++) {
    _chars[index] = insertChars[index - prefixLength];
    _keys[index] = _nextKey++;
  }
  for (let index = prefixLength + insertCharsLength;
       index < prefixLength + insertCharsLength + postfixLength; index++) {
    const _index = index - insertCharsLength;
    _chars[index] = chars[_index];
    _keys[index] = keys[_index];
  }
  return Object.assign({}, state, {
    cursorPosition: cursorPosition + insertCharsLength,
    chars: _chars,
    keys: _keys,
    nextKey: _nextKey
  });
}

function moveCursorActionReducer(state, action) {
  const _cursorPosition = state.cursorPosition + action.offset;
  if (_cursorPosition < 0 || state.keys.length < _cursorPosition) {
    return state;
  }
  return Object.assign({}, state, {
    cursorPosition: _cursorPosition
  });
}

function deleteTextActionReducer(state, action) {
  const { chars, keys, cursorPosition } = state;
  if (action.length < 0 && cursorPosition + action.length >= 0) {
    const prefixLength = cursorPosition + action.length;
    const suffixLength = chars.length - cursorPosition;
    const _length = prefixLength + suffixLength;
    const _chars = Array(_length);
    const _keys = Array(_length);
    for (let index = 0; index < prefixLength; index++) {
      _chars[index] = chars[index];
      _keys[index] = keys[index];
    }
    for (let index = prefixLength - action.length; index < chars.length; index++) {
      const _index = index + action.length;
      _chars[_index] = chars[index];
      _keys[_index] = keys[index];
    }
    // let _nextKey = nextKey;
    if (prefixLength - action.length < _length) {
      // _keys[prefixLength - action.length] = _nextKey++;
    }
    return Object.assign({}, state, {
      cursorPosition: cursorPosition + action.length,
      chars: _chars,
      keys: _keys
    });
  } else if (action.length >= 0 && cursorPosition + action.length <= chars.length) {
    const prefixLength = cursorPosition;
    const suffixLength = chars.length - cursorPosition - action.length;
    const _length = prefixLength + suffixLength;
    const _chars = Array(_length);
    const _keys = Array(_length);
    for (let index = 0; index < prefixLength; index++) {
      _chars[index] = chars[index];
      _keys[index] = keys[index];
    }
    for (let index = prefixLength + action.length; index < chars.length; index++) {
      const _index = index - action.length;
      _chars[_index] = chars[index];
      _keys[_index] = keys[index];
    }
    return Object.assign({}, state, {
      cursorPosition,
      chars: _chars,
      keys: _keys
    });
  }
  return state;
}

function inputRomanCharActionReducer(state, action) {
  const mapSuffix = (cursorPosition, offset, chars, keys, _chars, _keys) => {
    for (let index = cursorPosition; index < chars.length; index++) {
      const _index = index + offset;
      _chars[_index] = chars[index];
      _keys[_index] = keys[index];
    }
  };
  const { chars, keys, nextKey, cursorPosition } = state;
  let _nextKey = nextKey;
  const _chars = [].concat(chars);
  const _keys = [].concat(keys);
  const prev = (cursorPosition > 0) ? chars[cursorPosition - 1] : undefined;

  if (action.ch === 'n') {
    if (prev === 'n') {
      // nnを「ん」に変換表示
      _chars[cursorPosition - 1] = 'ん';
      _keys[cursorPosition - 1] = _nextKey++;
      return Object.assign({}, state, {
        chars: _chars,
        keys: _keys,
        nextKey: _nextKey
      });
    }
    // 単なるn入力は、前の文字に続けて「あn」「かn」として表示
    _chars[cursorPosition] = action.ch;
    _keys[cursorPosition] = _nextKey++;
    mapSuffix(cursorPosition, 1, chars, keys, _chars, _keys);
    return Object.assign({}, state, {
      chars: _chars,
      keys: _keys,
      nextKey: _nextKey,
      cursorPosition: cursorPosition + 1
    });
  }
  const getRomanTextBefore = (src, cursor) => {
    const ret = [];
    for (let i = cursor - 1; i >= 0; i--) {
      const c = src[i];
      if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
        ret.push(c);
      } else {
        break;
      }
    }
    return ret.reverse().join('');
  };
  let right = getRomanTextBefore(chars, cursorPosition);
  if (right.charAt(0) === 'n') {
    if (action.ch === 'y') {
      // nにつづけてのyの入力は、前の文字に続けて「ny」として表示
      _chars[cursorPosition] = action.ch;
      _keys[cursorPosition] = _nextKey++;
      mapSuffix(cursorPosition, 1, chars, keys, _chars, _keys);
      return Object.assign({}, state, {
        chars: _chars,
        keys: _keys,
        nextKey: _nextKey,
        cursorPosition: cursorPosition + 1
      });
    }
    if ('kstnhfmrwxlgdzjbvp,./\\[]=-`'.indexOf(action.ch) >= 0) {
      _chars[cursorPosition - right.length] = 'ん';
      _keys[cursorPosition - right.length] = _nextKey++;
      right = right.substring(1);
    }
  }
  let hiraganized = kana.hiraganize(right + action.ch);
  if (hiraganized) {
    if (hiraganized.seq) {
      hiraganized = hiraganized.seq.join('');
    } else if (hiraganized instanceof Array) {
      hiraganized = hiraganized[0];
    }
    for (let index = 0; index < hiraganized.length; index++) {
      /* eslint no-mixed-operators: ["error", {"allowSamePrecedence": true}] */
      const _index = cursorPosition + index - right.length;
      _chars[_index] = hiraganized.charAt(index);
      _keys[_index] = _nextKey++;
    }
    mapSuffix(cursorPosition, hiraganized.length - right.length, chars, keys, _chars, _keys);
    return Object.assign({}, state, {
      chars: _chars,
      keys: _keys,
      cursorPosition: cursorPosition - right.length + hiraganized.length,
      nextKey: _nextKey
    });
  }
  _chars[cursorPosition] = action.ch;
  _keys[cursorPosition] = _nextKey++;
  mapSuffix(cursorPosition, 1, chars, keys, _chars, _keys);
  return Object.assign({}, state, {
    chars: _chars,
    keys: _keys,
    cursorPosition: cursorPosition + 1,
    nextKey: _nextKey
  });
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_TEXT:
      return setTextActionReducer(state, action);
    case INSERT_TEXT:
      return insertTextActionReducer(state, action);
    case DELETE_TEXT:
      return deleteTextActionReducer(state, action);
    case MOVE_CURSOR:
      return moveCursorActionReducer(state, action);
    case MOVE_CURSOR_START:
      return reducer(state, moveCursor(-1 * state.cursorPosition));
    case MOVE_CURSOR_END:
      return reducer(state, moveCursor(state.chars.length - state.cursorPosition));
    case DELETE_CHAR:
      return reducer(state, deleteText(1));
    case BACKSPACE_CHAR:
      return reducer(state, deleteText(-1));
    case KILL_CHARS:
      return reducer(state, deleteText(state.chars.length - state.cursorPosition));
    case INPUT_ROMAN_CHAR:
      return inputRomanCharActionReducer(state, action);
    default:
      return state;
  }
}


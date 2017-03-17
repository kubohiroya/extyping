import assert from 'power-assert';
import * as inputFieldActions from '../inputField';

const reducer = inputFieldActions.reducer;

function error(object){
  console.error(JSON.stringify(object));
  //console.error(JSON.stringify(object, null, '-'));
}

describe('inputField', () => {
  it('setText(text)', () => {
    const initialState = inputFieldActions.initialState;
    const action = inputFieldActions.setText('abcdefg');
    assert.deepEqual(reducer(initialState, action),
      {
        cursorPosition: 7,
        chars: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        keys: [0, 1, 2, 3, 4, 5, 6],
        nextKey: 7
      }
    );
  });


  it('setText(text, cursorPosition)', () => {
    let state = inputFieldActions.initialState;
    state = reducer(state, inputFieldActions.setText('abcdefg', 3));
    assert.deepEqual(state, {
      cursorPosition: 3,
      chars: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
      keys: [0, 1, 2, 3, 4, 5, 6],
      nextKey: 7
    });
  });

  it('insertText(text, cursorPosition)', () => {
    let state = inputFieldActions.initialState;
    state = reducer(state, inputFieldActions.setText('abcdefg', 3));
    state = reducer(state, inputFieldActions.insertText('DEF'));
    assert.deepEqual(state, {
      cursorPosition: 6,
      chars: ['a', 'b', 'c', 'D', 'E', 'F', 'd', 'e', 'f', 'g'],
      keys: [0, 1, 2, 7, 8, 9, 3, 4, 5, 6],
      nextKey: 10
    });
  });

  it('deleteText(minus)', () => {
    let state = inputFieldActions.initialState;
    state = reducer(state, inputFieldActions.setText('abcdefg', 4));
    state = reducer(state, inputFieldActions.deleteText(-2));
    assert.deepEqual(state, {
      cursorPosition: 2,
      chars: ['a', 'b', 'e', 'f', 'g'],
      keys: [0, 1, 4, 5, 6],
      nextKey: 7
    });
  });

  it('deleteText(plus)', () => {
    let state = inputFieldActions.initialState;
    state = reducer(state, inputFieldActions.setText('abcdefg', 4));
    state = reducer(state, inputFieldActions.deleteText(2));
    assert.deepEqual(state, {
      cursorPosition: 4,
      chars: ['a', 'b', 'c', 'd', 'g'],
      keys: [0, 1, 2, 3, 6],
      nextKey: 7
    });
  });

  it('inputRomanChar("ny")', () => {
    let state = inputFieldActions.initialState;
    state = reducer(state, inputFieldActions.setText('n', 1));
    state = reducer(state, inputFieldActions.inputRomanChar('y'));
    assert.deepEqual(state, {
      cursorPosition: 2,
      chars: ['n', 'y'],
      keys: [0, 1],
      nextKey: 2
    });
  });

  it('inputRomanChar("n|k")', () => {
    let state = inputFieldActions.initialState;
    state = reducer(state, inputFieldActions.setText('n', 1));
    state = reducer(state, inputFieldActions.inputRomanChar('k'));
    assert.deepEqual(state, {
      cursorPosition: 2,
      chars: ['ん', 'k'],
      keys: [1, 2],
      nextKey: 3
    });
  });

  it('inputRomanChar("n|a")', () => {
    let state = inputFieldActions.initialState;
    state = reducer(state, inputFieldActions.setText('n', 1));
    state = reducer(state, inputFieldActions.inputRomanChar('a'));
    assert.deepEqual(state, {
      cursorPosition: 1,
      chars: ['な'],
      keys: [1],
      nextKey: 2
    });
  });

  it('inputRomanChar("かきくn|aあいう")', () => {
    let state = inputFieldActions.initialState;
    state = reducer(state, inputFieldActions.setText('かきくnあいう', 4));
    state = reducer(state, inputFieldActions.inputRomanChar('a'));
    assert.deepEqual(state, {
      cursorPosition: 4,
      chars: ['か', 'き', 'く', 'な', 'あ', 'い', 'う'],
      keys: [0, 1, 2, 7, 4, 5, 6],
      nextKey: 8
    });
  });

  it('inputRomanChar("かきくn|yあいう")', () => {
    let state = inputFieldActions.initialState;
    state = reducer(state, inputFieldActions.setText('かきくnあいう', 4));
    state = reducer(state, inputFieldActions.inputRomanChar('y'));
    assert.deepEqual(state, {
      cursorPosition: 5,
      chars: ['か', 'き', 'く', 'n', 'y', 'あ', 'い', 'う'],
      keys: [0, 1, 2, 3, 7, 4, 5, 6],
      nextKey: 8
    });
  });

  it('inputRomanChar("かきくny|aあいう")', () => {
    let state = inputFieldActions.initialState;
    state = reducer(state, inputFieldActions.setText('かきくnyあいう', 5));
    state = reducer(state, inputFieldActions.inputRomanChar('a'));
    assert.deepEqual(state, {
      cursorPosition: 5,
      chars: ['か', 'き', 'く', 'に', 'ゃ', 'あ', 'い', 'う'],
      keys: [0, 1, 2, 8, 9, 5, 6, 7],
      nextKey: 10
    });
  });

  it('inputRomanChar("かきく|nあいう")', () => {
    let state = inputFieldActions.initialState;
    state = reducer(state, inputFieldActions.setText('かきくあいう', 3));
    state = reducer(state, inputFieldActions.inputRomanChar('n'));
    assert.deepEqual(state, {
      cursorPosition: 4,
      chars: ['か', 'き', 'く', 'n', 'あ', 'い', 'う'],
      keys: [0, 1, 2, 6, 3, 4, 5],
      nextKey: 7
    });
  });
});

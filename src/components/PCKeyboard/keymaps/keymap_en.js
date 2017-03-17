module.exports = {
  width: 800,
  height: 300,
  viewBox: '0 0 800 300',
  rx: 5,
  ry: 5,
  topMargin: 14,
  leftMargin: 47,
  backgroundColor: '#ccc',
  getColors: (isFocused, isPressed) => {
    const fillColors = '#888 #fff red yellow'.split(' ');
    const strokeColors = '#ccc #fff red yellow'.split(' ');
    if (!isFocused) {
      return {
        fill: isPressed ? fillColors[1] : fillColors[0],
        stroke: isPressed ? strokeColors[1] : strokeColors[0]
      };
    }
    return {
      fill: isPressed ? fillColors[3] : fillColors[2],
      stroke: isPressed ? strokeColors[3] : strokeColors[2]
    };
  },
  code: [
    [243, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],
    [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8],
    [0, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220],
    [0, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13],
    [16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 16],
    [17, 91, 18, 32, 18, 93, 17]
  ],
  text: [
    ['esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],

    [['~', '`'], ['!', '1'], ['@', '2'], ['#', '3'], ['$', '4'],
      ['%', '5'], ['^', '6'], ['&', '7'], ['*', '8'], ['(', '9'],
      [')', '0'], ['_', '-'], ['+', '='],
      'delete'],
    ['tab',
      'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
      ['{', '['], ['}', ']'], ['|', '\\']
    ],
    ['caps lock',
      'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
      [':', ';'], ['"', '\''],
      'return'
    ],
    ['shift',
      'Z', 'X', 'C', 'V', 'B', 'N', 'M',
      ['<', ','], ['>', '.'], ['?', '/'], 'shift'
    ],
    ['ctrl', 'win', 'alt', '', 'alt', 'apps', 'ctrl']
  ],
  widthType: [
    ['w1', 'w0', 'w0', 'w0', 'w0', 'w0', 'w0', 'w0', 'w0', 'w0', 'w0', 'w0', 'w0'],
    ['w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w2'],
    ['w2', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1'],
    ['w3', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w3'],
    ['w5', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w6'],
    ['w1', 'w1', 'w2', 'w7', 'w1', 'w1', 'w1']
  ],
  alignType: [
    ['m', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm'],
    ['2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', 'r'],
    ['l', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '2', '2', '2'],
    ['l', '1', '1', '1', '1', '1', '1', '1', '1', '1', '2', '2', 'r'],
    ['l', '1', '1', '1', '1', '1', '1', '1', '2', '2', '2', 'r'],
    ['l', 'l', 'l', 'r', 'r', 'r', 'r']
  ],
  heightDefs: [
    20,
    40,
    40,
    40,
    40,
    40
  ],
  widthDefs: {
    w0: 46.2,
    w1: 40,
    w2: 64,
    w3: 77,
    w4: 78,
    w5: 100,
    w6: 105,
    w7: 240
  },
  alignDefs: {
    1: { x: 19, y: 26 },
    2: [{ x: 18, y: 17 }, { x: 18, y: 34 }],
    4: [{ x: 20, y: 14 }, { x: 32, y: 24 }, { x: 20, y: 34 }, { x: 8, y: 24 }],
    l: { x: 5, y: 35 },
    n: { x: 20, y: 27 },
    m: { x: 22, y: 17 },
    r: { x: 5, y: 35 }
  },
  horizontalKeyMargin: 10,
  verticalKeyMargin: 10,
  arrowKeysX: 622,
  arrowKeysY: 243,
  homePositions: {
    70: true,
    74: true
  },
  fontSize: {
    normal: 16,
    small: 10
  }
};


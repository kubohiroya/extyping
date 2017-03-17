module.exports = {
  leftMargin: 20,
  code: [// キーコード
    [243, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],
    [0, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 222, 220, 8],
    [0, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 192, 219, 13],
    [0, 65, 83, 68, 70, 71, 72, 74, 75, 76, 187, 186, 221],
    [16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 226, 16],
    [17, 91, 18, 29, 32, 28, 242, 93, 17]
  ],
  text: [// キーの文字
    ['Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],
    [['半角/', '全角 '],
      ['!', '', 'ぬ', '1'], ['\'', '', 'ふ', '2'], ['#', 'ぁ', 'あ', '3'],
      ['$', 'ぅ', 'う', '4'], ['%', 'ぇ', 'え', '5'],
      ['&', 'ぉ', 'お', '6'], ['"', 'ゃ', 'や', '7'], ['(', 'ゅ', 'ゆ', '8'],
      [')', 'ょ', 'よ', '9'],
      ['', 'を', 'わ', '0'], ['=', '', 'ほ', '-'], ['~', '', 'へ', '^'],
      ['|', '', 'ー', '￥'], 'Backspace'
    ],
    ['Tab',
      ['', '', 'た', 'Q'], ['', '', 'て', 'W'], ['', '', 'い', 'E'], ['', '', 'す', 'R'],
      ['', '', 'か', 'T'], ['', '', 'ん', 'Y'], ['', '', 'な', 'U'], ['', '', 'に', 'I'],
      ['', '', 'ら', 'O'], ['', '', 'せ', 'P'],
      ['`', '', '゛', '@'], ['{', '「', '゜', '['],
      'Enter'
    ],
    ['CapsLock',
      ['', '', 'ち', 'A'], ['', '', 'と', 'S'], ['', '', 'し', 'D'], ['', '', 'は', 'F'],
      ['', '', 'き', 'G'], ['', '', 'く', 'H'], ['', '', 'ま', 'J'], ['', '', 'の', 'K'],
      ['', '', 'り', 'L'], ['+', '', 'れ', ';'], ['*', '', 'け', ':'], ['}', '', 'む', ']']
    ],
    ['Shift',
      ['', '', 'つ', 'Z'], ['', '', 'さ', 'X'], ['', '', 'そ', 'C'], ['', '', 'ひ', 'V'],
      ['', '', 'こ', 'B'], ['', '', 'み', 'N'], ['', '', 'も', 'M'], ['<', '、', 'ね', ','],
      ['>', '。', 'る', '/'], ['?', '・', 'め', '/'], ['_', '', 'ろ', '\\'],
      'Shift'
    ],
    ['Ctrl', 'Win', 'Alt', '無変換', '', '変換', 'カナ', 'Apps', 'Ctrl']
  ],
  widthType: [// キー幅を設定
    ['w1', 'w0', 'w0', 'w0', 'w0', 'w0', 'w0', 'w0', 'w0', 'w0', 'w0', 'w0', 'w0'],
    ['w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w2'],
    ['w2', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1'],
    ['w3', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1'],
    ['w4', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w1', 'w5'],
    ['w1', 'w1', 'w0', 'w1', 'w6', 'w1', 'w1', 'w0', 'w1', 'w2']
  ],
  alignType: [// 文字の印字場所を設定
    ['m', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm'],
    ['2', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', 'r'],
    ['l', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', 'r'],
    ['l', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4'],
    ['l', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', 'r'],
    ['l', 'l', 'l', 'l', 'r', 'r', 'r', 'r', 'r', 'r']
  ],
  widthDefs: {
    w0: 50.3,
    w1: 40,
    w2: 64,
    w3: 76,
    w4: 104,
    w5: 100,
    w6: 192
  },
  arrowKeysX: 644,
  arrowKeysY: 243,
  nonSquareKeys: {
    13: {
      d: 'M2,0 h87 v90 h-76 v-50 h-12 v-40 Z',
      x: 14,
      y: 27,
    }
  },
  fontSize: {
    normal: 11,
    small: 10
  },
};

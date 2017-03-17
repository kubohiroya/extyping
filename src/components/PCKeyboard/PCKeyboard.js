import React from 'react';
import KEYMAP from './keymaps/index.js';
import PCKey from './PCKey';

export default class PCKeyboard extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    lang: React.PropTypes.string.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    viewBox: React.PropTypes.string,
    onKeyDown: React.PropTypes.func.isRequired,
    onKeyUp: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.keymap = KEYMAP[this.props.lang];
    if (!this.keymap) {
      throw Error(`invalid value : PCKeyboard@lang${this.props.lang}`);
    }
    this.keys = this.initKeymap(this.keymap);
    this.elems = {};
  }

  componentDidMount() {
    if (window) {
      window.addEventListener('keydown', this.onKeyDown, false);
      window.addEventListener('keyup', this.onKeyUp, false);
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('keydown', this.onKeyDown, false);
      window.removeEventListener('keyup', this.onKeyUp, false);
    }
  }

  onKeyDown = (ev) => {
    this.setColors(ev.keyCode, false, true);
    this.props.onKeyDown(ev);
  }

  onKeyUp = (ev) => {
    this.setColors(ev.keyCode, false, false);
    this.props.onKeyUp(ev);
  }

  onKeyMounted = (keyCode, elem) => {
    this.elems[keyCode] = elem;
  }

  setColors(keyCode, isFocused, isPressed) {
    const keymap = this.keymap;
    const { fill, stroke } = keymap.getColors(isFocused, isPressed);
    // const node = ReactDOM.findDOMNode(this.refs['key' + keyCode]);
    const node = this.elems[keyCode];
    if (!node) {
      console.log('not found ', keyCode);
      return;
    }
    for (let index = 0; index < node.children.length; index++) {
      const child = node.children[index];
      if ((child.nodeName === 'rect' || child.nodeName === 'path') && child.className !== 'homePosition') {
        child.setAttribute('fill', fill);
        child.setAttribute('stroke', stroke);
      }
    }
  }

  initKeymap(keymap) {
    const ret = [];
    let yPos = keymap.topMargin;
    let id = 0;
    for (let index1 = 0; index1 < keymap.code.length; index1++) {
      let xPos = keymap.leftMargin;
      for (let index2 = 0; index2 < keymap.code[index1].length; index2++) {
        ret.push({
          id: `KEY${id}`,
          code: keymap.code[index1][index2],
          text: keymap.text[index1][index2],
          alignType: keymap.alignType[index1][index2],
          align: keymap.alignDefs[keymap.alignType[index1][index2]],
          width: keymap.widthDefs[keymap.widthType[index1][index2]],
          height: keymap.heightDefs[index1],
          x: xPos,
          y: yPos
        });
        xPos += keymap.widthDefs[keymap.widthType[index1][index2]] + keymap.horizontalKeyMargin;
        id++;
      }
      yPos += keymap.heightDefs[index1] + keymap.verticalKeyMargin;
    }
    return ret;
  }

  renderArrowKeys = (keymap) => {
    const arrowKeyData = [
      ['←', 37, 'm', 'w1', 0, 22],
      ['↑', 38, 'm', 'w1', 50, 0],
      ['→', 39, 'm', 'w1', 100, 22],
      ['↓', 40, 'm', 'w1', 50, 22]
    ].map((data) => ({
      text: data[0],
      id: data[1],
      code: data[1],
      alignType: data[2],
      widthType: data[3],
      align: keymap.alignDefs[data[2]],
      x: data[4],
      y: data[5],
      width: 40,
      height: 19
    }));
    const transform = `translate(${keymap.arrowKeysX}, ${keymap.arrowKeysY})`;
    return (
      <g transform={transform} className="arrows">
        {arrowKeyData.map((key) =>
          <PCKey
            src={key}
            keymap={keymap}
            key={key.id}
            onKeyMounted={this.onKeyMounted} />
        )}
      </g>
    );
  };

  render() {
    const style = require('./PCKeyboard.scss');
    const keymap = this.keymap;
    const keys = this.keys;
    const width = this.props.width || keymap.width;
    const height = this.props.height || keymap.height;
    const viewBox = this.props.viewBox || keymap.viewBox;
    return (
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        id={this.props.id}
        className={`${style.keyboard} container`}
      >
        <filter
          id="drop-shadow"
          width="150%"
          height="150%" />
        <filter
          id="faGaussianBlur"
          in="SourceAlpha"
          result="blur"
          stdDeviation="1" />
        <filter
          id="faOffset"
          dx="0.5"
          dy="0.5"
          result="offsetBlur" />
        <filter
          id="feBlend"
          in="SourceGraphic"
          in2="offsetBlur"
          mode="normal" />
        <g>
          <rect
            rx={keymap.rx}
            ry={keymap.ry}
            x="0"
            y="0"
            width={width}
            height={height}
            fill={keymap.backgroundColor}
          >
          </rect>
          <g>
            {keys.map((key) => (
              <PCKey
                src={key}
                keymap={keymap}
                key={key.id}
                onKeyMounted={this.onKeyMounted} />
            ))}
          </g>
          {this.renderArrowKeys(keymap)}
        </g>
      </svg>
    );
  }
}
PCKeyboard.defaultProps = {
  width: undefined,
  height: undefined,
  viewBox: undefined
};

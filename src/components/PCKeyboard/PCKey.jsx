import React from 'react';

export default class PCKey extends React.Component {
  static propTypes = {
    src: React.PropTypes.object.isRequired,
    keymap: React.PropTypes.object.isRequired,
    isFocused: React.PropTypes.bool,
    isPressed: React.PropTypes.bool,
    onKeyMounted: React.PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return (this.props.isPressed !== nextProps.isPressed);
  }

  registElem(elem) {
    this.props.onKeyMounted(this.props.src.code, elem);
  }

  _renderText() {
    const key = this.props.src;
    const keymap = this.props.keymap;
    const alignType = (type) => {
      switch (type) {
        case 'l':
          return 'start';
        case 'r':
          return 'end';
        case '2':
        case '4':
        case 'm':
        default:
          return 'middle';
      }
    };
    const textAnchor = alignType(key.alignType);
    if (key.align.length === 2) {
      const transform = [
        `translate(${key.align[0].x},${key.align[0].y})`,
        `translate(${key.align[1].x},${key.align[1].y})`
      ];
      return (
        <g>
          <text transform={transform[0]} textAnchor={textAnchor}>
            {key.text[0]}
          </text>
          <text transform={transform[1]} textAnchor={textAnchor}>
            {key.text[1]}
          </text>
        </g>
      );
    } else if (key.align.length === 4) {
      const transform = [
        `translate(${key.align[0].x},${key.align[0].y})`,
        `translate(${key.align[1].x},${key.align[1].y})`,
        `translate(${key.align[2].x},${key.align[2].y})`,
        `translate(${key.align[3].x},${key.align[3].y})`
      ];
      return (
        <g>
          <text transform={transform[0]} textAnchor={textAnchor}>
            {key.text[0]}
          </text>
          <text transform={transform[1]} textAnchor={textAnchor}>
            {key.text[1]}
          </text>
          <text transform={transform[2]} textAnchor={textAnchor}>
            {key.text[2]}
          </text>
          <text transform={transform[3]} textAnchor={textAnchor}>
            {key.text[3]}
          </text>
        </g>
      );
    }
    const transformX = (key.alignType !== 'r') ? key.align.x : key.width - key.align.x;
    const transform = `translate(${transformX},${key.align.y})`;
    const fontSize = (key.alignType === '1') ? keymap.fontSize.normal : keymap.fontSize.small;
    return (
      <g>
        <text transform={transform} textAnchor={textAnchor} fontSize={fontSize}>
          {key.text}
        </text>
      </g>
    );
  }

  renderText() {
    const key = this.props.src;
    try {
      return this._renderText();
    } catch (err) {
      console.error(JSON.stringify(key, null, ' '));
      console.error(JSON.stringify(err, null, ' '));
    }
  }

  renderHomePosition(keycode) {
    if (this.props.keymap.homePositions[keycode]) {
      const key = this.props.src;
      const keymap = this.props.keymap;
      const { fill, stroke } = keymap.getColors(this.props.isFocused, this.props.isPressed);
      return (
        <g>
          <rect
            x={key.width / 3.0}
            y={key.height - 4}
            width={key.width / 3.0}
            height={1}
            stroke={stroke}
            fill={fill}
            className="homePosition">
          </rect>
        </g>
      );
    }
    return <g></g>;
  }

  render() {
    const key = this.props.src;
    const keymap = this.props.keymap;
    const transform = `translate(${key.x},${key.y})`;
    const keyCode = `key${key.code}`;
    const { fill, stroke } = keymap.getColors(this.props.isFocused, this.props.isPressed);

    if (keymap.nonSquareKeys && keymap.nonSquareKeys[key.code]) {
      const nonSquareKey = keymap.nonSquareKeys[key.code];
      return (
        <g
          transform={transform}
          className={keyCode}
          ref={(elem) => { this.registElem(elem); }}>
          <path
            fill={fill}
            stroke={stroke}
            d={nonSquareKey.d}></path>
          <text
            x={nonSquareKey.x}
            y={nonSquareKey.y}
            fontSize={keymap.fontSize.small}>{key.text}</text>
        </g>
      );
    }
    return (
      <g
        transform={transform}
        className={keyCode}
        ref={(elem) => { this.registElem(elem); }}>
        <rect
          x="0"
          y="0"
          width={key.width}
          height={key.height}
          rx={keymap.rx}
          ry={keymap.ry}
          fill={fill}
          stroke={stroke}>
        </rect>
        {this.renderText()}
        {this.renderHomePosition(key.code)}
      </g>
    );
  }
}
PCKey.defaultProps = {
  isFocused: undefined,
  isPressed: undefined
};


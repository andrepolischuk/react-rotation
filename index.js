import React, {cloneElement, Children, Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
const styles = {position: 'relative'};

export default class Rotation extends Component {
  state = {current: 0};

  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    className: PropTypes.string,
    cycle: PropTypes.bool,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.handleWheel = this.handleWheel.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }

  componentDidMount() {
    const el = findDOMNode(this);
    el.addEventListener('wheel', this.handleWheel, false);
    el.addEventListener('touchstart', this.handleTouchStart, false);
    el.addEventListener('touchmove', this.handleTouchMove, false);
    el.addEventListener('touchend', this.handleTouchEnd, false);
    el.addEventListener('mousedown', this.handleTouchStart, false);
    el.addEventListener('mousemove', this.handleTouchMove, false);
    document.addEventListener('mouseup', this.handleTouchEnd, false);
  }

  componentDidUpdate() {
    const handleChange = this.props.onChange;
    if (typeof handleChange === 'function') handleChange(this.state.current);
  }

  componentWillUnmount() {
    const el = findDOMNode(this);
    el.removeEventListener('wheel', this.handleWheel, false);
    el.removeEventListener('touchstart', this.handleTouchStart, false);
    el.removeEventListener('touchmove', this.handleTouchMove, false);
    el.removeEventListener('touchend', this.handleTouchEnd, false);
    el.removeEventListener('mousedown', this.handleTouchStart, false);
    el.removeEventListener('mousemove', this.handleTouchMove, false);
    document.removeEventListener('mouseup', this.handleTouchEnd, false);
  }

  handleWheel(event) {
    event.preventDefault();
    const deltaY = event.deltaY;
    const delta = deltaY === 0 ? 0 : deltaY / Math.abs(deltaY);
    this.setCurrentFrame(this.state.current + delta);
  }

  handleTouchStart(event) {
    event.preventDefault();
    this.pointerPosition = this.calculatePointerPosition(event);
    this.startFrame = this.state.current;
  }

  handleTouchMove(event) {
    event.preventDefault();
    if (typeof this.pointerPosition !== 'number') return;
    const el = findDOMNode(this);
    const pointer = this.calculatePointerPosition(event);
    const max = this.props.vertical ? el.offsetHeight : el.offsetWidth;
    const offset = pointer - this.pointerPosition;
    const delta = Math.floor(offset / max * this.props.children.length);
    this.setCurrentFrame(this.startFrame + delta);
  }

  handleTouchEnd(event) {
    event.preventDefault();
    this.pointerPosition = null;
    this.startFrame = null;
  }

  calculatePointerPosition(event) {
    event = event.type.indexOf('touch') === 0 ? event.changedTouches[0] : event;
    const el = findDOMNode(this);
    const pos = this.props.vertical ? event.clientY - el.offsetTop : event.clientX - el.offsetLeft;
    return pos;
  }

  setCurrentFrame(n) {
    const len = this.props.children.length;
    if (n < 0) n = this.props.cycle ? n + len : 0;
    if (n > len - 1) n = this.props.cycle ? n - len : len - 1;
    if (n !== this.state.current) this.setState({current: n});
  }

  render() {
    return (
      <div className={this.props.className} style={styles}>
        {Children.map(this.props.children, (child, i) => {
          const display = this.state.current === i ? 'block' : 'none';
          return cloneElement(child, {style: {display, width: '100%'}});
        })}
      </div>
    );
  }
}

import React, { cloneElement, Children, Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

export default class Rotation extends Component {
  static propTypes = {
    className: PropTypes.string,
    cycle: PropTypes.bool,
    vertical: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    disableWheel: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.handleWheel = this.handleWheel.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }

  state = { current: 0 };

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

  setCurrentFrame(frame) {
    const { cycle, children, onChange } = this.props;
    const length = children.length;
    let current = frame;
    if (current < 0) current = cycle ? current + length : 0;
    if (current > length - 1) current = cycle ? current - length : length - 1;
    if (current !== this.state.current) {
      this.setState({ current });
      if (typeof onChange === 'function') onChange(current);
    }
  }

  handleWheel(event) {
    if (!this.props.disableWheel) {
      event.preventDefault();
      const { deltaY } = event;
      const delta = deltaY === 0 ? 0 : deltaY / Math.abs(deltaY);
      this.setCurrentFrame(this.state.current + delta);
    }
  }

  handleTouchStart(event) {
    event.preventDefault();
    this.pointerPosition = this.calculatePointerPosition(event);
    this.startFrame = this.state.current;
  }

  handleTouchMove(event) {
    const { vertical, children } = this.props;
    event.preventDefault();
    if (typeof this.pointerPosition !== 'number') return;
    const { offsetWidth, offsetHeight } = findDOMNode(this);
    const pointer = this.calculatePointerPosition(event);
    const max = vertical ? offsetHeight : offsetWidth;
    const offset = pointer - this.pointerPosition;
    const delta = Math.floor(offset / max * children.length);
    this.setCurrentFrame(this.startFrame + delta);
  }

  handleTouchEnd(event) {
    event.preventDefault();
    this.pointerPosition = null;
    this.startFrame = null;
  }

  calculatePointerPosition(event) {
    const touch = event.type.indexOf('touch') === 0 ? event.changedTouches[0] : event;
    const { clientX, clientY } = touch;
    const { offsetTop, offsetLeft } = findDOMNode(this);
    return this.props.vertical ? clientY - offsetTop : clientX - offsetLeft;
  }

  render() {
    const { current } = this.state;
    const { children, className } = this.props;

    return (
      <div className={className} style={{ position: 'relative' }}>
        {Children.map(children, (child, i) => cloneElement(
          child,
          { style: { width: '100%', display: current === i ? 'block' : 'none' } }
        ))}
      </div>
    );
  }
}

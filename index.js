import React, {cloneElement, Children, Component} from 'react'
import PropTypes from 'prop-types'
import {findDOMNode} from 'react-dom'

export default class Rotation extends Component {
  static propTypes = {
    className: PropTypes.string,
    cycle: PropTypes.bool,
    scroll: PropTypes.bool,
    vertical: PropTypes.bool,
    reverse: PropTypes.bool,
    autoPlay: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number
    ]),
    onChange: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    tabIndex: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }

  static defaultProps = {
    cycle: false,
    scroll: true,
    vertical: false,
    tabIndex: 0,
    autoPlay: false
  }

  state = {
    current: 0
  }

  componentDidMount () {
    const el = findDOMNode(this)
    if (this.props.scroll) el.addEventListener('wheel', this.handleWheel, false)
    el.addEventListener('touchstart', this.handleTouchStart, false)
    el.addEventListener('touchmove', this.handleTouchMove, false)
    el.addEventListener('touchend', this.handleTouchEnd, false)
    el.addEventListener('mousedown', this.handleTouchStart, false)
    el.addEventListener('mousemove', this.handleTouchMove, false)
    document.addEventListener('mouseup', this.handleTouchEnd, false)
    if (this.props.autoPlay) this.nextFrame()
  }

  componentWillReceiveProps ({autoPlay}) {
    if (autoPlay !== this.props.autoPlay) {
      if (autoPlay) {
        this.nextFrame()
      } else {
        this.stop()
      }
    }
  }

  componentWillUnmount () {
    const el = findDOMNode(this)
    if (this.props.scroll) el.removeEventListener('wheel', this.handleWheel, false)
    el.removeEventListener('touchstart', this.handleTouchStart, false)
    el.removeEventListener('touchmove', this.handleTouchMove, false)
    el.removeEventListener('touchend', this.handleTouchEnd, false)
    el.removeEventListener('mousedown', this.handleTouchStart, false)
    el.removeEventListener('mousemove', this.handleTouchMove, false)
    document.removeEventListener('mouseup', this.handleTouchEnd, false)
    this.stop()
  }

  setCurrentFrame (frame) {
    const {cycle, children, onChange} = this.props
    const length = children.length
    let current = frame
    if (current < 0) current = cycle ? current + length : 0
    if (current > length - 1) current = cycle ? current - length : length - 1

    if (current !== this.state.current) {
      this.setState({current})
      if (typeof onChange === 'function') onChange(current)
    } else if (this.props.autoPlay) {
      this.stop()
    }
  }

  nextFrame () {
    const {current} = this.state
    const {reverse, autoPlay} = this.props
    const playTimeout = autoPlay === true ? 75 : autoPlay

    this.setCurrentFrame(reverse ? current - 1 : current + 1)

    this.nextTimeout = setTimeout(() => {
      this.nextFrame()
    }, playTimeout)
  }

  stop () {
    clearTimeout(this.nextTimeout)
  }

  handleWheel = event => {
    event.preventDefault()
    const {deltaY} = event
    const {reverse} = this.props
    const {current} = this.state
    const delta = deltaY === 0 ? 0 : deltaY / Math.abs(deltaY)
    this.stop()
    this.setCurrentFrame(reverse ? current - delta : current + delta)
  }

  handleTouchStart = event => {
    event.preventDefault()
    this.pointerPosition = this.calculatePointerPosition(event)
    this.startFrame = this.state.current
    this.stop()
  }

  handleTouchMove = event => {
    const {vertical, children, reverse} = this.props
    event.preventDefault()
    if (typeof this.pointerPosition !== 'number') return
    const {offsetWidth, offsetHeight} = findDOMNode(this)
    const pointer = this.calculatePointerPosition(event)
    const max = vertical ? offsetHeight : offsetWidth
    const offset = pointer - this.pointerPosition
    const delta = Math.floor(offset / max * children.length)
    this.setCurrentFrame(reverse ? this.startFrame - delta : this.startFrame + delta)
  }

  handleTouchEnd = event => {
    event.preventDefault()
    this.pointerPosition = null
    this.startFrame = null
  }

  handleKey = event => {
    if (!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
      const {current} = this.state
      const {vertical, reverse} = this.props
      const prevKey = vertical ? 38 : 37
      const nextKey = vertical ? 40 : 39
      this.stop()

      if (event.keyCode === prevKey) {
        this.setCurrentFrame(reverse ? current + 1 : current - 1)
      } else if (event.keyCode === nextKey) {
        this.setCurrentFrame(reverse ? current - 1 : current + 1)
      }
    }
  }

  calculatePointerPosition (event) {
    const {clientX, clientY} = event.type.indexOf('touch') === 0 ? event.changedTouches[0] : event
    const {offsetTop, offsetLeft} = findDOMNode(this)
    return this.props.vertical ? clientY - offsetTop : clientX - offsetLeft
  }

  render () {
    const {current} = this.state
    const {children, className, tabIndex} = this.props

    return (
      <div
        tabIndex={tabIndex}
        onKeyDown={tabIndex >= 0 ? this.handleKey : null}
        className={className}
        style={{position: 'relative'}}>
        {Children.map(children, (child, i) => cloneElement(
          child,
          {
            style: {
              width: '100%',
              display: current === i ? 'block' : 'none'
            }
          }
        ))}
      </div>
    )
  }
}

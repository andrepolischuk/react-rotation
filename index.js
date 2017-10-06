import React, {cloneElement, Children, Component} from 'react'
import PropTypes from 'prop-types'

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
    ]),
    pauseOnHover: PropTypes.bool
  }

  static defaultProps = {
    cycle: false,
    scroll: true,
    vertical: false,
    tabIndex: 0,
    autoPlay: false,
    pauseOnHover: false,
    onChange: () => {}
  }

  hovered = false

  state = {
    current: 0
  }

  componentDidMount () {
    document.addEventListener('mouseup', this.touchEnd, false)

    if (this.props.autoPlay) {
      this.nextFrame()
    }
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
    document.removeEventListener('mouseup', this.touchEnd, false)
    this.stop()
  }

  setCurrentFrame (frame) {
    const {cycle, children, onChange} = this.props
    const length = children.length
    let current = frame

    if (current < 0) {
      current = cycle ? current + length : 0
    }

    if (current > length - 1) {
      current = cycle ? current - length : length - 1
    }

    if (current !== this.state.current) {
      this.setState({current})
      onChange(current)
    } else if (this.props.autoPlay) {
      this.stop()
    }
  }

  nextFrame () {
    const {current} = this.state
    const {reverse, autoPlay, pauseOnHover} = this.props
    const playTimeout = autoPlay === true ? 75 : autoPlay

    if (!this.hovered || !pauseOnHover) {
      this.setCurrentFrame(reverse ? current - 1 : current + 1)
    }

    this.nextTimeout = setTimeout(() => {
      this.nextFrame()
    }, playTimeout)
  }

  stop () {
    clearTimeout(this.nextTimeout)
  }

  hover = event => {
    this.hovered = true
  }

  unhover = event => {
    this.hovered = false
  }

  wheelMove = event => {
    event.preventDefault()
    const {deltaY} = event
    const {reverse} = this.props
    const {current} = this.state
    const delta = deltaY === 0 ? 0 : deltaY / Math.abs(deltaY)
    this.stop()
    this.setCurrentFrame(reverse ? current - delta : current + delta)
  }

  touchStart = event => {
    event.preventDefault()
    this.pointerPosition = this.calculatePointerPosition(event)
    this.startFrame = this.state.current
    this.stop()
  }

  touchMove = event => {
    const notTouched = typeof this.pointerPosition !== 'number'
    event.preventDefault()

    if (notTouched) {
      return
    }

    const {vertical, children, reverse} = this.props
    const {offsetWidth, offsetHeight} = event.currentTarget
    const pointer = this.calculatePointerPosition(event)
    const max = vertical ? offsetHeight : offsetWidth
    const offset = pointer - this.pointerPosition
    const delta = Math.floor(offset / max * children.length)
    this.setCurrentFrame(reverse ? this.startFrame - delta : this.startFrame + delta)
  }

  touchEnd = event => {
    event.preventDefault()
    this.pointerPosition = null
    this.startFrame = null
  }

  pressKey = event => {
    const eventOnField = event.target.tagName.match('TEXTAREA|INPUT|SELECT')

    if (eventOnField) {
      return
    }

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

  calculatePointerPosition (event) {
    const {clientX, clientY} = event.type.indexOf('touch') === 0 ? event.changedTouches[0] : event
    const {offsetTop, offsetLeft} = event.currentTarget
    return this.props.vertical ? clientY - offsetTop : clientX - offsetLeft
  }

  render () {
    const {current} = this.state

    const {
      children,
      className,
      tabIndex,
      scroll,
      pauseOnHover
    } = this.props

    return (
      <div
        tabIndex={tabIndex}
        onTouchStart={this.touchStart}
        onTouchMove={this.touchMove}
        onTouchEnd={this.touchEnd}
        onMouseDown={this.touchStart}
        onMouseMove={this.touchMove}
        onWheel={scroll ? this.wheelMove : null}
        onMouseEnter={pauseOnHover ? this.hover : null}
        onMouseLeave={pauseOnHover ? this.unhover : null}
        onKeyDown={tabIndex >= 0 ? this.pressKey : null}
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

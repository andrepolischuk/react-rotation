# react-rotation [![Build Status][travis-image]][travis-url]

> [React][react] rotation component

Supports wheel, keyboard, mouse and touch events

## Install

```sh
npm install --save react-rotation
```

## Usage

```js
import React from 'react'
import {render} from 'react-dom'
import Rotation from 'react-rotation'

render(
  <Rotation>
    <img src='images/00.jpg' />
    <img src='images/01.jpg' />
    <img src='images/02.jpg' />
    <img src='images/03.jpg' />
  </Rotation>,
  document.querySelector('.container')
)
```

## Props

* `className` - class name of container, *string*
* `cycle` - cyclic rotation, *boolean*, default `false`
* `scroll` - rotation by wheel/scroll, *boolean*, default `true`
* `vertical` - vertical orientation, *boolean*, default `false`
* `reverse` - reverse rotation, *boolean*, default `false`
* `tabIndex` - order of focusable element, *number|string*, default `0`
* `autoPlay` - start a frame playback with specified speed, *boolean|number*, default `false`
* `pauseOnHover` - pause a frame playback on mouse hover, *boolean*, default `false`
* `onChange` - frame change event handler, *function*

## Tips

You can use any third-party wrapper for lazy loading the images with placeholder:

```js
import React from 'react'
import {render} from 'react-dom'
import Lazy from 'react-lazyload'
import Rotation from 'react-rotation'
import Spinner from './components/Spinner'

const Image = ({height, src}) => (
  <Lazy height={height} placeholder={<Spinner />}>
    <img src={src} />
  </Lazy>
)

render(
  <Rotation>
    <Image height={200} src='images/00.jpg' />
    <Image height={200} src='images/01.jpg' />
    <Image height={200} src='images/02.jpg' />
    <Image height={200} src='images/03.jpg' />
  </Rotation>,
  document.querySelector('.container')
)
```

## Related

* [circlr][circlr] — animation rotation via scroll, mouse and touch events

## License

MIT

[travis-url]: https://travis-ci.org/andrepolischuk/react-rotation
[travis-image]: https://travis-ci.org/andrepolischuk/react-rotation.svg?branch=master

[react]: https://github.com/facebook/react
[circlr]: https://github.com/andrepolischuk/circlr

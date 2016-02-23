# react-rotation [![Build Status][travis-image]][travis-url]

> [React][react] rotation component

Supports wheel, mouse and touch events

## Install

```sh
npm install --save react-rotation
```

## Usage

```js
import React from 'react';
import {render} from 'react-dom';
import Rotation from 'react-rotation';

render(
  <Rotation>
    <img src='images/00.jpg' />
    <img src='images/01.jpg' />
    <img src='images/02.jpg' />
    <img src='images/03.jpg' />
  </Rotation>,
  document.querySelector('.container')
);
```

## Props

* `className` - class name of container, *string*
* `cycle` - cyclic rotation, *boolean*
* `onChange` - frame change event handler, *function*

## Related

* [circlr][circlr] — Animation rotation via scroll, mouse and touch events

## License

MIT

[travis-url]: https://travis-ci.org/andrepolischuk/react-rotation
[travis-image]: https://travis-ci.org/andrepolischuk/react-rotation.svg?branch=master

[react]: https://github.com/facebook/react
[circlr]: https://github.com/andrepolischuk/circlr

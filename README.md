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
import Rotation from 'react-rotation';

const data = [
  'images/00.jpg',
  'images/01.jpg',
  'images/02.jpg',
  'images/03.jpg'
];

React.render(<Rotation data={data} />, document.querySelector('.container'));
```

## Props

  * `className` - class name of container, *string*
  * `cycle` - cyclic rotation, *boolean*
  * `data` - image url list, *array*
  * `onChange` - frame change event handler, *function*

## License

  MIT

[travis-url]: https://travis-ci.org/andrepolischuk/react-rotation
[travis-image]: https://travis-ci.org/andrepolischuk/react-rotation.svg?branch=master

[react]: https://github.com/facebook/react

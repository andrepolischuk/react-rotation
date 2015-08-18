import React, {Component} from 'react';
import store from './store';

export default class Indicator extends Component {
  state = {current: 0};

  constructor() {
    super();
  }

  componentDidMount() {
    store.on('change', n => {
      this.setState({current: n});
    });
  }

  render() {
    return <h3 className='text-center text-muted'>{this.state.current}</h3>;
  }
}

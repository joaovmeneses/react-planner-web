'use client'

import React, { Component } from 'react';
import useCountStore from './useCountStore';

class Counter extends Component {
  state = {
    count: 0 // Evita conflito com o servidor;
  };
  unsubscribe: (() => void) | undefined;

  componentDidMount() {
    this.unsubscribe = useCountStore.subscribe(this.handleStateChange);
    this.setState({ count: useCountStore.getState().count }); // Atualize o estado com o valor do estado do Zustand no lado do cliente
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  handleStateChange = (newState: { count: number; }): void => {
    this.setState({ count: newState.count }); // Atualize o estado do componente quando o estado do Zustand mudar
  };

  increment = () => {
    useCountStore.getState().increment();
  };

  decrement = () => {
    useCountStore.getState().decrement();
  };

  render() {
    const { count } = this.state;

    return (
      <div>
        <h2>
          Counter: {count}
        </h2>
        <button onClick={this.increment}>
          Incrementar
        </button>
        <button onClick={this.decrement}>
          Decrementar
        </button>
      </div>
    );
  }
}

export default Counter;

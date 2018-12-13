import React, { Component } from 'react';
import Initiative from './Initiative';

class App extends Component {
  render() {
    return (
      <div
        style={{
          background: 'lightgray',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100vh',
        }}
      >
        <Initiative />
      </div>
    );
  }
}

export default App;

import React from 'react';
import './App.css';
import DogShow from './DogShow';

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>The amazing Dog Show</h1>
        </header>
        <DogShow />
      </div>
    );
  }
}

export default App;

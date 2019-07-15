import React from 'react';
import './App.css';

class App extends React.Component {

  handleClick(e) {
    e.preventDefault();
    this.props.history.push('/search');
  }

  render() {
      return (
          <div className = "App" >
            <header className = "App-header" >
              <button type="button" onClick={this.handleClick.bind(this)}>View Logs</button>
            </header>
          </div>
      );
  }
}

export default App;

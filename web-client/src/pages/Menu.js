import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Main extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <img src="/images/landing.svg" alt="Landing" style={{ width: '250px', height: '250px', margin: 'auto' }}></img>
        <h3>Total Score: 0</h3>
        <Link to="/main" className="ui green button fluid">
          Posture me!
        </Link>
        <Link to="/" className="ui violet button fluid">
          Dashboard
        </Link>
        <Link to="/" className="ui blue button fluid">
          Rewards
        </Link>
        <Link to="/" className="ui yellow button fluid">
          Calibrate
        </Link>
      </div>
    );
  }
}

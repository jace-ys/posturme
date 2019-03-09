import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Main extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center', margin: '40px 20px' }}>
        <img src="/images/landing.svg" alt="Landing" style={{ width: '250px', height: '250px', margin: 'auto' }}></img>
        <Link to="/main" className="ui green button fluid">
          Posture me!
        </Link>
        <Link to="/main" className="ui violet button fluid">
          Dashboard
        </Link>
        <Link to="/main" className="ui blue button fluid">
          Rewards
        </Link>
        <Link to="/main" className="ui yellow button fluid">
          Calibrate
        </Link>
      </div>
    );
  }
}

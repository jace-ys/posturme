import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Main extends Component {
  state = {
    totalPoints: null
  }

  componentDidMount() {
    fetch('/points')
    .then(res => res.json())
    .then(json => {
      this.setState({ totalPoints: json.totalPoints });
    });
  }

  render() {
    const { totalPoints } = this.state;

    return (
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <img src="/images/landing.svg" alt="Landing" style={{ width: '250px', height: '250px', margin: 'auto' }}></img>
        <h3>Total Points: {totalPoints}</h3>
        <Link to="/main" className="ui green button fluid">
          Posture me!
        </Link>
        <Link to="/dashboard" className="ui violet button fluid">
          Dashboard
        </Link>
        <Link to="/rewards" className="ui blue button fluid">
          Rewards
        </Link>
        <Link to="/" className="ui yellow button fluid">
          Calibrate
        </Link>
      </div>
    );
  }
}

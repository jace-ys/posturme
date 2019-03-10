import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

export default class Rewards extends Component {
  state = {
    totalPoints: null,
    rewards: [
      {
        item: 'Piece of fruit from the cafe',
        points: 5000
      },
      {
        item: 'Salad & smoothie from the cafe',
        points: 15000
      },
      {
        item: 'Activity session discount code',
        points: 30000
      },
      {
        item: 'Gym membership for a week',
        points: 30000
      },
      {
        item: 'Dinner for two at Healthyfood restaurant',
        points: 60000
      },
      {
        item: 'Ergonomic office chair',
        points: 300000
      },
    ]
  }

  purchaseReward = (points) => {
    fetch('/purchase', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ purchase: points })
    })
    .then(res => res.json())
    .then(json => {
      this.setState({ totalPoints: json.totalPoints });
    });
  }

  componentDidMount() {
    fetch('/points')
    .then(res => res.json())
    .then(json => {
      this.setState({ totalPoints: json.totalPoints });
    });
  }

  render() {
    const { totalPoints, rewards } = this.state;

    const rows = rewards.map((row, index) => {
      return (
        <tr key={index}>
          <td>{row.item}</td>
          <td>Points: {row.points}</td>
          <td>
            <Button
              color="red"
              style={{ margin: '5px 0'}}
              disabled={row.points > totalPoints}
              onClick={() => this.purchaseReward(row.points)}
            >
              Purchase
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <img src="/images/rewards.svg" alt="Rewards" style={{ width: '200px', height: '200px', margin: 'auto' }}></img>
        <h3 style={{ margin: '0px' }}>Total Points: {totalPoints}</h3>
        <table className="ui striped table" style={{ textAlign: 'center' }}>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

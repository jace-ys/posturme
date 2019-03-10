import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import { Line } from 'react-chartjs-2';
import { chartData, chartOptions } from '../components/chartSettings';

export default class Dashboard extends Component {
  state = {
    history: [],
    period: 3
  }

  togglePeriod = (period) => {
    this.setState({ period: period });
  }

  componentDidMount() {
    fetch('/history')
    .then(res => res.json())
    .then(json => {
      this.setState({
        history: json.history.map((value, index) => {
          return {
            date: `${1 + index} Mar`,
            percentage: value.percentage,
            flexScore: value.flexScore,
            zValueScore: value.zValueScore,
            xValueScore: value.xValueScore
          }
        })
      });
    });
  }

  render() {
    const { history, period } = this.state;
    const displayHistory = history.slice(-period);

    chartData.datasets[0].data = displayHistory.map(item => item.percentage);
    chartData.labels = displayHistory.map(item => item.date);

    const rows = displayHistory.map(row => {
      return (
        <tr key={row.date} >
          <td>{row.date}</td>
          <td className={percentageColor(row.flexScore)}>Lower back: {row.flexScore}%</td>
          <td className={percentageColor(row.zValueScore)}>Shoulders: {row.zValueScore}%</td>
          <td className={percentageColor(row.xValueScore)}>Side posture: {row.xValueScore}%</td>
        </tr>
      )
    });

    return (
      <div style={{ textAlign: 'center', margin: '20px'}}>
        <h2 style={{ margin: '0' }}>Posturmetrics</h2>
        <h3>Perfect posture %</h3>
        <Button.Group color="teal">
          <Button onClick={() => this.togglePeriod(3)}>3D</Button>
          <Button onClick={() => this.togglePeriod(7)}>7D</Button>
          <Button onClick={() => this.togglePeriod(14)}>14D</Button>
        </Button.Group>
        <div style={{ margin: '15px 0', padding: '0 15px 0 0' }}>
          <Line options={chartOptions} data={chartData} height={300}/>
        </div>
        <h3>Posture breakdown</h3>
        <table className="ui table striped" style={{ textAlign: 'center' }}>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

function percentageColor(percentage) {
  if (percentage > 80) return "good";
  else if (percentage > 50) return "average";
  else return "bad";
}

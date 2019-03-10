import React, { Component } from 'react';
import { Container, Progress, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

const MAX_TIME = 1200;

export default class Main extends Component {
  state = {
    time: MAX_TIME,
    previous: false,
    multiplierCount: 0,
    multiplier: 1,
    percentage: 0,
    points: 0,
    triggerCount: 0,
    mute: false,
    sensors: {
      flexValue: [],
      zValue: [],
      xValue: []
    }
  }

  toggleMute = () => {
    this.setState({ mute: !this.state.mute });
  }

  endSession = () => {
    let { points, percentage, sensors } = this.state;

    if (percentage >= 100.00) {
      points = points * 2;
    }

    const sensorScores = {
      flexScore: computeScore(sensors.flexValue).toFixed(2),
      zValueScore: computeScore(sensors.zValue).toFixed(2),
      xValueScore: computeScore(sensors.xValue).toFixed(2)
    }

    fetch('/', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        points: points,
        percentage: percentage.toFixed(2),
        sensorScores: sensorScores
      })
    })
    .then(res => res.json())
    .then(json => console.log(json));
  }

  componentDidMount() {
    this.socket = socketIOClient('http://localhost:5001');

    this.socket.on('connect', () => {
      console.log('React client connected to socket server!');
    });

    this.socket.on('new-data', message => {
      const flexValue = JSON.parse(message).flex;
      const zValue = JSON.parse(message).zAcel;
      const xValue = JSON.parse(message).xAcel;

      const goodPosture = flexValue && zValue && xValue;

      if (this.state.percentage < 100.00 && this.state.time > 0) {
        if (goodPosture) {
          this.setState({
            previous: true,
            points: this.state.points + (100 * this.state.multiplier),
            percentage: this.state.percentage + (100 * 60 / MAX_TIME),
            triggerCount: 0
          });

          if (this.state.previous) {
            this.setState({ multiplierCount: this.state.multiplierCount + 1});
          }
        }

        else {
          this.setState({
            previous: false,
            multiplierCount: 0,
            triggerCount: this.state.triggerCount + 1
          });

          if (!this.state.mute && this.state.triggerCount % 3 === 0) {
            speak('Sit straight!');
          }
        }

        this.setState({
          time: this.state.time - 60,
          multiplier: computeMultiplier(this.state.multiplierCount),
          sensors: {
            flexValue: [...this.state.sensors.flexValue, flexValue],
            zValue: [...this.state.sensors.zValue, zValue],
            xValue: [...this.state.sensors.xValue, xValue]
          }
        });
      }
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    const { time, points, percentage, multiplier, mute } = this.state;

    if (!mute && time === 0) {
      this.socket.close();
      speak('An hour\'s up! Time to go for a walk!');
    }

    return (
      <Container style={{ textAlign: 'center', margin: '20px' }}>
        <h1 style={{ margin: '0' }}>Posturmeter</h1>
        <h2 style={{ margin: '0' }}>
          <i className={`volume ${mute ? 'up' : 'off'} icon`} onClick={this.toggleMute}></i>
        </h2>
        <h3 style={{ margin: '0' }}>Perfect posture: {percentage.toFixed(2)}%</h3>
        <h5 style={{ margin: '0' }}>Hit 100% for double points!</h5>
        <Progress percent={percentage} indicating/>
        <h3 style={{ margin: '10px 0' }}>Remaining time: {time / 60} mins</h3>
        <Card style={{ margin: '40px auto' }}>
          <Card.Content>
            <Card.Header>
              <h1>Points
              </h1>
            </Card.Header>
            <Card.Description>
              <h1 style={{ fontSize: '40px' }}>{points}</h1>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <h3>Multiplier: {multiplier}x</h3>
          </Card.Content>
        </Card>
        <Link to="/" className="ui button teal fluid" onClick={this.endSession}>End Session</Link>
      </Container>
    );
  }
}

function computeMultiplier(count) {
  if (count >= 15) return 1.5;
  else if (count >= 10) return 1.25;
  else if (count >= 5) return 1.15;
  else if (count >= 3) return 1.1;
  else return 1;
}

function speak(message) {
  var msg = new SpeechSynthesisUtterance(message)
  var voices = window.speechSynthesis.getVoices()
  msg.voice = voices[0]
  window.speechSynthesis.speak(msg)
}

function computeScore(array) {
  return 100 * array.filter(element => element).length / array.length;
}

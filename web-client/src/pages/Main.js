import React, { Component } from 'react';
import { Container, Progress, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

const MAX_TIME = 3600;

export default class Main extends Component {
  state = {
    time: MAX_TIME,
    previous: false,
    multiplierCount: 0,
    multiplier: 1,
    percentage: 0,
    points: 0,
    triggerCount: 0
  }

  endSession = () => {
    fetch('/', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        points: 5000,
        percentage: Math.random().toFixed(2) * 100
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

      if (flexValue) {
        this.setState({
          previous: true,
          points: this.state.points + (100 * this.state.multiplier),
          percentage: this.state.percentage + (100 * 1/MAX_TIME),
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

        if (this.state.triggerCount % 3 === 0) {
          speak('Sit straight!');
        }
      }

      this.setState({
        time: this.state.time - 60,
        multiplier: computeMultiplier(this.state.multiplierCount),
      });
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    const { time, points, percentage, multiplier } = this.state;

    if (time === 0) {
      this.socket.close();
      speak('An hour\'s up! Time to go for a walk!');
    }

    return (
      <Container style={{ textAlign: 'center', margin: '20px' }}>
        <h1>Posturmeter</h1>
        <h3 style={{ margin: '0' }}>Percentage: {percentage}%</h3>
        <h5 style={{ margin: '0' }}>Hit 100% for double points!</h5>
        <Progress percent={percentage} indicating/>
        <h3 style={{ margin: '10px 0' }}>Remaining time: {time / 60} mins</h3>
        <Card style={{ margin: '40px auto' }}>
          <Card.Content>
            <Card.Header>
              <h1>Points</h1>
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
  if (count >= 100) return 1.5;
  else if (count >= 50) return 1.25;
  else if (count >= 20) return 1.15;
  else if (count >= 10) return 1.1;
  else return 1;
}

function speak(message) {
  var msg = new SpeechSynthesisUtterance(message)
  var voices = window.speechSynthesis.getVoices()
  msg.voice = voices[0]
  window.speechSynthesis.speak(msg)
}

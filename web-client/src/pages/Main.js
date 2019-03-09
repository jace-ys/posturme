import React, { Component } from 'react';
import { Container, Progress } from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';

export default class Main extends Component {
  state = {
    time: 360,
    percent: 0
  }

  componentDidMount() {
    this.socket = socketIOClient('http://localhost:5001');

    this.socket.on('connect', () => {
      console.log('React client connected to socket server!');
    });

    this.socket.on('new-data', message => {
      console.log(message);

      this.setState({
        time: this.state.time - 1,
        percent: this.state.percent + 5
      });
    });
  }

  render() {
    const { time } = this.state;

    return (
      <Container style={{ textAlign: 'center', margin: '40px 20px' }}>
        <h3>Posturmeter</h3>
        <Progress percent={this.state.percent} indicating/>
        <h3>Remaining time: {time}</h3>
      </Container>
    );
  }
}

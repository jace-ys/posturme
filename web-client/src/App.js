import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import Menu from './pages/Menu';
import Main from './pages/Main';
import Dashboard from './pages/Dashboard';
import Rewards from './pages/Rewards';

class App extends Component {
  render() {
    return (
      <Container>
        <BrowserRouter>
          <div>
            <Header/>
            <Route path="/" exact component={Menu}/>
            <Route path="/main" exact component={Main}/>
            <Route path="/dashboard" exact component={Dashboard}/>
            <Route path="/rewards" exact component={Rewards}/>
          </div>
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { BrowserRouter, Route } from 'react-router-dom';

import Menu from './pages/Menu.js';
import Main from './pages/Main.js';
import Header from './components/Header.js';

class App extends Component {
  render() {
    return (
      <Container>
        <BrowserRouter>
          <div>
            <Header/>
            <Route path="/" exact component={Menu}/>
            <Route path="/main" exact component={Main}/>
          </div>
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;

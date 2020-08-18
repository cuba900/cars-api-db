import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


import {List} from './components/List'
import {Register} from './components/Register'
import {Navbar} from './components/Navbar'

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="p-2">
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/" component={List} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;

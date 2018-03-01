import React, { Component } from 'react';
import Header from './Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import LinkList from './LinkList';
import CreateLink from './CreateLink';
import Login from './Login';
import Search from './Search';

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route path="/login" component={Login} />
            <Route exact path="/" render={() => <Redirect to="/new/1" />} />
            <Route path="/create" component={CreateLink} />
            <Route path="/search" component={Search} />
            <Route path="/top" component={LinkList} />
            <Route exact path="/new/:page" component={LinkList} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

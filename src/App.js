import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import Search from './components/Search';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/search' component={Search} />
          <Route exact path='/album/:id' component={Album} />
          <Route exact path='/favorites' component={Favorites} />
          <Route exact path='/profile' component={Profile} />
          <Route path='/profile/edit' component={ProfileEdit} />
          <Route exact path='*' component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

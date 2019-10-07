import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import '../styles/App.scss';
import SelectCity from '../../SelectCity/js/SelectCity';
import Header from '../../Header/js/Header';
import PageNotFound from '../../PageNotFound/js/PageNotFound';
import Restaurants from '../../Restaurants/js/Restaurants';

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={SelectCity} />
          <Route path='/list' component={Restaurants} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter> 
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from "react-dom";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import ScrollTop from './ScrollTop/ScrollTop';
import Home from './Home';
import AboutUs from './AboutUs';
import Partners from './Partners';


ReactDOM.render(
  <BrowserRouter>
    <ScrollTop/>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/sobre-nos" component={AboutUs} />
      <Route exact path="/parceiros" component={Partners} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
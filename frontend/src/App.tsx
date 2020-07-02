import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import rootReducer from './rootReducer';
import './App.css';
import Home from './Home/Home';
import {
  List as EmployeeList,
  Details as EmployeeDetails,
} from './employee';
import {
  List as ReviewList,
  Details as ReviewDetails,
} from './review';
import emplyeeMiddleWare from './employee/middleware';
import reviewMiddleWare from './review/middleware';

const store = createStore(
  rootReducer,
  applyMiddleware(
    emplyeeMiddleWare,
    reviewMiddleWare,
  ),
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar bg="light">
            <Link className="navbar-brand" to="/">Review Portal</Link>
            <Nav className="mr-auto">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/employee">Employee</Link>
              <Link className="nav-link" to="/review">Reviews</Link>
            </Nav>
          </Navbar>
          {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/employee/:employeeId">
              <EmployeeDetails />
            </Route>
            <Route path="/employee">
              <EmployeeList />
            </Route>
            <Route path="/review/:reviewId">
              <ReviewDetails />
            </Route>
            <Route path="/review">
              <ReviewList />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

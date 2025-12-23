import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App.js';
import reducers from './reducers';
import './App.scss';

//Axois used for testing email sending
import axios from 'axios';
window.axios = axios;

//Creates a new Redux Store - passes in reducers, inital state, middleware (Redux Thunk used when an action creator needs to return a function instead of a plain object)
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//Renders React application and wires Redux Store to all components via the App component
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
   //Renders the React App to the <div> in the index.html file with an id of 'root'
   document.querySelector('#root')
 );

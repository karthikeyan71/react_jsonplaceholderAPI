import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import Main from './main';
import User from './component/user.js';
import Detail from './component/detail.js';

import { createStore } from 'redux';
import {Provider} from 'react-redux';
import storeData from './data/reducer.js';

const store = createStore(storeData);

console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
  <User/>
  </Provider>,
  document.getElementById('name_loader'));
ReactDOM.render(
  <Provider store={store}>
  <Detail/>
  </Provider>, document.getElementById('data_loader1'));

registerServiceWorker();

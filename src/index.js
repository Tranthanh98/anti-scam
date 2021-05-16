import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux';
import appReducers from './reducers/index';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// import * as Firebase from 'firebase';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { PersistGate } from 'redux-persist/integration/react';
// import LoadingView from './components/Common/LoadingView';

// const persistConfig = {
//   key: 'carts',
//   storage: storage,
//   whitelist: ['carts'] // Xem thêm tại mục "Quá trình merge".
// };

// const pReducer = persistReducer(persistConfig, appReducers);

const store = createStore(appReducers, applyMiddleware(thunk));
// const persistor = persistStore(store);

// const store = createStore(appReducers, applyMiddleware(thunk));

// const firebaseConfig = {
//   apiKey: "AIzaSyDk-X_2562aHJZD7wmQRMu9o7ke7OzrlKs",
//   authDomain: "shop-clothes-944e2.firebaseapp.com",
//   databaseURL: "https://shop-clothes-944e2-default-rtdb.firebaseio.com",
//   projectId: "shop-clothes-944e2",
//   storageBucket: "shop-clothes-944e2.appspot.com",
//   messagingSenderId: "449716003803",
//   appId: "1:449716003803:web:0cbf577280a0cceb9f7dfe",
//   measurementId: "G-0NPDF10MRJ"
// };

// Firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();

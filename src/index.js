import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from "redux";
import appReducers from "./reducers/index";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Firebase from "firebase/app";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import LoadingComponent from "./components/LoadingComponent";
import "firebase/auth";
import "firebase/database";

const persistConfig = {
  key: "userProfile",
  storage: storage,
  whitelist: ["loginReducer"], // Xem thêm tại mục "Quá trình merge".
};

const pReducer = persistReducer(persistConfig, appReducers);

const store = createStore(pReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

const firebaseConfig = {
  apiKey: "AIzaSyBAD0375rKfYkYkIXwhnK13zETYqUg5TWo",
  authDomain: "anti-scam-vn.firebaseapp.com",
  projectId: "anti-scam-vn",
  storageBucket: "anti-scam-vn.appspot.com",
  messagingSenderId: "897567384173",
  appId: "1:897567384173:web:7143f7e340e43ad703d564",
  measurementId: "G-PC5L9JTPE6",
};

Firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<LoadingComponent />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();

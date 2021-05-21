import { Box, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import theme from "./pages/theme";
import logo from "./logo.svg";
import "./App.css";
import BaseModal from "./components/BaseModal";
import BaseDrawer from "./components/BaseDrawer";
import Alertify from "./components/Alertify";
import LoadingComponent from "./components/LoadingComponent";

window.mobileCheck = function () {
  return window.innerWidth <= 960 && window.innerHeight <= 1024;
};

function App() {
  const isMobile = window.mobileCheck();
  return (
    <Box style={{ backgroundColor: "#f1f1f18a" }}>
      <div className="App">
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route
                path="/login"
                render={(prop) => <LoginPage {...prop} isMobile={isMobile} />}
              />
              <Route
                path="/sign-up"
                render={(prop) => (
                  <RegisterPage {...prop} isMobile={isMobile} />
                )}
              />
              <Route
                path="/"
                render={(prop) => <HomePage {...prop} isMobile={isMobile} />}
              />
            </Switch>
          </Router>
          <BaseModal />
          <BaseDrawer />
          <Alertify />
          <LoadingComponent />
        </ThemeProvider>
      </div>
    </Box>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>
//       Edit <code>src/App.js</code> and save to reload.
//     </p>
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//     </a>
//   </header>
// </div>
//   );
// }

// export default App;

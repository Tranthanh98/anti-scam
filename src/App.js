import { Box, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Alertify from "./components/Alertify";
import BaseDrawer from "./components/BaseDrawer";
import BaseModal from "./components/BaseModal";
import LoadingComponent from "./components/LoadingComponent";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import theme from "./pages/theme";
import { LastLocationProvider } from "react-router-last-location";
import Footer from "./components/Footer";

window.mobileCheck = function () {
  return window.innerWidth <= 960 && window.innerHeight <= 1024;
};

function App() {
  const isMobile = window.mobileCheck();

  return (
    <Box style={{ backgroundColor: "#bbbbbb8a" }}>
      <div className="App">
        <ThemeProvider theme={theme}>
          <Router>
            <LastLocationProvider>
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
            </LastLocationProvider>
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

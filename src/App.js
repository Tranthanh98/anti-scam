import { ThemeProvider } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import theme from './pages/theme';

window.mobileCheck = function() {
  return window.innerWidth <= 960 && window.innerHeight <= 1024;
};

function App() {
  const isMobile = window.mobileCheck();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/login" render={prop => <LoginPage {...prop} isMobile={isMobile}/>}/>
          <Route path="/sign-up" render={prop => <RegisterPage {...prop} isMobile={isMobile}/>}/>
          <Route path="/" render={prop => <HomePage {...prop} isMobile={isMobile}/>}/>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;

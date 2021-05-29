import { Box, ThemeProvider } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { LastLocationProvider } from "react-router-last-location";
import { addAlert } from "./actions/alertify.action";
import { LOGOUT } from "./actions/login.action";
import "./App.css";
import Alertify from "./components/Alertify";
import BaseDrawer from "./components/BaseDrawer";
import BaseModal from "./components/BaseModal";
import LoadingComponent from "./components/LoadingComponent";
import eventBus from "./general/EventBus";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import theme from "./pages/theme";

window.mobileCheck = function () {
  return window.innerWidth <= 960 && window.innerHeight <= 1024;
};

function App() {
  const isMobile = window.mobileCheck();
  const [needLogout, setNeedLogout] = useState(false);
  const dispatch = useDispatch();

  const _handleLogout = () => {
    return window.open("/login");
  };

  useEffect(() => {
    eventBus.subscribe(App, "error/authorized", () => {
      setNeedLogout(true);
    });
    return () => {
      eventBus.unsubscribe(App);
    };
  }, []);

  useEffect(() => {
    if (needLogout) {
      dispatch({ type: LOGOUT });
      dispatch(
        addAlert("Tài khoản đã hết hạn, vui lòng đăng nhập lại", "error")
      );
      _handleLogout();
    }
  }, [needLogout]);

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

import { Box, Container, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch, useHistory } from "react-router";
import { selectMenuAct } from "../../actions/select-menu";
import MenuHeader from "../../components/Header/MenuHeader";
import MenuMobile from "../../components/Header/MenuMobile";
import route, { Paths } from "../route";

const styles = makeStyles((theme) => ({
  backgroundBody: {
    backgroundColor: theme.palette.primary.backgroundBody,
  },
}));

function HomePage(props) {
  const { isMobile } = props;
  const classes = styles();

  const history = useHistory();
  const dispatch = useDispatch();
  const _componentDidMount = () => {
    const { location } = history;
    let findLocation = route.find((i) => i.path === location.pathname);
    if (findLocation) {
      dispatch(selectMenuAct(findLocation));
    } else {
      if (location.pathname === "/") {
        let findLocationHome = route.find((i) => i.path === Paths.report);
        dispatch(selectMenuAct(findLocationHome));
      }
    }
  };

  useEffect(() => {
    _componentDidMount();
    //react-hooks/exhaustive-deps
  }, []);
  return (
    <Box>
      {isMobile ? <MenuMobile isMobile={isMobile} /> : <MenuHeader />}
      <Box height={isMobile ? "50px" : "80px"}></Box>
      <Box
        className={classes.backgroundBody}
        display="flex"
        justifyContent="center"
        height="100%"
        width="100%"
      >
        <Container disableGutters>
          <Switch>
            {route.map((rou, index) => {
              return (
                <Route
                  key={index}
                  path={rou.path}
                  render={(prop) => <rou.component {...prop} />}
                />
              );
            })}
            <Route
              path="/"
              render={(prop) => {
                const Comp = route.find((i) => i.path === "/report").component;
                return <Comp {...prop} />;
              }}
            />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;

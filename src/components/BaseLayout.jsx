import { Box, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(1.5),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  hide: {
    display: "none",
  },
}));

const widthScreen = window.innerWidth;

function BaseLayout({ leftChilren, rightChildren }) {
  const classes = useStyles();
  const isMobile = window.mobileCheck();
  return (
    <Box
      padding={widthScreen > 1280 ? "0 48px" : undefined}
      display="flex"
      justifyContent="center"
      minHeight="100vh"
    >
      <Box width={isMobile ? "100%" : "70%"}>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: !isMobile,
          })}
        >
          {leftChilren}
        </main>
      </Box>
      <Box
        padding="12px 0"
        width="25%"
        className={clsx(isMobile && classes.hide)}
      >
        {rightChildren}
      </Box>
    </Box>
  );
}

BaseLayout.propTypes = {};

export default BaseLayout;

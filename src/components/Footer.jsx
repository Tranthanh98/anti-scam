import React from "react";
import PropTypes from "prop-types";
import { Box, Grid, makeStyles, useTheme } from "@material-ui/core";
import logo from "../assets/images/logo-primary.png";
import logoText from "../assets/images/antiscam.png";
import route from "../pages/route";
import { useHistory } from "react-router";
import EmailIcon from "@material-ui/icons/Email";
import FacebookIcon from "@material-ui/icons/Facebook";

const useStyles = makeStyles((theme) => ({
  itemMenu: {
    cursor: "pointer",
    marginBottom: "2px",
    textDecoration: "none",
    "&:hover": {
      borderBottom: "2px solid gray",
      color: theme.palette.secondary.main,
    },
  },
}));
function Footer(props) {
  const classes = useStyles();
  return (
    <Box margin="20px">
      <Box display="flex" justifyContent="center">
        <Box width="90px" component="a" href="/">
          <img src={logo} alt="Anti Scam VN" style={{ maxWidth: "100%" }} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box width="150px" component="a" href="/">
          <img src={logoText} alt="Anti Scam VN" style={{ maxWidth: "100%" }} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box
          margin="0 8px"
          style={{ cursor: "pointer", color: "#13528a" }}
          component="a"
          href="https://www.facebook.com/baocaoluadao/"
          target="_blank"
        >
          <FacebookIcon />
        </Box>
        <Box
          margin="0 8px"
          style={{ cursor: "pointer", color: "#c2211e" }}
          component="a"
          href="https://mail.google.com/mail/?view=cm&fs=1&to=antiscam.contact@gmail.com"
          target="_blank"
        >
          <EmailIcon />
        </Box>
      </Box>
      <Box margin="8px 0" display="block" justifyContent="center">
        {route.map((rou, index) => {
          if (rou.isShow) {
            return (
              <Box
                key={index}
                color="primary.main"
                component="a"
                padding="0 12px"
                borderRight={
                  index !== route.length - 1 ? "1px solid gray" : undefined
                }
                className={classes.itemMenu}
                href={rou.path}
                display="inline-block"
              >
                {rou.title}
              </Box>
            );
          } else {
            return undefined;
          }
        })}
      </Box>
    </Box>
  );
}

Footer.propTypes = {};

export default Footer;

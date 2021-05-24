import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectMenuAct } from "../../actions/select-menu";
import logoText from "../../assets/images/antiscam.png";
import logo from "../../assets/images/logo-primary.png";
import route from "../../pages/route";
import SelectLanguage from "../SelectLanguage";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { addAlert } from "../../actions/alertify.action";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const drawerWidth = 240;

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // height: 200
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1.5),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  selected: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.selected,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  toolbarAlign: {
    alignItems: "start",
  },
  toolbarGutter: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  toobarRegular: {
    height: "inherit",
    minHeight: "inherit",
  },
  boxShadowHeader: {
    boxShadow:
      "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    position: "fixed",
    zIndex: 9,
    backgroundColor: theme.palette.primary.dark,
    // width:"100%",
    display: "flex",
    alignItems: "center",
  },
  logoAntiScam: {
    width: "50px",
    height: "50px",
  },
}));

function MenuMobile(props) {
  const classes = useStyle();
  const [open, setOpen] = useState(!props.isMobile);
  const _handleDrawerOpen = () => {
    setOpen(true);
  };

  const _handleDrawerClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const _goTo = (menu) => {
    dispatch(selectMenuAct(menu));
    history.push(menu.path);
    _handleDrawerClose();
  };

  const _logout = () => {
    dispatch({ type: "LOGOUT" });
    _handleDrawerClose();
    dispatch(addAlert("Đã đăng xuất", "success"));
  };
  const menuSelected = useSelector((state) => state.selectMenu);
  const user = useSelector((state) => state.loginReducer);

  const theme = useTheme();
  return (
    <Box
      className={classes.boxShadowHeader}
      position="fixed"
      width="100%"
      height="56px"
    >
      <Box
        padding="0 12px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <MenuIcon style={{ color: "white" }} onClick={_handleDrawerOpen} />
        <img onClick={() => history.push("/")} src={logoText} height="20px" />
        <SelectLanguage />
      </Box>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        style={{ marginLeft: -50 }}
        onClose={_handleDrawerClose}
      >
        <Box display="flex" className={classes.drawerHeader}>
          <Box
            display="flex"
            onClick={() => {
              _handleDrawerClose();
              history.push("/");
            }}
          >
            <Avatar
              src={logo}
              variant="square"
              alt="AntiScam"
              className={classes.logoAntiScam}
            />
            {/* <img src={logo} width="50px" height="auto" /> */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginLeft="8px"
            >
              <img src={logoText} height="17px" />
            </Box>
          </Box>
          <IconButton onClick={_handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Box>
        <Divider />
        <List>
          {route.map((menu, index) => {
            if (menu.isShow) {
              return (
                <ListItem
                  className={
                    menuSelected.id == menu.id ? classes.selected : null
                  }
                  onClick={() => _goTo(menu)}
                  button
                  key={menu.path}
                >
                  <Box marginRight="16px">{menu.icon}</Box>
                  <ListItemText primary={menu.title} />
                </ListItem>
              );
            } else return undefined;
          })}
          <Divider />
          {user.data?.isAuth ? (
            <ListItem onClick={_logout} button>
              <Box marginRight="16px">
                <ExitToAppIcon />
              </Box>
              <ListItemText primary="Đăng xuất" />
            </ListItem>
          ) : (
            <>
              <ListItem onClick={() => history.push("/login")} button>
                <Box marginRight="16px">
                  <LockOpenIcon />
                </Box>
                <ListItemText primary="Đăng nhập" />
              </ListItem>
              <ListItem onClick={() => history.push("/sign-up")} button>
                <Box marginRight="16px">
                  <VpnKeyIcon />
                </Box>
                <ListItemText primary="Đăng ký" />
              </ListItem>
            </>
          )}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}

MenuMobile.propTypes = {};

export default MenuMobile;

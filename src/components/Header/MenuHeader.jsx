import { Box, InputBase } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectMenuAct } from "../../actions/select-menu";
import logoText from "../../assets/images/antiscam.png";
import logo from "../../assets/images/logo-primary.png";
import route from "../../pages/route";
import SelectLanguage from "../SelectLanguage";
import SearchIcon from "@material-ui/icons/Search";
import SearchComponent from "./SearchComponent";
import debounce from "lodash.debounce";
import * as httpClient from "../../general/HttpClient";
import { useRef } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    padding: theme.spacing(1.5),
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.background,
    },
  },
  boxShadowMenu: {
    boxShadow:
      "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    position: "fixed",
    zIndex: 9,
    backgroundColor: theme.palette.primary.dark,
    width: "100%",
  },
  selected: {
    color: theme.palette.secondary.selected,
    borderBottomColor: theme.palette.secondary.selected,
    borderBottomStyle: "solid",
    borderBottomWidth: theme.spacing(0.5),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "40% !important",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    height: "38px",
    marginTop: "6px",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "90%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  logoIcon: {
    cursor: "pointer",
  },
}));

export default function MenuHeader() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [listPosts, setListPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const refSearch = useRef();

  const dispatch = useDispatch();
  const history = useHistory();
  const _goTo = (menu) => {
    dispatch(selectMenuAct(menu));
    history.push(menu.path);
  };

  const _handleOnCloseSearch = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    document.addEventListener("click", _handleOnCloseSearch);
    return () => {
      document.removeEventListener("click", _handleOnCloseSearch);
    };
  }, []);

  const _logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const menuSelected = useSelector((state) => state.selectMenu);
  const user = useSelector((state) => state.loginReducer);

  const _getData = async (searchValue) => {
    if (searchValue && searchValue.length > 0) {
      setAnchorEl(refSearch.current);
      setIsLoading(true);
      try {
        let res = await httpClient.sendGet("/post/search/" + searchValue);
        if (res.data.isSuccess) {
          setListPosts(res.data.data);
        }
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    }
  };

  const _debounceGetData = useCallback(
    debounce((nextValue) => _getData(nextValue), 800),
    []
  );

  const _handleOnChange = (e) => {
    const { value } = e.target;
    setSearchText(value);
    if (value.length >= 3) {
      _debounceGetData(value);
    }
  };
  return (
    <div className={classes.boxShadowMenu}>
      <Box
        display="flex"
        padding="8px 8px 0 8px"
        justifyContent="space-between"
      >
        <Box
          display="flex"
          alignItems="center"
          className={classes.logoIcon}
          onClick={() => history.push("/")}
        >
          <img src={logo} height="25px" style={{ margin: "0 8px 0 0" }} />
          <img src={logoText} height="20px" />
        </Box>
        <SelectLanguage />
      </Box>
      <Box display="flex" justifyContent="flex-end" width="100%" height="50px">
        <Box display="flex" justifyContent="space-between" width="100%">
          <div className={classes.search} ref={refSearch}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Tìm kiếm (ít nhất 3 ký tự)"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={searchText}
              onChange={_handleOnChange}
            />
            <SearchComponent
              anchorEl={anchorEl}
              handleClose={_handleOnCloseSearch}
              listPosts={listPosts}
              isLoading={isLoading}
            />
          </div>
          <Box
            display="flex"
            justifyContent="flex-end"
            width="100%"
            height="50px"
          >
            {route.map((menu, index) => {
              if (menu.isShow) {
                return (
                  <Box
                    key={index}
                    onClick={() => _goTo(menu)}
                    className={clsx(classes.title, {
                      [classes.selected]: menuSelected.id === menu.id,
                    })}
                  >
                    {menu.title}
                  </Box>
                );
              }
            })}
            <Box borderRight="1px solid grey"></Box>
            {user.data?.isAuth ? (
              <Box onClick={_logout} className={classes.title}>
                Đăng xuất
                <Box width="8px"></Box>
                <ExitToAppIcon />
              </Box>
            ) : (
              <>
                <Box
                  onClick={() => history.push("/login")}
                  className={classes.title}
                >
                  Đăng nhập
                </Box>
                <Box
                  onClick={() => history.push("/sign-up")}
                  className={classes.title}
                >
                  Đăng ký
                </Box>
              </>
            )}
            <Box marginLeft="48px"></Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

import {
  FormControl,
  Hidden,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useLastLocation } from "react-router-last-location";
import * as yup from "yup";
import { addAlert } from "../../actions/alertify.action";
import { loginAct } from "../../actions/login.action";
import antiscamText from "../../assets/images/antiscam.png";
import logoAntiscam from "../../assets/images/logo-primary.png";
import { useInputText } from "../../general/CustomHook";
import { Paths } from "../route";
import firebase from "firebase/app";

// These imports load individual services into the firebase namespace.
import "firebase/auth";
import { signIdData } from "../../actions/signin.action";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Anti Scam VietNam
      </Link>{" "}
      {2021}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    width: "100%",
    maxHeight: "100vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginPage() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const userName = useInputText(
    "",
    yup.string().required("Trường này là bắt buộc")
  );
  const password = useInputText(
    "",
    yup.string().required("Trường này là bắt buộc")
  );

  const history = useHistory();
  const dispatch = useDispatch();

  const lastHistory = useLastLocation();
  const _gotoBack = () => {
    console.log("lastHistory:", lastHistory);
    if (
      lastHistory == null ||
      lastHistory.pathname === "/sign-in" ||
      lastHistory.pathname === Paths.resetPassword
    ) {
      history.push("/");
    } else {
      history.goBack();
    }
  };

  const _login = () => {
    if (userName.value.length == 0 || !!password.value.length == 0) {
      dispatch(addAlert("Nhập đầy đủ email và password", "error"));
    } else {
      dispatch(loginAct(userName.value, password.value, _gotoBack));
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginFacebook = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const data = {
          token: result.credential.accessToken,
          user: {
            userName: result.additionalUserInfo?.profile?.name,
            joinedDate: new Date(),
            email: result.additionalUserInfo?.profile?.email,
            isAuth: true,
            totalPosts: 0,
            imageAvatar: result.additionalUserInfo?.profile?.picture.data.url,
          },
        };
        dispatch(signIdData(data));
        _gotoBack();
      })
      .catch((e) => dispatch(addAlert("Có lỗi xảy ra khi đăng nhập", "error")));
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} style={{ maxHeight: "100vh" }}>
        <Hidden smDown>
          <Box
            width="100%"
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box maxHeight="500px" maxWidth="80%">
              <img
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                src={logoAntiscam}
                alt="antiscam vietnam"
              />
            </Box>
            <Box maxHeight="250px" maxWidth="80%">
              <img
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                src={antiscamText}
                alt="antiscam vietnam"
              />
            </Box>
          </Box>
        </Hidden>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <div className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Địa chỉ email"
              autoComplete="email"
              autoFocus
              {...userName}
            />
            {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Mật khẩu"
              type="password"
              autoComplete="current-password"
              {...password}
            /> */}
            <FormControl
              style={{ marginTop: "12px" }}
              variant="outlined"
              fullWidth
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Mật khẩu
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                {...password}
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={_login}
            >
              Đăng nhập
            </Button>
            <Grid container spacing={2}>
              <Grid item xs={12} sm>
                <Link href={Paths.resetPassword} variant="body2">
                  Quên mật khẩu?
                </Link>
              </Grid>
              <Grid item xs={12} sm>
                <Link href="/sign-up" variant="body2">
                  {"Bạn chưa có tài khoản? Đăng ký."}
                </Link>
              </Grid>
            </Grid>
            {/* <Box
              margin="16px 0"
              display="flex"
              justifyContent="center"
              width="100%"
            >
              <Button color="primary" onClick={loginFacebook}>
                Đăng nhập với Facebook
              </Button>
            </Box> */}
            <Box
              margin="16px 0"
              display="flex"
              justifyContent="center"
              width="100%"
            >
              <Button color="secondary" onClick={() => history.push("/")}>
                Về trang chủ
              </Button>
            </Box>
            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

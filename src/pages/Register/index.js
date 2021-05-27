import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import * as yup from "yup";
import { addAlert } from "../../actions/alertify.action";
import { loadingAct } from "../../actions/loading.action";
import { sleep } from "../../general/helper";

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
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = yup.object({
  email: yup.string().email("Email không hợp lệ").required("Bắc buộc"),
  password: yup.string().required("Bắt buộc").min(6, "ít nhất 6 ký tự"),
  userName: yup.string(),
});

export default function RegisterPage() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();
  const _onSignUp = async () => {
    dispatch(loadingAct(true));
    try {
      await sleep(1500);
      dispatch(addAlert("Đăng ký thành công", "success"));
      history.push("/login");
    } catch (e) {
      dispatch(addAlert(String(e), "error"));
    } finally {
      dispatch(loadingAct(false));
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      userName: "Ẩn danh",
    },
    validationSchema: validationSchema,
    onSubmit: _onSignUp,
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng ký tài khoản
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Địa chỉ email"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                error={Boolean(formik.errors.email)}
                helperText={formik.errors.email}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                error={Boolean(formik.errors.password)}
                helperText={formik.errors.password}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="Tên người dùng"
                placeholder="Bạn không nên đặt tên thật"
                autoFocus
                value={formik.values.userName}
                error={Boolean(formik.errors.userName)}
                helperText={formik.errors.userName}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Đăng ký
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Bạn đã có tài khoản? Đăng nhập
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

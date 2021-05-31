import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import TextFromField from "../../components/TextFromField";
import { useInputText } from "../../general/CustomHook";
import * as yup from "yup";
import { useFormik } from "formik";
import theme from "../theme";
import { useHistory } from "react-router";
import * as httpClient from "../../general/HttpClient";
import { useDispatch } from "react-redux";
import { addAlert } from "../../actions/alertify.action";
import { loadingAct } from "../../actions/loading.action";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
const validateSchema = yup.object({
  email: yup.string().email().required("Bắt buộc"),
});

function ResetPassword(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const _handleValidate = async () => {
    dispatch(loadingAct(true));
    try {
      let response = await httpClient.sendPost("/user/ResetPassword", {
        email: String(formik.values.email),
      });
      if (response.data.isSuccess) {
        history.push("/login");
      } else {
        throw new Error(response.data.messages);
      }
    } catch (e) {
      dispatch(addAlert(String(e), "error"));
    } finally {
      dispatch(loadingAct(false));
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validateSchema,
    onSubmit: _handleValidate,
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <form onSubmit={formik.handleSubmit}>
          <Card>
            <CardHeader title="Nhập email yêu cầu lấy lại mật khẩu" />
            <CardContent>
              <Box padding="12px">
                <TextFromField
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.email)}
                  helperText={formik.errors.email}
                  variant="outlined"
                  fullWidth
                  placeholder="Nhập email"
                  label="Email"
                />
              </Box>
            </CardContent>
            <CardActions>
              <Box
                display="flex"
                justifyContent="space-between"
                style={{ width: "100%", padding: "12px" }}
              >
                <Button
                  variant="contained"
                  onClick={() => history.goBack()}
                  color="inherit"
                >
                  Trở về
                </Button>
                <Button variant="contained" type="submit" color="primary">
                  Gửi yêu cầu
                </Button>
              </Box>
            </CardActions>
          </Card>
        </form>
      </Box>
    </ThemeProvider>
  );
}

ResetPassword.propTypes = {};

export default ResetPassword;

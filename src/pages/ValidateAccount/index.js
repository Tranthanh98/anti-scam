import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
const validateSchema = yup.object({
  validateCode: yup.number("Mã xác thực chỉ chứa số").required("Bắt buộc"),
});

function ValidateAccount(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const _handleValidate = async () => {
    let response = await httpClient.sendPost("/user/validateAccount", {
      validateCode: String(validateCode),
    });
    if (response.data.isSuccess) {
      history.push("/");
    } else {
      dispatch(addAlert(response.data.messages, "error"));
    }
  };
  const formik = useFormik({
    initialValues: {
      validateCode: "",
    },
    validationSchema: validateSchema,
    onSubmit: _handleValidate,
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Box fontWeight="bold">
            Nhập mã xác thực mà chúng tôi đã gửi qua email cho bạn:
          </Box>
          <Box>
            <form onSubmit={formik.handleSubmit}>
              <Box margin="12px">
                <TextFromField
                  name="validateCode"
                  value={formik.values}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.validateCode)}
                  helperText={formik.errors.validateCode}
                />
              </Box>
              <Box>
                <Box>
                  <Button onClick={() => history.push("/")} color="inherit">
                    Để sau
                  </Button>
                  <Button type="submit" color="primary">
                    Xác thực
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </div>
      </Container>
    </ThemeProvider>
  );
}

ValidateAccount.propTypes = {};

export default ValidateAccount;

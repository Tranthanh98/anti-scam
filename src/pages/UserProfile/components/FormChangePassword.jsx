import { Box } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { addAlert } from "../../../actions/alertify.action";
import ButtonCommon from "../../../components/ButtonCommon";
import TextFromField from "../../../components/TextFromField";
import * as httpClient from "../../../general/HttpClient";

const validationSchema = yup.object({
  oldPassword: yup.string().required("Không được để trống"),
  newPassword: yup
    .string()
    .required("Không được để trống")
    .min(6, "ít nhất 6 ký tự"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Nhập lại không khớp"),
});

const FormChangePassword = React.memo((props) => {
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: _onSubmitChangePw,
  });

  const dispatch = useDispatch();
  async function _onSubmitChangePw() {
    try {
      let res = await httpClient.sendPost(
        "/user/ChangePassword",
        formik.values
      );
      if (res.data.isSuccess) {
        props.callbackOnSave && props.callbackOnSave();
        dispatch(addAlert("Thay đổi mật khẩu thành công", "success"));
      } else {
        throw new Error(res.data.messages);
      }
    } catch (e) {
      dispatch(addAlert(String(e), "error"));
    }
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box margin="8px 0">Nhập mật khẩu cũ:</Box>
      <Box margin="8px 0">
        <TextFromField
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
          name="oldPassword"
          variant="outlined"
          fullWidth
          error={Boolean(formik.errors.oldPassword)}
          helperText={formik.errors.oldPassword}
        />
      </Box>
      <Box margin="8px 0">Mật khẩu mới:</Box>
      <Box margin="8px 0">
        <TextFromField
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          name="newPassword"
          variant="outlined"
          fullWidth
          error={Boolean(formik.errors.newPassword)}
          helperText={formik.errors.newPassword}
        />
      </Box>
      <Box margin="8px 0">Nhập lại:</Box>
      <Box margin="8px 0">
        <TextFromField
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          name="confirmPassword"
          variant="outlined"
          fullWidth
          error={Boolean(formik.errors.confirmPassword)}
          helperText={formik.errors.confirmPassword}
        />
      </Box>
      <Box margin="8px 0" type="submit">
        <ButtonCommon type="submit">Lưu</ButtonCommon>
      </Box>
    </form>
  );
});

FormChangePassword.propTypes = {};

export default FormChangePassword;

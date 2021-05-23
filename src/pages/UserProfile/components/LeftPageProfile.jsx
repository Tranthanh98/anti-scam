import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { addAlert } from "../../../actions/alertify.action";
import { loadingAct } from "../../../actions/loading.action";
import ButtonCommon from "../../../components/ButtonCommon";
import TextFromField from "../../../components/TextFromField";
import { useInputText } from "../../../general/CustomHook";
import { sleep } from "../../../general/helper";
import SummaryProfile from "../../HomePage/components/SummaryProfile";
import FormChangePassword from "./FormChangePassword";

const useStyles = makeStyles((theme) => ({
  cardContentCss: {
    textAlign: "start",
  },
}));

function LeftPageProfile(props) {
  const isModbile = window.mobileCheck();
  const userData = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const user = userData.data;

  const [isEditing, setIsEditing] = useState(false);
  const [totalPost, setTotalPost] = useState(0);
  const [openChangePw, setOpenChangePw] = useState(false);

  const userName = useInputText(
    user?.userName,
    yup.string().required("Không được để trống")
  );

  const classes = useStyles();
  const _onEdit = () => {
    setIsEditing(true);
  };
  const _onSave = async () => {
    if (!userName.value || userName.value.length === 0) {
      dispatch(addAlert("Tên người dùng không được để trống", "error"));
      return;
    }
    dispatch(loadingAct(true));
    try {
      await sleep(1000);
      setIsEditing(false);
      dispatch(addAlert("Cập nhật thông tin thành công", "success"));
    } catch (e) {
      dispatch(addAlert(String(e), "error"));
    } finally {
      dispatch(loadingAct(false));
    }
  };

  const _getTotalAmountPost = async () => {
    await sleep(300);
    setTotalPost(3);
  };
  useEffect(() => {
    _getTotalAmountPost();
  }, []);
  return (
    <Box>
      {userData?.data?.isAuth ? (
        <>
          <Card>
            <CardHeader
              title={user.userName}
              titleTypographyProps={{ color: "primary" }}
            />
            <CardContent className={classes.cardContentCss}>
              <Box fontWeight="bold">Thông tin người dùng:</Box>
              <Box fontStyle="italic" fontSize="14px">
                (Thông tin của bạn được bảo mật tuyệt đối)
              </Box>
              <Divider />
              <Box marginTop={1}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    Email:
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextFromField
                      disabled={true}
                      variant="outlined"
                      fullWidth
                      value={user.email}
                    />
                  </Grid>
                </Grid>
                <Box margin="8px 0">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      Tên người dùng:
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <TextFromField
                        disabled={!isEditing}
                        variant="outlined"
                        fullWidth
                        {...userName}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Box margin="8px 0">
                {isEditing ? (
                  <ButtonCommon onClick={_onSave}>Lưu</ButtonCommon>
                ) : (
                  <ButtonCommon color="inherit" onClick={_onEdit}>
                    Chỉnh sửa
                  </ButtonCommon>
                )}
              </Box>
              <Divider />
              <Box marginTop={1} display="flex">
                Số lượng bài báo cáo: {totalPost}
              </Box>
            </CardContent>
          </Card>
          {isModbile ? (
            <Box marginTop={1}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <SummaryProfile />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardContent className={classes.cardContentCss}>
                      <Box
                        margin="16px 0"
                        onClick={() => setOpenChangePw(!openChangePw)}
                      >
                        Đổi mật khẩu ?
                      </Box>
                      {openChangePw ? (
                        <FormChangePassword
                          callbackOnSave={() => setOpenChangePw(false)}
                        />
                      ) : null}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          ) : null}
        </>
      ) : (
        <Card>
          <CardContent>Bạn chưa đăng nhập</CardContent>
        </Card>
      )}
    </Box>
  );
}

LeftPageProfile.propTypes = {};

export default LeftPageProfile;

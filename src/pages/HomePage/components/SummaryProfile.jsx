import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { formateDateTime } from "../../../general/helper";
import { Paths } from "../../route";
import * as httpClient from "../../../general/HttpClient";
import { addAlert } from "../../../actions/alertify.action";
import { UPDATE_USER } from "../../../actions/login.action";

const useStyles = makeStyles((theme) => ({
  userName: {
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.error.main,
    },
  },
  viewProfile: {
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.error.main,
    },
  },
}));

const SummaryProfile = React.memo(({ isCallApi }) => {
  const classes = useStyles();
  const userData = useSelector((state) => state.loginReducer);
  const [userProfile, setUserProfile] = useState(null);

  const user = userData.data;
  const history = useHistory();
  const dispatch = useDispatch();

  const _getData = async () => {
    try {
      let res = await httpClient.sendGet("/user/detail");
      if (res.data.isSuccess) {
        setUserProfile(res.data.data);
        dispatch({
          type: UPDATE_USER,
          payload: {
            totalPosts: res.data.data?.totalPosts,
          },
        });
      } else {
        throw new Error(res.data.messages);
      }
    } catch (e) {
      dispatch(addAlert(String(e), "error"));
    }
  };

  useEffect(() => {
    _getData();
  }, []);
  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="center">
          <Avatar
            alt={userProfile?.userName ?? user.userName}
            src={user.imageAvatar}
          />
        </Box>
        <Box
          margin="8px 0"
          // fontWeight="bold"
          color="primary.main"
          cursor="pointer"
          display="flex"
          justifyContent="center"
          className={classes.userName}
        >
          {userProfile?.userName ?? user.userName}
        </Box>
        <Box
          margin="8px 0"
          display="flex"
          justifyContent="flex-start"
          className={classes.userName}
        >
          Email:{" "}
          <Box
            marginLeft="4px"
            fontWeight="bold"
            color="error.main"
            style={{ wordBreak: "break-all" }}
          >
            {userProfile?.email ?? user.email}
          </Box>
        </Box>
        <Box
          margin="8px 0"
          display="flex"
          justifyContent="flex-start"
          className={classes.userName}
          fontStyle="italic"
        >
          Ngày tham gia: {formateDateTime(user.joinedDate)}
        </Box>
        <Box
          margin="8px 0"
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          className={classes.userName}
        >
          Số lượng bài viết:
          <Box
            marginLeft="8px"
            fontWeight="bold"
            fontSize="20px"
            color="success.main"
          >
            {userProfile?.totalPosts ?? user.totalPosts}
          </Box>
        </Box>
        <Box
          margin="8px 0"
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={classes.userName}
          onClick={() => history.push(Paths.profile)}
        >
          <Chip
            label="View your profile"
            variant="outlined"
            color="primary"
            className={classes.viewProfile}
          />
        </Box>
      </CardContent>
    </Card>
  );
});

SummaryProfile.propTypes = {};

export default SummaryProfile;

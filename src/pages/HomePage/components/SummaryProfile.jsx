import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  makeStyles,
} from "@material-ui/core";
import { formateDateTime } from "../../../general/helper";
import { useSelector } from "react-redux";

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

const userProfile = {
  userName: "Bạn xinh đẹp",
  email: "hk@gmail.com",
  joinedDate: new Date(),
  totalPosts: 12,
  imageLink: "/file/getFileById/1",
};
function SummaryProfile(props) {
  const classes = useStyles();
  const userData = useSelector((state) => state.loginReducer);

  const user = userData.data;
  console.log("user:", user);
  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="center">
          <Avatar alt={userProfile.userName} src={userProfile.imageLink} />
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
          {user.userName}
        </Box>
        <Box
          margin="8px 0"
          display="flex"
          justifyContent="flex-start"
          className={classes.userName}
        >
          Email:{" "}
          <Box marginLeft="4px" fontWeight="bold" color="error.main">
            {user.email}
          </Box>
        </Box>
        <Box
          margin="8px 0"
          display="flex"
          justifyContent="flex-start"
          className={classes.userName}
          fontStyle="italic"
        >
          Ngày tham gia: {formateDateTime(userProfile.joinedDate)}
        </Box>
        <Box
          margin="8px 0"
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          className={classes.userName}
        >
          Số lượng bài viết:{" "}
          <Box fontWeight="bold" fontSize="25px" color="success.main">
            {user.totalPosts}
          </Box>
        </Box>
        <Box
          margin="8px 0"
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={classes.userName}
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
}

SummaryProfile.propTypes = {};

export default SummaryProfile;

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { formateDateTime } from "../../../general/helper";
import { Paths } from "../../route";

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

const SummaryProfile = React.memo((props) => {
  const classes = useStyles();
  const userData = useSelector((state) => state.loginReducer);

  const user = userData.data;
  const history = useHistory();
  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="center">
          <Avatar alt={user.userName} src={user.imageAvatar} />
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
          Ngày tham gia: {formateDateTime(user.joinedDate)}
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

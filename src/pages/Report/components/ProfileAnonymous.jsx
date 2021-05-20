import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  login: {
    cursor: "pointer",
    marginRight: theme.spacing(1),
    "&:hover": {
      color: theme.palette.error.main,
      backgroundColor: theme.palette.primary.backgroundBody,
    },
  },
  signIn: {
    cursor: "pointer",
    marginLeft: theme.spacing(1),
    color: theme.palette.error.main,
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.backgroundBody,
    },
  },
}));

function ProfileAnonymous(props) {
  const classes = useStyles();
  const history = useHistory();
  const _gotoLogin = () => {
    history.push("/login");
  };
  const _gotoSignIn = () => {
    history.push("/sign-up");
  };
  return (
    <Box>
      <Card>
        <CardHeader title="Bạn chưa đăng nhập" />
        <CardContent>
          <Box marginBottom="8px">Kết nối với chúng tôi</Box>
          <Box>
            <Chip
              label="Đăng nhập"
              variant="outlined"
              color="primary"
              className={classes.login}
              onClick={_gotoLogin}
            />
            <Chip
              label="Đăng ký"
              variant="outlined"
              //   color="error"
              className={classes.signIn}
              onClick={_gotoSignIn}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

ProfileAnonymous.propTypes = {};

export default ProfileAnonymous;

import { Box, Card, CardContent, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SummaryProfile from "../../HomePage/components/SummaryProfile";
import ProfileAnonymous from "../../Report/components/ProfileAnonymous";
import FormChangePassword from "./FormChangePassword";

const useStyles = makeStyles((theme) => ({
  cardChangePw: {
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.error.main,
    },
  },
  cardContentCss: {
    textAlign: "start",
  },
}));

function RightPageProfile(props) {
  const [openChangePw, setOpenChangePw] = useState(false);
  const classes = useStyles();

  const userData = useSelector((state) => state.loginReducer);
  return (
    <Box>
      {userData?.data?.isAuth ? (
        <>
          <SummaryProfile />
          <Box margin="8px 0">
            <Card>
              <CardContent className={classes.cardContentCss}>
                <Box
                  onClick={() => setOpenChangePw(!openChangePw)}
                  color="primary.main"
                  className={classes.cardChangePw}
                  textAlign="center"
                >
                  Đổi mật khẩu?
                </Box>
                {openChangePw ? (
                  <FormChangePassword
                    callbackOnSave={() => setOpenChangePw(false)}
                  />
                ) : null}
              </CardContent>
            </Card>
          </Box>
        </>
      ) : (
        <ProfileAnonymous />
      )}
    </Box>
  );
}

RightPageProfile.propTypes = {};

export default RightPageProfile;

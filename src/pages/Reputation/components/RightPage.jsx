import { Box } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import HighLightReputation from "../../HomePage/components/HighLightReputation";
import SummaryProfile from "../../HomePage/components/SummaryProfile";
import ProfileAnonymous from "../../Report/components/ProfileAnonymous";

function RightPage(props) {
  const user = useSelector((state) => state.loginReducer);

  return (
    <>
      {user?.data?.isAuth ? <SummaryProfile /> : <ProfileAnonymous />}
      <Box margin="8px 0">
        <HighLightReputation />
      </Box>
    </>
  );
}

RightPage.propTypes = {};

export default RightPage;

import React from "react";
import PropTypes from "prop-types";
import SummaryProfile from "../../HomePage/components/SummaryProfile";
import ProfileAnonymous from "../../Report/components/ProfileAnonymous";
import HighLightReputation from "../../HomePage/components/HighLightReputation";
import { Box } from "@material-ui/core";

function RightPage(props) {
  return (
    <>
      {true ? <SummaryProfile /> : <ProfileAnonymous />}
      <Box margin="8px 0">
        <HighLightReputation />
      </Box>
    </>
  );
}

RightPage.propTypes = {};

export default RightPage;

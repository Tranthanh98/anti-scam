import { Box } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { connectToContext } from "../../../components/BaseContext";
import HighLightReputation from "../../HomePage/components/HighLightReputation";
import SummaryProfile from "../../HomePage/components/SummaryProfile";
import ProfileAnonymous from "../../Report/components/ProfileAnonymous";

function RightPage({ newestPost }) {
  const user = useSelector((state) => state.loginReducer);

  return (
    <>
      {user?.data?.isAuth ? <SummaryProfile /> : <ProfileAnonymous />}
      <Box margin="8px 0">
        <HighLightReputation
          highlightPost={newestPost}
          titleName="Báo cáo lừa đảo gần đây"
        />
      </Box>
    </>
  );
}

RightPage.propTypes = {};

const mapStateToProps = ({ newestPost }) => ({
  newestPost,
});

export default connectToContext(mapStateToProps)(RightPage);

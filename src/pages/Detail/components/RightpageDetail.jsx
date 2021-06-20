import { Box, Card, CardContent, Icon, useTheme } from "@material-ui/core";
import ReportIcon from "@material-ui/icons/Report";
import VisibilityIcon from "@material-ui/icons/Visibility";
import React from "react";
import { connectToContext } from "../../../components/BaseContext";
import { KIND_OF } from "../../../general/enum";
import { formateDateTime } from "../../../general/helper";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

function RightpageDetail(props) {
  const { writer, reviewNumber, createdDate, kindOf } = props.post;
  const theme = useTheme();
  return (
    <Box>
      <Card>
        <CardContent>
          <Box fontSize="20px" display="flex" justifyContent="center">
            {kindOf === KIND_OF.Reputation ? (
              <>
                <Icon style={{ color: theme.palette.success.main }}>
                  verified_user
                </Icon>
                <Box fontWeight="bold" color="success.main" margin="0 0 0 8px">
                  UY TÍN
                </Box>
              </>
            ) : (
              <>
                <ReportIcon color="error" />
                <Box fontWeight="bold" color="error.main" margin="0 0 0 8px">
                  CÓ THỂ LỪA ĐẢO
                </Box>
              </>
            )}
          </Box>
          <Box
            display="flex"
            alignItems="center"
            textAlign="start"
            margin="8px 0"
          >
            <Icon style={{ marginRight: "8px" }}>person</Icon>
            <Box color="primary.dark" marginLeft="4px">
              {writer}
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            textAlign="start"
            margin="8px 0"
            fontStyle="italic"
            fontSize="14px"
          >
            <CalendarTodayIcon style={{ marginRight: "8px" }} />
            {formateDateTime(createdDate, "DD/MM/YYYY HH:mm A")}
          </Box>
          <Box
            textAlign="start"
            display="flex"
            margin="8px 0"
            alignItems="center"
          >
            <VisibilityIcon style={{ marginRight: "8px" }} />
            <Box marginLeft="4px" color="warning.main">
              {reviewNumber}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

RightpageDetail.propTypes = {};

const mapStateToProps = (context) => ({
  post: context.post,
});

export default connectToContext(mapStateToProps)(RightpageDetail);

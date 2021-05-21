import React from "react";
import PropTypes from "prop-types";
import { Box, Card, CardContent } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { formateDateTime } from "../../../general/helper";
import { connectToContext } from "../../../components/BaseContext";

function RightpageDetail(props) {
  const { writer, reviewNumber, createdDate } = props.post;
  return (
    <Box>
      <Card>
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            textAlign="start"
            margin="8px 0"
          >
            Đăng bởi:
            <Box color="primary.dark" marginLeft="4px">
              {writer}
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            textAlign="start"
            margin="8px 0"
          >
            Ngày báo: {formateDateTime(createdDate)}
          </Box>
          <Box
            textAlign="start"
            display="flex"
            margin="8px 0"
            alignItems="center"
          >
            <VisibilityIcon />
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

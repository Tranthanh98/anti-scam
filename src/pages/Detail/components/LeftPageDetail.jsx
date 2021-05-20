import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Card, CardContent, CardHeader } from "@material-ui/core";
import { useHistory, useParams } from "react-router";

const detail = {
  title: "Thằng chó mày lừa bố mày",
  content: "Thằng này lừa em mọi người ạ",
  imageList: [],
};

function LeftPageDetail(props) {
  const history = useHistory();
  const { id, link } = useParams();
  useEffect(() => {
    console.log("link:", link);
    console.log("id:", id);
  });
  return (
    <Box>
      <Card>
        <CardHeader title={detail.title} color="primary.background" />
      </Card>
    </Box>
  );
}

LeftPageDetail.propTypes = {};

export default LeftPageDetail;

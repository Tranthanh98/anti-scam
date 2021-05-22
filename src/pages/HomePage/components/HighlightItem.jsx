import { Box } from "@material-ui/core";
import React from "react";
import { formateDateTime } from "../../../general/helper";

function HighlightItem({ title, path, id, createdDate }) {
  const _goto = (item) => {
    alert("bạn này de thuong ne:" + path);
  };
  return (
    <Box cursor="pointer" onClick={() => _goto(id)} margin="8px 0">
      <Box
        // fontWeight="bold"
        fontSize="20px"
        color="primary.main"
      >
        {title}
      </Box>
      <Box>Ngày viết: {formateDateTime(createdDate)}</Box>
    </Box>
  );
}

HighlightItem.propTypes = {};

export default HighlightItem;

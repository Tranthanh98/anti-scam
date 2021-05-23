import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import createLinkDetail from "../../../general/createLinkDetail";
import { formateDateTime } from "../../../general/helper";

const useStyles = makeStyles((theme) => ({
  item: {
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.error.main,
    },
  },
}));
function HighlightItem({ title, link, id, createdDate }) {
  const history = useHistory();
  const _goto = () => {
    history.push(createLinkDetail(link, id));
  };
  const classes = useStyles();
  return (
    <Box className={classes.item} onClick={_goto} margin="8px 0">
      <Box color="primary.main" className={classes.item}>
        {title}
      </Box>
      <Box fontSize="14px" fontStyle="italic">
        Ngày viết: {formateDateTime(createdDate)}
      </Box>
    </Box>
  );
}

HighlightItem.propTypes = {};

export default HighlightItem;

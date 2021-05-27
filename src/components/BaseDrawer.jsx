import { Box } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawerAct } from "../actions/drawer.action";
import CloseIcon from "@material-ui/icons/Close";
import * as httpClient from "../general/HttpClient";

const drawerWidth = window.innerWidth;

const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    // height:"calc(100vh - 100px)"
  },
});

export default function BaseDrawer() {
  const classes = useStyles();

  const drawerData = useSelector((state) => state.drawerReducer);

  const dispatch = useDispatch();

  const _onClose = (callback) => {
    typeof callback == "function" && callback();
    httpClient.sendGet("/file/DeleteFileUnUsage");
    dispatch(closeDrawerAct());
  };

  const body = drawerData.body ? (
    React.cloneElement(drawerData.body, {
      onClose: _onClose,
      onCancel: _onClose,
      onConfirm: _onClose,
    })
  ) : (
    <div></div>
  );

  return (
    <div>
      <Drawer
        className={classes.drawer}
        // variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
        open={drawerData.isOpen}
        onClose={_onClose}
      >
        <Box padding="16px">
          <Box>
            <CloseIcon
              style={{ cursor: "pointer" }}
              fontSize="large"
              onClick={() => _onClose()}
            />
          </Box>
          <Box
            margin="8px 0"
            fontWeight="bold"
            fontSize="20px"
            textAlign="center"
          >
            {drawerData.title}
          </Box>
          <Box>{body}</Box>
        </Box>
      </Drawer>
    </div>
  );
}

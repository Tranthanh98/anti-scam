import { Box } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawerAct } from '../actions/drawer.action';
import CloseIcon from '@material-ui/icons/Close';

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

  const drawerData = useSelector(state => state.drawerReducer);

  const dispatch = useDispatch();

  const _onClose = (callback) => {
    typeof(callback) == "function" && callback();
    dispatch(closeDrawerAct());
  }

  const body = drawerData.body ? React.cloneElement(drawerData.body, {
    onClose: _onClose,
  }) : <div></div>;

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
        
        <Box width="100%" padding="16px">
          <Box>
            <CloseIcon style={{cursor:"pointer"}} fontSize="large" onClick={()=> _onClose()}/>
          </Box>
          <Box>
            {body}
          </Box>
        </Box>    
      </Drawer>
    </div>
  );
}

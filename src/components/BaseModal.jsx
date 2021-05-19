import { Box, DialogActions, DialogContent, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalAct } from '../actions/modal.action';

const useStytes = makeStyles(theme =>({
  rootModal:{
    minWidth:"350px",
    minHeight:"300px",
    padding:theme.spacing(1)
  }
}))

function BaseModal() {
  const classes = useStytes();
  const modalData = useSelector(state => state.modalReducer);

  const dispatch =  useDispatch();

  const _handleClose = ()=>{
    dispatch(closeModalAct());
  }

  const _onCancel = (callback)=>{
    typeof(callback) == "function" && callback();
    _handleClose();
  }

  const _onConfirm = (callback)=>{
    typeof(callback) == "function" && callback();
    _handleClose();
  }

  const body = modalData.body ? React.cloneElement(modalData.body, {
    onClose : _handleClose,
    onCancel: _onCancel,
    onConfirm : _onConfirm
  }) : <div></div>;

  return (
    <Dialog  
      onClose={_handleClose} 
      {...modalData.style}
      aria-labelledby="simple-dialog-title" 
      open={modalData.isOpen}>
      <DialogTitle id="simple-dialog-title">{modalData.title}</DialogTitle>
      <DialogContent>
        {body}
      </DialogContent>
      <DialogActions>
          <Button onClick={_onCancel} variant="contained" color="inherit">
            Hủy
          </Button>
          <Button onClick={_onConfirm} variant="contained" color="primary">
            Xác nhận
          </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BaseModal;

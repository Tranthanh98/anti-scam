import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme =>({
    rootBreadCrumb: {
        backgroundColor: theme.palette.primary.backgroundBody,
        display: "flex",
        paddingLeft: "20px",
        paddingRight: "20px",
        margin: "5px",
        height:"30px"
    },
    divItems: {
        backgroundColor: "#d8d6d6",
        paddingRight: "2px",
        paddingLeft: "2px",
        fontFamily: "'Quicksand', sans-serif!important",
        cursor: "pointer",
        alignItems: "center",
        display:"flex",
        fontWeight:"500"
    },
    triangle: {
        color: "#d8d6d6",
        borderLeft: "15px solid",
        borderTop: "15px solid transparent",
        borderBottom: "13px solid transparent"
    },
    beforeTriangle: {
        backgroundColor: "#d8d6d6",
        borderLeftWidth: "15px",
        borderLeftStyle:"solid",
        borderLeftColor: "#f3f3f3",
        borderTop: "15px solid #d8d6d6",
        borderBottom: "15px solid #d8d6d6"
    }
}));

function BreadCrumb(props) {
    const classes = useStyles();

    const menuSelected = useSelector(state => state.selectMenu);

    return (
        <div className={classes.rootBreadCrumb}>
            <div className={classes.beforeTriangle}></div>
            <div className={classes.divItems}>
                {menuSelected.title}
            </div>
            <div className={classes.triangle}></div>
        </div>
    )
}
export default BreadCrumb;
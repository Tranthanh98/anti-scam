import { Box } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectMenuAct } from '../../actions/select-menu';
import logoText from '../../assets/images/antiscam.png';
import route from '../../pages/route';
import SelectLanguage from '../SelectLanguage';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: "flex",
        alignItems:"center",
        justifyContent:"center",
        color: "white",
        padding: theme.spacing(1.5),
        cursor: "pointer",
        "&:hover":{
            backgroundColor:theme.palette.primary.light,
            color:theme.palette.primary.background
        }
    },
    boxShadowMenu:{
        boxShadow:"0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
        position:"fixed",
        zIndex:9,
        backgroundColor:theme.palette.primary.dark,
        width:"100%"
    },
    selected:{
        color: theme.palette.secondary.selected
    }
}));

export default function MenuHeader() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const _goTo = (menu) => {
        dispatch(selectMenuAct(menu));
        history.push(menu.path);
    }
    const menuSelected = useSelector(state => state.selectMenu);
    return (
        <div className={classes.boxShadowMenu}>
            <Box display="flex" padding="8px 8px 0 8px" justifyContent="space-between">
                <img src={logoText} height="20px" />
                {/* <Box display="flex" padding="8px 8px 0 8px" alignItems="flex-end">
                    <Box marginRight="4px">Ngôn ngữ</Box>
                    <select
                        value={en.value}
                        onChange={(value) => setEn(value)}
                    >
                        {
                            languages.map(item => {
                                return <option key={item.value}>{item.title}</option>
                            })
                        }
                    </select>
                </Box> */}
                <SelectLanguage/>
            </Box>
            <Box display="flex" justifyContent="flex-end" width="100%" height="50px">
                {
                    route.map((menu, index) => {
                        return (
                            <Box key={index} onClick={()=>_goTo(menu)} className={clsx(classes.title, {
                                [classes.selected] : menuSelected.id === menu.id
                            })}>
                                <Box margin="0 8px">
                                    {menu.icon}
                                </Box>
                                {menu.title}
                            </Box>
                        )
                    })
                }
                <Box marginLeft="48px"></Box>
            </Box>
        </div>
    );
}
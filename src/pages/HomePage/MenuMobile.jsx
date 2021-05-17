import { Box, Drawer, IconButton, makeStyles, Toolbar, useTheme } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectMenuAct } from '../../actions/select-menu';
import logo from '../../assets/images/logo-primary.png';
import route from '../route';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import logoText from '../../assets/images/antiscam.png';



const drawerWidth = 240;

const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        // height: 200
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',

    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1.5),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    selected: {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.selected
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    toolbarAlign: {
        alignItems: "start"
    },
    toolbarGutter: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    toobarRegular: {
        height: "inherit",
        minHeight: "inherit"
    }
}))
function MenuMobile(props) {
    const classes = useStyle();
    const [open, setOpen] = useState(!props.isMobile);
    const _handleDrawerOpen = () => {
        setOpen(true);
    };

    const _handleDrawerClose = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    const history = useHistory();
    const _goTo = (menu) => {
        dispatch(selectMenuAct(menu));
        history.push(menu.path);
        _handleDrawerClose();
    }
    const menuSelected = useSelector(state => state.selectMenu);
    const theme = useTheme();
    const { isMobile } = props.isMobile;
    return (
        <div>
            <Toolbar classes={{
                root: classes.toolbarAlign,
                gutters: classes.toolbarGutter,
                regular: classes.toobarRegular
            }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={_handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
            <Drawer
                className={classes.drawer}
                // variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
                style={{ marginLeft: -50 }}
                onClose={_handleDrawerClose}
            >
                <Box display="flex" className={classes.drawerHeader}>
                    <Box display="flex">
                        <img src={logo} width="50px" height="auto" />
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            marginLeft="8px"
                        >
                            <img src={logoText} height="17px" />
                        </Box>
                    </Box>
                    <IconButton onClick={_handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </Box>
                <Divider />
                <List>
                    {route.map((menu, index) => {
                        if (menu.isShow) {
                            return (
                                <ListItem className={menuSelected.id == menu.id ? classes.selected : null} 
                                    onClick={() => _goTo(menu)} 
                                    button 
                                    key={menu.path}>
                                    <ListItemIcon>{menu.icon}</ListItemIcon>
                                    <ListItemText primary={menu.title} />
                                </ListItem>
                            )
                        }
                        else return undefined;
                    })}
                </List>
                <Divider />
            </Drawer>
        </div>
    )
}

MenuMobile.propTypes = {

}

export default MenuMobile


import { Box, Container, withStyles, withTheme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router';
import { selectMenuAct } from '../../actions/select-menu';
import logo from '../../assets/images/logo-primary.png';
import { selectMenu } from '../../reducers/select-menu';
import route from '../route';

const drawerWidth = 240;

function HomePage(props) {
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
    }
    const menuSelected = useSelector(state => state.selectMenu);
    const { classes, theme } = props;
    return (
        <Box display="flex" height="100vh">
            <Box className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={_handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Persistent drawer
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Box display="flex" className={classes.drawerHeader}>
                        <Box display="flex">
                            <img src={logo} width="90px" height="auto" />
                            <Box
                                fontSize="21px"
                                fontWeight="bold"
                                textTransform="uppercase"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                color="secondary.main"
                            >ANTISCAM</Box>
                        </Box>
                        <IconButton onClick={_handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </Box>
                    <Divider />
                    <List>
                        {route.map((menu, index) => (
                            <ListItem className={menuSelected.id == menu.id ? classes.selected : null} onClick={() => _goTo(menu)} button key={index}>
                                <ListItemIcon>{menu.icon}</ListItemIcon>
                                <ListItemText primary={menu.title} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <Container>
                        <Switch>
                            {
                                route.map((rou, index) => {
                                    return (
                                        <Route
                                            key={index}
                                            path={rou.path}
                                            render={prop => <rou.component {...prop} />}
                                        />
                                    )
                                })
                            }
                        </Switch>
                    </Container>
                </main>
            </Box>
            <Box width="30%">
                Custom here
                </Box>
        </Box>
    )
}
const styles = theme => ({
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
        padding: theme.spacing(3),
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
});

export default withTheme(withStyles(styles)(HomePage));
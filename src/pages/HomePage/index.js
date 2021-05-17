import { Box, Container, makeStyles, useTheme, withStyles, withTheme } from '@material-ui/core';
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
import { Redirect, Route, Switch, useHistory } from 'react-router';
import { selectMenuAct } from '../../actions/select-menu';
import logo from '../../assets/images/logo-primary.png';
import { selectMenu } from '../../reducers/select-menu';
import route from '../route';
import MenuMobile from './MenuMobile';
import logoText from '../../assets/images/antiscam.png';
import backgroundImg from '../../assets/images/it-background.jpg'
import SummaryProfile from './components/SummaryProfile';
import HighLightReputation from './components/HighLightReputation';

const drawerWidth = 240;

const styles = makeStyles(theme => ({
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
        // justifyContent: 'flex-end',

    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1.5),
        // transition: theme.transitions.create('margin', {
        //     easing: theme.transitions.easing.sharp,
        //     duration: theme.transitions.duration.leavingScreen,
        // }),
        // marginLeft: -drawerWidth,
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
    nameMenu:{
        color:theme.palette.primary.background,
    },
    backgroundBody:{
        backgroundColor: "#f1f1f18a"
    }
}));

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
        // _handleDrawerClose();
    }
    const menuSelected = useSelector(state => state.selectMenu);
    const { isMobile } = props;
    const classes = styles();
    const theme = useTheme();
    return (
        <Box className={classes.backgroundBody} display="flex" height="100%" width="100%">
            
            <Box flexDirection={isMobile ? "column" :"row"} className={classes.root} width={isMobile ? "100%" : "75%"}>
                { isMobile ? (
                    <MenuMobile isMobile={isMobile}/>
                    
                ) : (

                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        // style={{marginLeft: isMobile ? -50 : 0}}
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
                                    <img src={logoText} height="20px" />
                                </Box>
                            </Box>
                            {isMobile ? (
                                <IconButton onClick={_handleDrawerClose}>
                                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                </IconButton>
                            ): null}
                        </Box>
                        <Divider />
                        <List>
                            {route.map((menu, index) => {
                                if (menu.isShow) {
                                    return (
                                        <ListItem className={menuSelected.id == menu.id ? classes.selected : null} onClick={() => _goTo(menu)} button key={index}>
                                            <ListItemIcon>{menu.icon}</ListItemIcon>
                                            <Box style={{fontWeight:"bold", }}>{menu.title}</Box>
                                        </ListItem>
                                    )
                                }
                                else return undefined;
                            })}
                        </List>
                        <Divider />
                    </Drawer>
                )}
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: !props.isMobile,
                    })}
                    // className={classes.content}
                >
                    <Container disableGutters>
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
                            <Route path="/">
                                <Redirect to="/report"/>
                            </Route>
                        </Switch>
                    </Container>
                </main>
            </Box>
            <Box padding="20px 0" width="25%" className={clsx(props.isMobile && classes.hide)}>
                <SummaryProfile/>
                <Box margin="8px 0">
                    <HighLightReputation/>
                </Box>
            </Box>
        </Box>
    )
}

// export default withTheme(withStyles(styles)(HomePage));
export default HomePage
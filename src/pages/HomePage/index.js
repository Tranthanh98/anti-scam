import { Box, Container, makeStyles, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useHistory } from 'react-router';
import { selectMenuAct } from '../../actions/select-menu';
import BreadCrumb from '../../components/BreadCrumb';
import MenuHeader from '../../components/Header/MenuHeader';
import MenuMobile from '../../components/Header/MenuMobile';
import route from '../route';
import HighLightReputation from './components/HighLightReputation';
import SummaryProfile from './components/SummaryProfile';

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
    nameMenu: {
        color: theme.palette.primary.background,
    },
    backgroundBody: {
        backgroundColor: theme.palette.primary.backgroundBody
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
        <Box>
            {
                isMobile ? 
                <MenuMobile isMobile={isMobile}/> :
                <MenuHeader />
            }
            <Box height={isMobile ? "50px" : "90px"} ></Box>
            {/* <BreadCrumb/> */}
            <Box className={classes.backgroundBody} display="flex" justifyContent="center" height="100%" width="100%">
                <Box width={isMobile ? "100%" : "70%"}>
                    <main
                        className={clsx(classes.content, {
                            [classes.contentShift]: !props.isMobile,
                        })}
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
                                    <Redirect to="/report" />
                                </Route>
                            </Switch>
                        </Container>
                    </main>
                </Box>
                <Box padding="12px 0" width="25%" className={clsx(props.isMobile && classes.hide)}>
                    <SummaryProfile />
                    <Box margin="8px 0">
                        <HighLightReputation />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

// export default withTheme(withStyles(styles)(HomePage));
export default HomePage
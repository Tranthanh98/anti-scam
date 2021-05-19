import { Box, Container, makeStyles } from '@material-ui/core';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import MenuHeader from '../../components/Header/MenuHeader';
import MenuMobile from '../../components/Header/MenuMobile';
import route from '../route';

const styles = makeStyles(theme => ({
    backgroundBody: {
        backgroundColor: theme.palette.primary.backgroundBody
    }
}));

function HomePage(props) {
    const { isMobile } = props;
    const classes = styles();
    return (
        <Box>
            {
                isMobile ?
                    <MenuMobile isMobile={isMobile} /> :
                    <MenuHeader />
            }
            <Box height={isMobile ? "50px" : "90px"} ></Box>
            <Box className={classes.backgroundBody} display="flex" justifyContent="center" height="100%" width="100%">
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
            </Box>
        </Box>
    )
}

export default HomePage
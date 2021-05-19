import { Box, Card, CardContent, Grid, makeStyles, useTheme } from '@material-ui/core';
import React from 'react';
import { formateDateTime } from '../../../general/helper';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles(theme => ({
    wrapper: {
        margin: "16px 0",
    },
    title: {
        textOverflow: "ellipsis",
        overflow: "hidden",
        minWidth: "100%",
        // height: "30px" ,
        // whiteSpace: "nowrap",
        display: "inline-block",
        textAlign: "start",
        color: theme.palette.primary.background
    },
    cardCss: {
        cursor: "pointer",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        },
    }
}))

function ReportItem(props) {
    const classes = useStyles();
    const theme = useTheme();
    const {
        title,
        writer,
        object,
        reviewNumber,
        type,
        createdDate
    } = props;
    return (
        <Box className={classes.wrapper}>
            <Card className={classes.cardCss}>
                <CardContent>
                    <Box className={classes.title}
                        margin="8px 0"
                        fontSize="20px"
                        // fontWeight={theme.typography.fontWeightBold}
                    >
                        {title}
                    </Box>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Box textAlign="start" display="flex" margin="8px 0">
                                {type.label}: {
                                    type.value === 3 ? <a style={{marginLeft:4}} href={object} target="_blank">{object}</a> : 
                                        <Box marginLeft="4px" 
                                            // fontWeight="bold"
                                            color="error.main">{object}</Box>
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box textAlign="start" display="flex" margin="8px 0">
                                Người báo: <Box marginLeft="4px" 
                                    // fontWeight="bold" 
                                    color="success.main">{writer}</Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <Box textAlign="start" display="flex" margin="8px 0" alignItems="center">
                                <VisibilityIcon/>
                                 <Box marginLeft="4px" 
                                                // fontWeight="bold" 
                                                color="warning.main">{reviewNumber}</Box>
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Box textAlign="start" margin="8px 0">
                                Ngày báo: {formateDateTime(createdDate)}
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>

    )
}

ReportItem.propTypes = {

}

export default ReportItem


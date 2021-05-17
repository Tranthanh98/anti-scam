import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Card, CardContent, Chip, makeStyles } from '@material-ui/core'
import { formateDateTime } from '../../../general/helper';


const useStyles = makeStyles(theme=>({
    userName:{
        cursor:"pointer",
        "&:hover":{
            color:theme.palette.error.main
        }
    },
    viewProfile:{
        cursor:"pointer",
        "&:hover":{
            color:theme.palette.error.main
        }
    }
}));

const userProfile = {
    userName:"Bạn xinh đẹp",
    email:"hk@gmail.com",
    joinedDate:new Date(),
    totalPosts: 12
}
function SummaryProfile(props) {
    const classes = useStyles();
    return (
        <Card>
            <CardContent>
                <Box display="flex" justifyContent="center">
                    <Avatar>HK</Avatar>
                </Box>
                <Box margin="8px 0" 
                    fontWeight="bold" 
                    color="primary.main" 
                    cursor="pointer" 
                    display="flex" 
                    justifyContent="center"
                    className={classes.userName}
                >
                    {userProfile.userName}
                </Box>
                <Box margin="8px 0" 
                    display="flex" 
                    justifyContent="flex-start"
                    className={classes.userName}
                >
                    Email: <Box marginLeft="4px" fontWeight="bold" color="error.main">{userProfile.email}</Box>
                </Box>
                <Box margin="8px 0" 
                    display="flex" 
                    justifyContent="flex-start"
                    className={classes.userName}
                >
                    Ngày tham gia: {formateDateTime(userProfile.joinedDate)}
                </Box>
                <Box margin="8px 0" 
                    display="flex" 
                    justifyContent="flex-start"
                    alignItems="center"
                    className={classes.userName}
                >
                    Số lượng bài viết: <Box fontWeight="bold" fontSize="25px" color="success.main">{userProfile.totalPosts}</Box>
                </Box>
                <Box margin="8px 0" 
                    display="flex" 
                    justifyContent="center"
                    alignItems="center"
                    className={classes.userName}
                >
                    <Chip
                        label="View your profile"
                        variant="outlined"
                        color="primary"
                        className={classes.viewProfile}
                    />
                </Box>
            </CardContent>
        </Card>
    )
}

SummaryProfile.propTypes = {

}

export default SummaryProfile


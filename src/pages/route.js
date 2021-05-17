import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ReportPage from './Report';
import ReputationPage from './Reputation';
import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

let i = 1;
function createRoute(title, icon, path, component, isShow=true){
    return {
        id: i++,
        title, 
        icon, 
        path, 
        component,
        isShow
    }
}
export default [
    // createRoute("Báo cáo xấu", <RemoveCircleOutlineIcon color="error"/>, "/", ReportPage, false),
    createRoute("Báo cáo xấu", <RemoveCircleOutlineIcon color="error"/>, "/report", ReportPage),
    createRoute("Trang web uy tín", <CheckCircleOutlineIcon color="secondary"/>, "/reputation", ReputationPage),
    createRoute("Profile", <AccountCircleIcon/> , "/profile", ReportPage),
    createRoute("Liên hệ", <AccountCircleIcon/> , "/contact", ReportPage),
    createRoute("Về chúng tôi", <AccountCircleIcon/> , "/about-me", ReportPage),

]
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ReportPage from './Report';
import ReputationPage from './Reputation';
import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import InfoIcon from '@material-ui/icons/Info';

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
    createRoute("Báo cáo xấu", <RemoveCircleIcon />, "/report", ReportPage),
    createRoute("Trang web uy tín", <CheckCircleIcon />, "/reputation", ReputationPage),
    createRoute("Profile", <AccountCircleIcon/> , "/profile", ReportPage),
    createRoute("Liên hệ", <ContactPhoneIcon/> , "/contact", ReportPage),
    createRoute("Về chúng tôi", <InfoIcon/> , "/about-me", ReportPage),

]
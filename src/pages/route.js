import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ReportPage from './Report';
import ReputationPage from './Reputation';
import React from 'react';

let i = 1;
function createRoute(title, icon, path, component){
    return {
        id: i++,
        title, 
        icon, 
        path, 
        component
    }
}
export default [
    createRoute("Báo cáo xấu", <RemoveCircleOutlineIcon color="error"/>, "/report", ReportPage),
    createRoute("Trang web uy tín", <CheckCircleOutlineIcon color="secondary"/>, "/reputation", ReputationPage),
]
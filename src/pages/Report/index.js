import { Box, Button, Card, CardContent, CardHeader, Grid, makeStyles, TextField } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import React, { Component, useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useHistory, withRouter } from 'react-router'
import { selectMenuAct } from '../../actions/select-menu'
import SelectOption from '../../components/SelectOption'
import { useInputText } from '../../general/CustomHook'
import { SORT_DAY } from '../../general/enum'
import route from '../route';
import ReportItem from './components/ReportItem'
import dummyDataReport from './config/dummyDataReport'

const types = [
    {
        value:0,
        label: "Tất cả"
    },
    {
        value:1,
        label: "Trang web"
    },
    {
        value:2,
        label: "Số tài khoản"
    },
    {
        value:3,
        label: "Tài khoản MXH"
    },
    {
        value:4,
        label: "Số điện thoại"
    },
    
];

const sortOptions = [
    {
        value:SORT_DAY.Lastest,
        label:"Mới nhất"
    },
    {
        value:SORT_DAY.Oldest,
        label:"Cũ nhất"
    },
];

const useStyles = makeStyles(theme => ({
    headerCss:{
        backgroundColor: theme.palette.primary.background,
        color:"white",
        display: "flex",
        alignItems:"center",
        margin:"8px 0" ,
        height:"100px",
        display:"flex" ,
        justifyContent:"center",
        padding:"8px",
    }
}))

function ReportPage (props) {
    const [type, setType] = useState(types[0].value);
    const [sortType, setSortType] = useState(sortOptions[0].value);

    const history = useHistory();
    const dispatch = useDispatch();
    const componentDidMount = () =>{
        const {location} = history;
        let findLocation = route.find(i=> i.path === location.pathname);
        
        dispatch(selectMenuAct(findLocation))
    }
    
    useEffect(()=>{
        componentDidMount();
    },[]);
    const searchText = useInputText("");
    const _onChangeType = (value)=>{
        setType(value);
    }
    const _onChangeSort = (value)=>{
        setSortType(value)
    }
    const classes = useStyles();
    const isMobile = window.mobileCheck();
    return (
        <Box>
            {/* <div className={classes.headerCss}>
                CÁC TRANG WEB, SỐ TÀI KHOẢN BỊ BÁO CÁO XẤU
            </div> */}
            <Card>
                <CardHeader
                    title="CÁC TRANG WEB, SỐ TÀI KHOẢN BỊ BÁO CÁO XẤU"
                />
                <CardContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                size="small"
                                fullWidth
                                placeholder="Tìm kiếm theo tên, số tài khoản,..."
                                {...searchText}
                            />
                        </Grid>
                    </Grid>
                    <Box margin="16px 0">
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <SelectOption
                                value={type}
                                onChange={_onChangeType}
                                options={types}
                                label="Thể loại"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SelectOption
                                value={sortType}
                                onChange={_onChangeSort}
                                options={sortOptions}
                                label="Sắp xếp"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Box margin="16px 0">
                    </Box>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end" width="100%">
                            <Button variant="contained" color="primary">
                                Báo cáo vi phạm
                            </Button>
                        </Box>
                    </Grid>
                </CardContent>
            </Card>
            <Box>
                {
                    dummyDataReport.map((data, index)=>{
                        return (
                            <ReportItem
                                key={data.id}
                                {...data}
                            />
                        )
                    })
                }
            </Box>
            <Box margin="16px" display="flex" justifyContent="center">
                <Pagination 
                    size={isMobile ? "small":"medium"} 
                    // page={2} 
                    count={10} 
                    color="secondary"
                    variant="outlined" 
                    shape="rounded" 
                />
            </Box>
        </Box>
    )
}

export default ReportPage;

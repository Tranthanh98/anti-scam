import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { openDrawerAct } from "../../actions/drawer.action";
import { openModalAct } from "../../actions/modal.action";
import { selectMenuAct } from "../../actions/select-menu";
import BaseLayout from "../../components/BaseLayout";
import SelectOption from "../../components/SelectOption";
import { useInputText } from "../../general/CustomHook";
import { SORT_DAY } from "../../general/enum";
import HighLightReputation from "../HomePage/components/HighLightReputation";
import SummaryProfile from "../HomePage/components/SummaryProfile";
import route from "../route";
import BodyFormReport from "./components/BodyFormReport";
import ProfileAnonymous from "./components/ProfileAnonymous";
import ReportItem from "./components/ReportItem";
import dummyDataReport from "./config/dummyDataReport";
import types from "./config/dummyTypes";

const sortOptions = [
  {
    value: SORT_DAY.Lastest,
    label: "Mới nhất",
  },
  {
    value: SORT_DAY.Oldest,
    label: "Cũ nhất",
  },
];

const useStyles = makeStyles((theme) => ({
  headerCss: {
    backgroundColor: theme.palette.primary.background,
    color: "white",
    display: "flex",
    alignItems: "center",
    margin: "8px 0",
    height: "100px",
    justifyContent: "center",
    padding: "8px",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1.5),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  hide: {
    display: "none",
  },
}));

const widthScreen = window.innerWidth;

function ReportPage(props) {
  const [type, setType] = useState();
  const [sortType, setSortType] = useState(sortOptions[0]);

  const history = useHistory();
  const dispatch = useDispatch();
  const _componentDidMount = () => {
    const { location } = history;
    let findLocation = route.find((i) => i.path === location.pathname);

    dispatch(selectMenuAct(findLocation));
  };

  useEffect(() => {
    _componentDidMount();
    //react-hooks/exhaustive-deps
  }, []);
  const searchText = useInputText("");
  const _onChangeType = (value) => {
    setType(value);
  };
  const _onChangeSort = (value) => {
    setSortType(value);
  };

  const _onClickReport = () => {
    let modalData = {
      title: "Báo cáo lừa đảo",
      body: <BodyFormReport />,
      style: {
        fullWidth: true,
        maxWidth: "md",
      },
    };
    dispatch(openModalAct(modalData));
  };
  const classes = useStyles();
  const isMobile = window.mobileCheck();
  const leftChildren = () => {
    return (
      <>
        <Card>
          <CardHeader title="CÁC TRANG WEB, SỐ TÀI KHOẢN BỊ BÁO CÁO XẤU" />
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
            <Box margin="16px 0"></Box>
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
            <Box margin="16px 0"></Box>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" width="100%">
                <Button
                  onClick={_onClickReport}
                  variant="contained"
                  color="primary"
                >
                  Báo cáo lừa đảo
                </Button>
              </Box>
            </Grid>
          </CardContent>
        </Card>
        <Box>
          {dummyDataReport.map((data, index) => {
            return <ReportItem key={data.id} {...data} />;
          })}
        </Box>
        <Box margin="16px" display="flex" justifyContent="center">
          <Pagination
            size={isMobile ? "small" : "medium"}
            // page={2}
            count={10}
            color="secondary"
            variant="outlined"
            shape="rounded"
          />
        </Box>
      </>
    );
  };
  const rightChildren = () => {
    return (
      <>
        {false ? <SummaryProfile /> : <ProfileAnonymous />}
        <Box margin="8px 0">
          <HighLightReputation />
        </Box>
      </>
    );
  };
  return (
    <BaseLayout leftChilren={leftChildren()} rightChildren={rightChildren()} />
  );
}

export default ReportPage;

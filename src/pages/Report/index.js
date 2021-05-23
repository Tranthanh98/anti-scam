import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAlert } from "../../actions/alertify.action";
import { openDrawerAct } from "../../actions/drawer.action";
import { openModalAct } from "../../actions/modal.action";
import BaseLayout from "../../components/BaseLayout";
import SelectOption from "../../components/SelectOption";
import { useInputText } from "../../general/CustomHook";
import { KIND_OF, SORT_DAY } from "../../general/enum";
import HighLightReputation from "../HomePage/components/HighLightReputation";
import SummaryProfile from "../HomePage/components/SummaryProfile";
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

function ReportPage(props) {
  const [type, setType] = useState();
  const [sortType, setSortType] = useState(sortOptions[0]);

  const isMobile = window.mobileCheck();
  const user = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();

  const searchText = useInputText("");
  const _onChangeType = (value) => {
    setType(value);
  };
  const _onChangeSort = (value) => {
    setSortType(value);
  };

  const _onClickReport = () => {
    if (user?.data?.isAuth) {
      let modalData = {
        title: "Báo cáo lừa đảo",
        body: <BodyFormReport />,
        style: {
          fullWidth: true,
          maxWidth: "md",
        },
      };
      if (isMobile) {
        dispatch(openDrawerAct(modalData));
      } else {
        dispatch(openModalAct(modalData));
      }
    } else {
      dispatch(addAlert("Đăng nhập để báo cáo lừa đảo", "error"));
    }
  };
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
          {dummyDataReport
            .filter((i) => i.kindOf === KIND_OF.Cheat)
            .map((data, index) => {
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
        {user?.data?.isAuth ? <SummaryProfile /> : <ProfileAnonymous />}
        <Box margin="8px 0">
          <HighLightReputation />
        </Box>
        <div>
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fbeatvn.network%2F&tabs=timeline&width=260&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width="260"
            height="500"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      </>
    );
  };
  return (
    <BaseLayout leftChilren={leftChildren()} rightChildren={rightChildren()} />
  );
}

export default ReportPage;

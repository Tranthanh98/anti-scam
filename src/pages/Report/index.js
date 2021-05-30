import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  TextField,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useCallback, useEffect, useState } from "react";
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
import * as httpClient from "../../general/HttpClient";
import axios from "axios";
import debounce from "lodash.debounce";

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
  // const [sortType, setSortType] = useState(sortOptions[0]);
  // const [type, setType] = useState();

  const [typeOptions, setTypeOptions] = useState([]);
  const [dataReport, setDataReport] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [highlightPost, setHighlightPost] = useState([]);

  const [searchModel, setSearchModel] = useState({
    currentPage: 1,
    searchText: "",
    typeId: 0,
    sortType: 0,
    kindOfValue: KIND_OF.Cheat,
    pageSize: 10,
    total: 0,
    totalPage: 0,
  });

  const cancelToken = axios.CancelToken.source();

  const _getDefaultData = async () => {
    let res = await httpClient.sendGet(
      "/DefaultPage/GetReportDefaultData/" + KIND_OF.Reputation
    );
    if (res.data.isSuccess) {
      setTypeOptions(res.data?.data?.types || []);
      setHighlightPost(res.data?.data?.newestPosts);
    }
  };

  const _getDataReport = async (searchTextValue) => {
    let cloneSearchModel = { ...searchModel };
    if (searchTextValue) {
      cloneSearchModel.searchText = searchTextValue;
    } else {
      cloneSearchModel.searchText = searchText;
    }

    let res = await httpClient.sendPost("/Post/GetPosts", {
      searchModel: cloneSearchModel,
    });
    if (res.data.isSuccess) {
      setDataReport(res.data?.data?.data || []);
      setSearchModel({
        ...searchModel,
        totalPage: res.data?.data?.totalPage,
      });
    }
  };

  useEffect(() => {
    _getDefaultData();
    return () => {
      cancelToken.cancel();
    };
  }, []);

  useEffect(() => {
    _getDataReport();
  }, [searchModel.typeId, searchModel.currentPage, searchModel.sortType]);

  const isMobile = window.mobileCheck();
  const user = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();

  const _onChangeType = (value) => {
    let cloneSearchModel = { ...searchModel };
    cloneSearchModel.typeId = value.value;
    setSearchModel(cloneSearchModel);
  };

  const _onChangeSort = (value) => {
    let cloneSearchModel = { ...searchModel };
    cloneSearchModel.sortType = value.value;
    setSearchModel(cloneSearchModel);
  };

  const _debounceGetData = useCallback(
    debounce((nextValue) => _getDataReport(nextValue), 800),
    []
  );

  const _onChangeSearchText = (e) => {
    const { value } = e.target;
    setSearchText(value);
    _debounceGetData(value);
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
  const _onChangePageIndex = (e, value) => {
    setSearchModel({
      ...searchModel,
      currentPage: value,
    });
  };
  const leftChildren = () => {
    return (
      <>
        <Card>
          <CardHeader title="CÁC WEBSITE, TỔ CHỨC, CÁ NHÂN BỊ TỐ CÁO LỪA ĐẢO" />
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  placeholder="Tìm kiếm link, số tài khoản, số điện thoại,..."
                  value={searchText}
                  onChange={_onChangeSearchText}
                />
              </Grid>
            </Grid>
            <Box margin="16px 0"></Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <SelectOption
                  value={typeOptions.find((i) => i.value == searchModel.typeId)}
                  onChange={_onChangeType}
                  options={typeOptions}
                  label="Thể loại"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectOption
                  value={sortOptions.find(
                    (i) => i.value == searchModel.sortType
                  )}
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
          {!dataReport || dataReport.length === 0 ? (
            <Box margin="24px 0">
              <Box margin="16px 0">Đang tải bài viết</Box>
              <CircularProgress />
            </Box>
          ) : (
            dataReport.map((data, index) => {
              return <ReportItem key={data.id} {...data} />;
            })
          )}
        </Box>
        <Box margin="16px" display="flex" justifyContent="center">
          <Pagination
            size={isMobile ? "small" : "medium"}
            page={searchModel.currentPage}
            onChange={_onChangePageIndex}
            count={searchModel.totalPage}
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
          <HighLightReputation
            highlightPost={highlightPost}
            titleName="Bài đăng uy tín nổi bật"
          />
        </Box>
        <div>
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fbaocaoluadao&tabs=timeline&width=270&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width="260"
            height="500"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="fan page facebook, kết nối antiscam vietnam"
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

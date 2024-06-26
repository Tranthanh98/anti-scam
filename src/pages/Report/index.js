import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  CircularProgress,
  Grid,
  TextField,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import axios from "axios";
import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAlert } from "../../actions/alertify.action";
import { updateLoading } from "../../actions/apploading.action";
import { openDrawerAct } from "../../actions/drawer.action";
import { openModalAct } from "../../actions/modal.action";
import BaseLayout from "../../components/BaseLayout";
import SelectOption from "../../components/SelectOption";
import { KIND_OF, SORT_DAY } from "../../general/enum";
import * as httpClient from "../../general/HttpClient";
import HighLightReputation from "../HomePage/components/HighLightReputation";
import SummaryProfile from "../HomePage/components/SummaryProfile";
import BodyFormReport from "./components/BodyFormReport";
import ProfileAnonymous from "./components/ProfileAnonymous";
import ReportItem from "./components/ReportItem";
import { Helmet } from "react-helmet";

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
  const [typeOptions, setTypeOptions] = useState([]);
  const [dataReport, setDataReport] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [highlightPost, setHighlightPost] = useState([]);
  const [notFoundContent, setNotFoundContent] = useState(false);

  const [searchModel, setSearchModel] = useState({
    currentPage: 1,
    searchText: "",
    typeId: 0,
    sortType: SORT_DAY.Lastest,
    kindOfValue: KIND_OF.Cheat,
    pageSize: 10,
    total: 0,
    totalPage: 0,
    isMine: false,
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
    setNotFoundContent(true);
    let cloneSearchModel = { ...searchModel };
    if (searchTextValue) {
      cloneSearchModel.searchText = searchTextValue;
    } else {
      cloneSearchModel.searchText = searchText;
    }

    try {
      let res = await httpClient.sendPost("/Post/GetPosts", {
        searchModel: cloneSearchModel,
      });
      if (res.data.isSuccess) {
        setDataReport(res.data?.data?.data || []);
        setSearchModel({
          ...searchModel,
          totalPage: res.data?.data?.totalPage,
        });
      } else {
        throw new Error(res.data.messages);
      }
    } catch (e) {
      dispatch(addAlert(String(e), "error"));
    } finally {
      setNotFoundContent(false);
      dispatch(updateLoading(false));
    }
  };

  useEffect(() => {
    dispatch(updateLoading(true));
    _getDefaultData();
    return () => {
      cancelToken.cancel();
    };
  }, []);

  useEffect(() => {
    _getDataReport();
  }, [
    searchModel.typeId,
    searchModel.currentPage,
    searchModel.sortType,
    searchModel.isMine,
  ]);

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
        body: <BodyFormReport typeOptions={typeOptions} />,
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

  const _onCheckIsMine = (e) => {
    const { checked } = e.target;
    setSearchModel({
      ...searchModel,
      isMine: checked,
    });
  };

  const leftChildren = () => {
    return (
      <>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6633404321853475"
          crossorigin="anonymous"
        ></script>
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
              <Grid item xs={12} sm={6}>
                <SelectOption
                  value={typeOptions.find((i) => i.value == searchModel.typeId)}
                  onChange={_onChangeType}
                  options={typeOptions}
                  label="Thể loại"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  width="100%"
                  alignItems="center"
                >
                  {user?.data?.isAuth ? (
                    <>
                      <Checkbox
                        checked={searchModel.isMine}
                        onChange={_onCheckIsMine}
                        color="primary"
                      />
                      <Box marginLeft="8px">Bài đăng của tôi</Box>
                    </>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={6}>
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
            </Grid>
          </CardContent>
        </Card>
        <Box>
          {notFoundContent ? (
            <Box margin="24px 0">
              <Box margin="16px 0">Đang tải bài viết</Box>
              <CircularProgress />
            </Box>
          ) : !dataReport || dataReport.length === 0 ? (
            <Box margin="24px 0">Không tìm thấy kết quả phù hợp</Box>
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
            titleName="CÁC DỊCH VỤ UY TÍN HIỆN NAY"
          />
        </Box>
        <div>
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fbaocaoluadao&tabs=timeline&width=270&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width="260"
            height="650"
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
    <>
      <Helmet>
        <title>Antiscam - Chống lừa đảo</title>
      </Helmet>
      <BaseLayout
        leftChilren={leftChildren()}
        rightChildren={rightChildren()}
      />
    </>
  );
}

export default ReportPage;

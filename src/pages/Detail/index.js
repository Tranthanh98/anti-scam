import { Box, CircularProgress } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { selectMenuAct } from "../../actions/select-menu";
import BaseContext from "../../components/BaseContext";
import BaseLayout from "../../components/BaseLayout";
import * as httpClient from "../../general/HttpClient";
import LeftPageDetail from "./components/LeftPageDetail";
import RightpageDetail from "./components/RightpageDetail";

class Detail extends Component {
  state = {
    post: null,
    notFoundContent: false,
  };
  async componentDidMount() {
    window.scrollTo(0, 0);
    await this._getData();
  }

  async componentDidUpdate(prevProp, prevState) {
    const { match } = this.props;
    if (prevProp?.match?.params.id !== match.params.id) {
      await this._getData();
    }
  }
  _getData = async () => {
    const { match } = this.props;
    try {
      let res = await httpClient.sendGet("/post/detail/" + match.params.id);
      if (res.data.isSuccess) {
        this.setState({ post: res.data.data, notFoundContent: false });
      } else {
        this.setState({ notFoundContent: true });
      }
    } catch (e) {
      this.setState({ notFoundContent: true });
    }
  };
  render() {
    const { post, notFoundContent } = this.state;
    let provider = {
      ...this.state,
    };
    return (
      <BaseContext.Provider value={provider}>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6633404321853475"
          crossorigin="anonymous"
        ></script>

        <BaseLayout
          leftChilren={
            notFoundContent ? (
              <Box fontWeight="bold">Chưa có báo cáo nào về thông tin này,</Box>
            ) : post === null ? (
              <Box margin="24px 0">
                <Box margin="16px 0">Đang tải bài viết</Box>
                <CircularProgress />
              </Box>
            ) : (
              <LeftPageDetail />
            )
          }
          rightChildren={post ? <RightpageDetail /> : null}
        />
      </BaseContext.Provider>
    );
  }
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  selectMenuAct: selectMenuAct,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));

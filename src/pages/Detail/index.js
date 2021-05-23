import { Box, withTheme } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { selectMenuAct } from "../../actions/select-menu";
import BaseContext from "../../components/BaseContext";
import BaseLayout from "../../components/BaseLayout";
import dummyDataReport from "../Report/config/dummyDataReport";
import route from "../route";
import LeftPageDetail from "./components/LeftPageDetail";
import RightpageDetail from "./components/RightpageDetail";

class Detail extends Component {
  state = {
    post: null,
    kindOf: null,
  };
  async componentDidMount() {
    window.scrollTo(0, 0);
    const { history } = this.props;
    const { location } = history;
    let findLocation = route.find((i) => i.path === location.pathname);
    if (findLocation) {
      this.props.selectMenuAct(findLocation);
    }
    await this._getData();
  }
  _getData = async () => {
    const { match } = this.props;
    let post = dummyDataReport.find((i) => i.id == Number(match.params.id));
    if (post) {
      this.setState({ post });
      this.setState({ kindOf: post.kindOf });
    }
  };
  render() {
    const { post, kindOf } = this.state;
    let provider = {
      ...this.state,
    };
    return (
      <BaseContext.Provider value={provider}>
        <BaseLayout
          leftChilren={
            post ? <LeftPageDetail /> : <Box>Bài viết không tồn tại</Box>
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

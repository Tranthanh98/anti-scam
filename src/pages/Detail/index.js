import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { selectMenuAct } from "../../actions/select-menu";
import BaseContext from "../../components/BaseContext";
import BaseLayout from "../../components/BaseLayout";
import route from "../route";
import LeftPageDetail from "./components/LeftPageDetail";

class Detail extends Component {
  state = {};
  componentDidMount() {
    const { location } = this.props.history;
    let findLocation = route.find((i) => i.path === location.pathname);
    if (findLocation) {
      this.props.selectMenuAct(findLocation);
    }
  }
  render() {
    return (
      <BaseContext.Provider>
        <BaseLayout leftChilren={<LeftPageDetail />} />
      </BaseContext.Provider>
    );
  }
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  selectMenuAct: selectMenuAct,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));

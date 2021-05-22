import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { selectMenuAct } from "../../actions/select-menu";
import BaseContext from "../../components/BaseContext";
import BaseLayout from "../../components/BaseLayout";
import { SORT_DAY } from "../../general/enum";
import types from "../Report/config/dummyTypes";
import route from "../route";
import LeftPage from "./components/LeftPage";
import RightPage from "./components/RightPage";

export const sortOptions = [
  {
    value: SORT_DAY.Lastest,
    label: "Mới nhất",
  },
  {
    value: SORT_DAY.Oldest,
    label: "Cũ nhất",
  },
];

class ReputationPage extends Component {
  state = {
    type: types[0],
    searchText: "",
    sortType: sortOptions[0],
  };

  componentDidMount() {
    const { location } = this.props.history;
    let findLocation = route.find((i) => i.path === location.pathname);
    this.props.selectMenuAct(findLocation);
  }
  render() {
    let provider = {
      ...this.state,
      onChangeSearchText: this._setSearchText,
      onChangeType: this._setType,
      onChangeSort: this._setSortType,
    };
    return (
      <BaseContext.Provider value={provider}>
        <BaseLayout leftChilren={<LeftPage />} rightChildren={<RightPage />} />
      </BaseContext.Provider>
    );
  }

  _setSearchText = (e) => {
    this.setState({ searchText: e.target.value });
  };

  _setType = (type) => {
    this.setState({ type });
  };

  _setSortType = (sortType) => {
    this.setState({ sortType });
  };
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  selectMenuAct: selectMenuAct,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ReputationPage));

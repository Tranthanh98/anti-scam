import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { selectMenuAct } from "../../actions/select-menu";
import BaseContext from "../../components/BaseContext";
import BaseLayout from "../../components/BaseLayout";
import { KIND_OF, SORT_DAY } from "../../general/enum";
import * as httpClient from "../../general/HttpClient";
import LeftPage from "./components/LeftPage";
import RightPage from "./components/RightPage";
import axios from "axios";

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
    searchModel: {
      currentPage: 1,
      searchText: "",
      typeId: 0,
      sortType: SORT_DAY.Lastest,
      kindOfValue: KIND_OF.Reputation,
      pageSize: 10,
      total: 0,
      totalPage: 0,
    },
    dataTable: [],
    newestPost: [],
    notFoundContent: false,
  };

  cancelToken = axios.CancelToken.source();

  async componentDidMount() {
    await this._getDataTable();
  }

  componentWillUnmount() {
    this.cancelToken.cancel();
  }
  render() {
    let provider = {
      ...this.state,
      onChangeSearchText: this._setSearchText,
      onChangeType: this._setType,
      onChangeSort: this._setSortType,
      onChangePageIndex: this._onChangePageIndex,
      getDataTable: this._getDataTable,
      setNewestPost: this._setNewestPost,
      setNotFoundContent: this._setNotFoundContent,
    };
    return (
      <BaseContext.Provider value={provider}>
        <BaseLayout leftChilren={<LeftPage />} rightChildren={<RightPage />} />
      </BaseContext.Provider>
    );
  }

  _setNotFoundContent = (status) => {
    this.setState({ notFoundContent: status });
  };

  _setNewestPost = (newestPost) => {
    this.setState({ newestPost });
  };

  _onChangePageIndex = (e, value) => {
    this.setState(
      {
        searchModel: {
          ...this.state.searchModel,
          currentPage: value,
        },
      },
      this._getDataTable
    );
  };

  _setSearchText = (value) => {
    this.setState(
      {
        searchModel: { ...this.state.searchModel, searchText: value },
      },
      this._getDataTable
    );
  };

  _setType = (type) => {
    this.setState(
      { searchModel: { ...this.state.searchModel, typeId: type.value } },
      this._getDataTable
    );
  };

  _setSortType = (sortType) => {
    this.setState(
      { searchModel: { ...this.state.searchModel, sortType: sortType.value } },
      this._getDataTable
    );
  };

  _getDataTable = async () => {
    const { searchModel } = this.state;
    this._setNotFoundContent(true);
    try {
      let res = await httpClient.sendPost("/Post/GetPosts", {
        searchModel,
      });
      const response = res.data;
      if (response.isSuccess) {
        this.setState({
          dataTable: response.data?.data,
          searchModel: { ...searchModel, totalPage: response.data.total },
        });
      }
    } catch (e) {
    } finally {
      this._setNotFoundContent(false);
    }
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

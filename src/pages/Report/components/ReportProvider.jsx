import React, { Component } from 'react';
import ContextApi from '../../../components/ContextApi';
import { SORT_DAY } from '../../../general/enum';


const types = [
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
    
]

class ReportProvider extends Component {
    state={
        searchText:"",
        typeId: types[0].value,
        page:1,
        sort : SORT_DAY.Lastest
    }
    _setSearchText = (e)=>{
        this.setState({
            searchText : e.target.value
        })
    }
    _setTypeId = (value)=>{
        this.setState({typeId:value});
    }
    _setPageIndex = (page)=>{
        this.setState({page});
    }
    _setSort = (value)=>{
        this.setState({sort: value});
    }
    render() {
        const provider = {
            ...this.state,
            onChangeSearchText:this._setSearchText,
            onChangeType : this._setTypeId,
            onChangePage: this._setPageIndex,
            onChangeSort: this._setSort
        }
        return (
            <ContextApi.Provider value={provider}>
                {this.props.children}
            </ContextApi.Provider>
        )
    }
}

export default ReportProvider;
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { connectToContext } from "../../../components/BaseContext";
import SelectOption from "../../../components/SelectOption";
import types from "../../Report/config/dummyTypes";
import { sortOptions } from "../index";
import * as httpClient from "../../../general/HttpClient";
import debounce from "lodash.debounce";

function FilterReputation({
  onChangeSearchText,
  typeId,
  sortType,
  onChangeType,
  onChangeSort,
}) {
  const [typeOptions, setTypeOptions] = useState([]);

  const [privateSearchText, setPrivateSearchText] = useState("");

  const _getDefaultData = async () => {
    let res = await httpClient.sendGet("/DefaultPage/GetReportDefaultData");
    if (res.data.isSuccess) {
      setTypeOptions(res.data?.data?.types || []);
    }
  };

  useEffect(() => {
    _getDefaultData();
  }, []);

  const _debounceGetData = useCallback(
    debounce((nextValue) => onChangeSearchText(nextValue), 800),
    []
  );

  const _onChangeSearchText = (e) => {
    const { value } = e.target;
    setPrivateSearchText(value);
    _debounceGetData(value);
  };
  return (
    <Card>
      <CardHeader title="CÁC WEBSITE, TỔ CHỨC, CÁ NHÂN CUNG CẤP DỊCH VỤ UY TÍN" />
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Tìm kiếm theo tên, số tài khoản,..."
              value={privateSearchText}
              onChange={_onChangeSearchText}
            />
          </Grid>
        </Grid>
        <Box margin="16px 0"></Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <SelectOption
              value={typeOptions.find((i) => i.value == typeId)}
              onChange={onChangeType}
              options={typeOptions}
              label="Thể loại"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectOption
              value={sortOptions.find((i) => i.value == sortType)}
              onChange={onChangeSort}
              options={sortOptions}
              label="Sắp xếp"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

FilterReputation.propTypes = {};

const mapContextToProps = ({
  onChangeSearchText,
  typeId,
  sortType,
  onChangeType,
  onChangeSort,
}) => ({
  onChangeSearchText,
  typeId,
  sortType,
  onChangeType,
  onChangeSort,
});

export default connectToContext(mapContextToProps)(FilterReputation);

import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@material-ui/core";
import SelectOption from "../../../components/SelectOption";
import types from "../../Report/config/dummyTypes";
import { sortOptions } from "../index";
import { connectToContext } from "../../../components/BaseContext";

function FilterReputation({
  searchText,
  onChangeSearchText,
  type,
  sortType,
  onChangeType,
  onChangeSort,
}) {
  return (
    <Card>
      <CardHeader title="CÁC TRANG WEB, SỐ TÀI KHOẢN UY TÍN LUÔN" />
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Tìm kiếm theo tên, số tài khoản,..."
              value={searchText}
              onChange={onChangeSearchText}
            />
          </Grid>
        </Grid>
        <Box margin="16px 0"></Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <SelectOption
              value={type}
              onChange={onChangeType}
              options={types}
              label="Thể loại"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectOption
              value={sortType}
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
  searchText,
  onChangeSearchText,
  type,
  sortType,
  onChangeType,
  onChangeSort,
}) => ({
  searchText,
  onChangeSearchText,
  type,
  sortType,
  onChangeType,
  onChangeSort,
});

export default connectToContext(mapContextToProps)(FilterReputation);
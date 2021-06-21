import { Box, Card, CardContent, TextField } from "@material-ui/core";
import React from "react";
import SelectOption from "../../../components/SelectOption";
import connectToContext from "../../../general/connectToContext";
import { SORT_DAY } from "../../../general/enum";
import types from "../config/dummyTypes";

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

function ReportFilter(props) {
  const { typeId, searchText, sort, onChangeSearchText, onChangeType } = props;
  return (
    <Box>
      <Card>
        <CardContent>
          <Box margin="16px 0">
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Tìm kiếm theo tên, số tài khoản,..."
              value={searchText}
              onChange={onChangeSearchText}
            />
          </Box>
          <Box margin="16px 0" display="flex">
            <Box>
              <SelectOption
                value={typeId}
                onChange={onChangeType}
                options={types}
                label="Thể loại"
              />
            </Box>
            <Box>
              <SelectOption
                value={typeId}
                onChange={onChangeType}
                options={sortOptions}
                label="Thể loại"
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

ReportFilter.propTypes = {};

const mapStateToProps = ({
  searchText,
  onChangeSearchText,
  typeId,
  onChangeType,
}) => ({
  searchText,
  onChangeSearchText,
  typeId,
  onChangeType,
});

export default connectToContext(mapStateToProps)(ReportFilter);

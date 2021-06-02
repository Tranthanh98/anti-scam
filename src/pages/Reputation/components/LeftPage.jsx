import { Box, CircularProgress } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React from "react";
import { connectToContext } from "../../../components/BaseContext";
import ReportItem from "../../Report/components/ReportItem";
import FilterReputation from "./FilterReputation";

function LeftPage({
  searchModel,
  onChangePageIndex,
  dataTable,
  notFoundContent,
}) {
  const isMobile = window.mobileCheck();

  return (
    <Box>
      <FilterReputation />
      <Box>
        {notFoundContent ? (
          <Box margin="24px 0">
            <Box margin="16px 0">Đang tải bài viết</Box>
            <CircularProgress />
          </Box>
        ) : !dataTable || dataTable.length === 0 ? (
          <Box margin="24px 0">Không tìm thấy kết quả phù hợp</Box>
        ) : (
          dataTable.map((data, index) => {
            return <ReportItem key={data.id} {...data} />;
          })
        )}
      </Box>
      <Box margin="16px" display="flex" justifyContent="center">
        <Pagination
          size={isMobile ? "small" : "medium"}
          page={searchModel.currentPage}
          onChange={onChangePageIndex}
          count={searchModel.totalPage}
          color="secondary"
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
}

LeftPage.propTypes = {};

const mapStateToProps = ({
  onChangePageIndex,
  searchModel,
  dataTable,
  notFoundContent,
}) => ({
  searchModel,
  onChangePageIndex,
  dataTable,
  notFoundContent,
});
export default connectToContext(mapStateToProps)(LeftPage);

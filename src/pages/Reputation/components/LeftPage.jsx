import { Box } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React from "react";
import { connectToContext } from "../../../components/BaseContext";
import { KIND_OF } from "../../../general/enum";
import ReportItem from "../../Report/components/ReportItem";
import dummyDataReport from "../../Report/config/dummyDataReport";
import FilterReputation from "./FilterReputation";

function LeftPage({ searchModel, onChangePageIndex, dataTable }) {
  const isMobile = window.mobileCheck();
  return (
    <Box>
      <FilterReputation />
      <Box>
        {dataTable &&
          dataTable.map((data, index) => {
            return <ReportItem key={data.id} {...data} />;
          })}
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

const mapStateToProps = ({ onChangePageIndex, searchModel, dataTable }) => ({
  searchModel,
  onChangePageIndex,
  dataTable,
});
export default connectToContext(mapStateToProps)(LeftPage);

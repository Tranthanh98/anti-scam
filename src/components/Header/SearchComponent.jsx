import React from "react";
import PropTypes from "prop-types";
import { Box, CircularProgress, Popover } from "@material-ui/core";
import ReportItem from "../../pages/Report/components/ReportItem";

function SearchComponent({ anchorEl, handleClose, listPosts, isLoading }) {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Box
      display={open ? "block" : "none"}
      position="absolute"
      minWidth="30vw"
      padding="0 16px"
      borderRadius="4px"
      style={{
        backgroundColor: "white",
        maxHeight: "calc(100vh - 90px)",
        overflowY: "scroll",
        boxShadow:
          " 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
      }}
    >
      {isLoading ? (
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          flexDirection="column"
        >
          <CircularProgress />
          <Box marginTop="12px" fontStyle="italic" color="#ccc">
            Đang tìm kiếm...
          </Box>
        </Box>
      ) : !listPosts || listPosts.length === 0 ? (
        <Box margin="12px">Không tìm thấy kết quả phù hợp</Box>
      ) : (
        listPosts.map((data, index) => {
          return <ReportItem isSummary={true} key={data.id} {...data} />;
        })
      )}
    </Box>
  );
}

SearchComponent.propTypes = {};

export default SearchComponent;

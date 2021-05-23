import { Box } from "@material-ui/core";
import React from "react";
import { KIND_OF } from "../../../general/enum";
import ReportItem from "../../Report/components/ReportItem";
import dummyDataReport from "../../Report/config/dummyDataReport";
import FilterReputation from "./FilterReputation";

function LeftPage(props) {
  return (
    <Box>
      <FilterReputation />
      <Box>
        {dummyDataReport
          .filter((i) => i.kindOf === KIND_OF.Reputation)
          .map((data, index) => {
            return <ReportItem key={data.id} {...data} />;
          })}
      </Box>
    </Box>
  );
}

LeftPage.propTypes = {};

export default LeftPage;

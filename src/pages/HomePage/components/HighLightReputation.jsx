import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Divider } from "@material-ui/core";
import dummnyDataReport from "../../Report/config/dummyDataReport";
import HighlightItem from "./HighlightItem";
import { sleep } from "../../../general/helper";

let data = [...dummnyDataReport];

const HighLightReputation = (props) => {
  const [highlightList, setHighlightList] = useState([]);

  const _getData = async () => {
    await sleep(400);
    if (data.length > 5) {
      let a = data.splice(5);
      setHighlightList(a);
    }
    setHighlightList(data);
  };

  useEffect(() => {
    _getData();
  }, []);

  return (
    <Card>
      <CardContent>
        {highlightList.map((post, index) => {
          return (
            <React.Fragment key={index}>
              <HighlightItem {...post} />
              <Divider />
            </React.Fragment>
          );
        })}
      </CardContent>
    </Card>
  );
};

HighLightReputation.propTypes = {};

export default HighLightReputation;

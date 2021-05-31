import { Box, Card, CardContent, Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { sleep } from "../../../general/helper";
import dummnyDataReport from "../../Report/config/dummyDataReport";
import HighlightItem from "./HighlightItem";

let data = [...dummnyDataReport];

const HighLightReputation = ({ highlightPost, titleName }) => {
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
        <Box fontWeight="bold" margin="8px">
          {titleName}
        </Box>
        {highlightPost &&
          highlightPost.map((post, index) => {
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

import React from "react";
import PropTypes from "prop-types";
import { connectToContext } from "../../../components/BaseContext";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@material-ui/core";
import SelectOption from "../../../components/SelectOption";
import FilterReputation from "./FilterReputation";

function LeftPage(props) {
  return (
    <Box>
      <FilterReputation />
    </Box>
  );
}

LeftPage.propTypes = {};

const mapContextToProps = (context) => ({});

export default connectToContext(mapContextToProps)(LeftPage);

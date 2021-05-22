import { TextField } from "@material-ui/core";
import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";

class TextFromField extends PureComponent {
  render() {
    console.log(`render TextFromField`);
    return <TextField {...this.props} />;
  }
}

TextFromField.propTypes = {
  variant: PropTypes.string,
};

TextFromField.defaultProps = {
  variant: "standard",
  fullWidth: false,
  multiline: false,
  value: "",
  placeholder: "",
};

export default TextFromField;

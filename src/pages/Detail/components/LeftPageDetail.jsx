import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import { connectToContext } from "../../../components/BaseContext";
import CommentComponent from "./CommentComponent";

const useStyles = makeStyles((theme) => ({
  titleCss: {
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.primary.dark,
    padding: theme.spacing(1),
  },
  imageTitleCss: {
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.primary.dark,
  },
}));

function LeftPageDetail(props) {
  const { id, title, writer, object, type, description, imageList } =
    props.post;

  const classes = useStyles();
  const theme = useTheme();
  return (
    <Box>
      <Card>
        <Box textAlign="start" margin="8px 0" className={classes.titleCss}>
          <Box color="primary.main" fontSize={theme.spacing(2.5)}>
            {title}
          </Box>
          <Box marginTop="8px">
            <Box color="secondary.main">{type.label} :</Box>
            <Box marginLeft="4px" style={{ wordBreak: "break-all" }}>
              {type.value == 3 || type.value == 1 ? (
                <a href={object} target="_blank">
                  {object}
                </a>
              ) : (
                object
              )}
            </Box>
          </Box>
        </Box>
        <CardContent>
          <Box textAlign="start">{description}</Box>
          <Box
            className={classes.imageTitleCss}
            textAlign="start"
            margin="8px 0"
            fontWeight="500"
          >
            Hình ảnh:
          </Box>
          <Box textAlign="start" display="flex" marginTop="8px">
            {imageList.map((image, index) => {
              return (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width="150px"
                  height="170px"
                  margin="8px"
                >
                  <img
                    src={image}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </Box>
              );
            })}
          </Box>
        </CardContent>
      </Card>
      <Box>
        <CommentComponent />
      </Box>
    </Box>
  );
}

LeftPageDetail.propTypes = {};

const mapStateToProps = (context) => ({
  post: context.post,
});

export default connectToContext(mapStateToProps)(LeftPageDetail);

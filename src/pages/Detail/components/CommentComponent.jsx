import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Box, Card, CardContent, makeStyles } from "@material-ui/core";
import { formateDateTime } from "../../../general/helper";

function createComment(name, imageAvatar, commentContent) {
  return {
    name,
    imageAvatar,
    commentContent,
    createdDate: new Date(),
  };
}

const commentItem = [
  createComment("Thành", "/fake-image", "Thằng chó đấy"),
  createComment("Yến", "/fake-image", "Nó cũng lừa em"),
  createComment("Ẩn danh", "/fake-image", "Sợ vl"),
  createComment("Ẩn danh", "/fake-image", "Tránh xa nó ra mn ơi :(("),
];

const useStyles = makeStyles((theme) => ({
  nameCss: {
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.primary.dark,
  },
  cardCss: {
    margin: "8px 0",
  },
  cardContentCss: {
    padding: 12,
  },
}));
function CommentComponent(props) {
  const [comment, setComment] = useState([]);

  const _getComment = async () => {
    setComment(commentItem);
  };
  useEffect(() => {
    _getComment();
  });

  const classes = useStyles();
  return (
    <Box marginTop="16px">
      {/* <Card className={classes.cardCss}>
        <CardContent
          classes={{
            root: classes.cardContentCss,
          }}
        >
          <Box display="flex">
            <Box padding="8px">
              <Avatar alt={cmt.name} src="/125.jpg" />
            </Box>
            <Box width="100%">
              <Box
                padding="8px"
                className={classes.nameCss}
                display="flex"
                justifyContent="space-between"
              >
                <Box color="primary.main" fontWeight="bold">
                  {cmt.name}
                </Box>
                <Box fontWeight="400" fontStyle="italic">
                  {formateDateTime(cmt.createdDate, "DD/MM/YYYY hh:mm A")}
                </Box>
              </Box>
              <Box padding="8px" textAlign="start">
                {cmt.commentContent}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card> */}
      {comment.map((cmt, index) => {
        return (
          <Card className={classes.cardCss} key={index}>
            <CardContent
              classes={{
                root: classes.cardContentCss,
              }}
            >
              <Box display="flex">
                <Box padding="8px">
                  <Avatar alt={cmt.name} src="/125.jpg" />
                </Box>
                <Box width="100%">
                  <Box
                    padding="8px"
                    className={classes.nameCss}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Box color="primary.main" fontWeight="bold">
                      {cmt.name}
                    </Box>
                    <Box fontWeight="400" fontStyle="italic">
                      {formateDateTime(cmt.createdDate, "DD/MM/YYYY hh:mm A")}
                    </Box>
                  </Box>
                  <Box padding="8px" textAlign="start">
                    {cmt.commentContent}
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}

CommentComponent.propTypes = {};

export default CommentComponent;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { formateDateTime, sleep } from "../../../general/helper";
import { useSelector } from "react-redux";
import { useInputText } from "../../../general/CustomHook";
import TextFromField from "../../../components/TextFromField";
import ItemComponent from "./ItemComponent";
import { Pagination } from "@material-ui/lab";

let idComment = 1;
function createComment(name, imageAvatar, commentContent) {
  return {
    id: idComment++,
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
    "&:last-child": {
      paddingBottom: 12,
    },
  },
}));
const CommentComponent = React.memo((props) => {
  const isMobile = window.mobileCheck();
  const userData = useSelector((state) => state.loginReducer);
  const currentUser = userData.data;

  const [commentList, setCommentList] = useState([]);

  const [yourComment, setYourComment] = useState("");

  const [commentHtml, setCommentHtml] = useState("");

  const _getComment = async () => {
    setCommentList(commentItem);
  };
  useEffect(() => {
    _getComment();
    document.addEventListener("keyup", _onKeyPressComment);
    return () => {
      document.removeEventListener("keyup", _onKeyPressComment);
    };
  }, []);

  const _onChangeYourComment = (e) => {
    const { value } = e.target;
    setYourComment(value);
  };

  const _onComment = () => {
    const cmt = createComment(
      currentUser.userName,
      currentUser.imageAvatar,
      yourComment,
      new Date()
    );
    let cloneCommentList = [...commentList];
    cloneCommentList.unshift(cmt);

    setCommentList(cloneCommentList);
    setYourComment("");
  };
  const _onKeyPressComment = (e) => {
    if (e.keyCode === 13) {
      let cloneYourComment = commentHtml + yourComment;
      cloneYourComment = cloneYourComment + "<br />";

      setCommentHtml(cloneYourComment);
    }
  };
  const classes = useStyles();
  return (
    <Box marginTop="16px">
      {currentUser?.isAuth ? (
        <Card className={classes.cardCss}>
          <CardContent
            classes={{
              root: classes.cardContentCss,
            }}
          >
            <Box display="flex">
              <Box padding="8px">
                <Avatar
                  alt={currentUser?.userName}
                  src={currentUser?.imageAvatar}
                />
              </Box>
              <Box width="100%">
                <Box
                  // padding="8px"
                  // className={classes.nameCss}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Box color="primary.main" fontWeight="bold">
                    {currentUser?.userName}
                  </Box>
                </Box>
                <Box padding="8px" textAlign="start">
                  <TextFromField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    value={yourComment}
                    onChange={_onChangeYourComment}
                    placeholder="Viết bình luận"
                  />
                </Box>
                <Box
                  paddingLeft="8px"
                  display="flex"
                  justifyContent="flex-start"
                >
                  <Button
                    onClick={_onComment}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Bình luận
                  </Button>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Box margin="16px 0" fontStyle="italic">
          Đăng nhập để bình luận
        </Box>
      )}
      {commentList.map((cmt, index) => {
        return <ItemComponent key={cmt.id} cmt={cmt} />;
      })}
      <Box display="flex" justifyContent="center" margin="16px 0">
        <Pagination
          size={isMobile ? "small" : "medium"}
          // page={2}
          count={10}
          color="secondary"
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
});

CommentComponent.propTypes = {};

export default CommentComponent;

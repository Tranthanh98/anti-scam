import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAlert } from "../../../actions/alertify.action";
import { connectToContext } from "../../../components/BaseContext";
import TextFromField from "../../../components/TextFromField";
import * as httpClient from "../../../general/HttpClient";
import ItemComponent from "./ItemComponent";

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
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPage: 0,
  });

  const [yourComment, setYourComment] = useState("");

  const [commentHtml, setCommentHtml] = useState("");
  const dispatch = useDispatch();

  const _getComment = async (pageIndex) => {
    try {
      let postData = {
        postId: props.post.id,
        currentPage: pageIndex || pagination.currentPage,
      };
      let res = await httpClient.sendPost("/comment/GetComment", postData);
      if (res.data.isSuccess) {
        setCommentList(res.data?.data?.data);
        setPagination({
          totalPage: res.data?.data?.totalPage,
          currentPage: res.data?.data?.currentPage,
        });
      }
    } catch (e) {
      dispatch(addAlert("Có lỗi khi tải bình luận", "error"));
    }
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

  const _onClickComment = async () => {
    if (!yourComment || yourComment.length === 0) {
      dispatch(addAlert("Không được để trống bình luận", "error"));
      return;
    }
    let postData = {
      PostId: props.post.id,
      Content: yourComment,
    };
    try {
      let res = await httpClient.sendPost("/comment/create", postData);
      const response = res.data;
      if (response.isSuccess) {
        let cloneCommentList = [...commentList];
        cloneCommentList.unshift(response.data);
        setCommentList(cloneCommentList);
        setYourComment("");
      } else {
        throw new Error(response.messages);
      }
    } catch (e) {
      dispatch(addAlert(String(e), "error"));
    }
  };
  const _onKeyPressComment = (e) => {
    if (e.keyCode === 13) {
      let cloneYourComment = commentHtml + yourComment;
      cloneYourComment = cloneYourComment + "<br />";

      setCommentHtml(cloneYourComment);
    }
  };

  const _handleChangePage = (e, value) => {
    _getComment(value);
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
                    onClick={_onClickComment}
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={!yourComment || yourComment.length === 0}
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
      {commentList && commentList.length > 0 ? (
        commentList.map((cmt, index) => {
          return <ItemComponent key={cmt.id} cmt={cmt} />;
        })
      ) : (
        <Box fontStyle="italic">Chưa có bình luận nào</Box>
      )}
      <Box display="flex" justifyContent="center" margin="16px 0">
        <Pagination
          size={isMobile ? "small" : "medium"}
          page={pagination.currentPage}
          count={pagination.totalPage}
          onChange={_handleChangePage}
          color="secondary"
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
});

CommentComponent.propTypes = {};

const mapStateToProps = (context) => ({
  post: context.post,
});

export default connectToContext(mapStateToProps)(CommentComponent);

import {
  Box,
  Card,
  CardContent,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";
import { connectToContext } from "../../../components/BaseContext";
import PhotoSwipeWrapper from "../../../components/PhotoSwipe/PhotoSwipeWrapper";
import CommentComponent from "./CommentComponent";
import RightpageDetail from "./RightpageDetail";

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
  const { id, title, writer, object, typePosts, description, imageList } =
    props.post;

  const classes = useStyles();
  const theme = useTheme();
  const isMobile = window.mobileCheck();
  const [openImg, setOpenImg] = useState(false);
  const [indexImg, setIndexImg] = useState(0);

  const imgShows = imageList.map((i) => {
    return {
      src: i,
      w: 600,
      h: 400,
    };
  });

  const _openImage = (index) => {
    setIndexImg(index);
    setOpenImg(true);
  };
  const _onCloseImg = () => {
    setOpenImg(false);
  };
  return (
    <Box>
      {isMobile ? (
        <Box margin="16px 0">
          <RightpageDetail />
        </Box>
      ) : null}
      <Card>
        <Box textAlign="start" className={classes.titleCss}>
          <Box color="primary.main" fontSize={theme.spacing(2.5)}>
            {title}
          </Box>
          <Box textAlign="start" margin="8px 0">
            {typePosts.map((type, index) => {
              return (
                <Box display="flex" key={index}>
                  {type.type.name}:{" "}
                  <Box
                    textOverflow="ellipsis"
                    overflow="hidden"
                    marginLeft="4px"
                    color="error.main"
                    style={{ wordBreak: "break-all" }}
                  >
                    {type.object}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        <CardContent>
          <Box textAlign="start" margin="0 0 8px 0" fontWeight="500">
            Nội dung:
          </Box>
          <Box margin="0 16px" textAlign="start">
            {description}
          </Box>
          <Box
            // className={classes.imageTitleCss}
            textAlign="start"
            margin="16px 0"
            fontWeight="500"
          >
            Hình ảnh:
          </Box>
          <Box textAlign="start" display="flex" marginTop="8px">
            {!imageList || imageList.length === 0 ? (
              <Box>Không có hình ảnh nào được cung cấp</Box>
            ) : (
              imageList.map((image, index) => {
                return (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width="150px"
                    height="170px"
                    margin="8px"
                    onClick={() => _openImage(index)}
                  >
                    <img
                      src={image}
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                  </Box>
                );
              })
            )}
            <PhotoSwipeWrapper
              isOpen={openImg}
              index={indexImg}
              items={imgShows}
              onClose={_onCloseImg}
            />
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

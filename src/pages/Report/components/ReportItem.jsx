import {
  Box,
  Card,
  CardContent,
  Grid,
  Icon,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import React from "react";
import { useHistory } from "react-router";
import createLinkDetail from "../../../general/createLinkDetail";
import { formateDateTime } from "../../../general/helper";
import ChatBubbleIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: "16px 0",
  },
  title: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    minWidth: "100%",
    // height: "30px" ,
    // whiteSpace: "nowrap",
    display: "inline-block",
    textAlign: "start",
    color: theme.palette.primary.background,
  },
  cardCss: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

function ReportItem(props) {
  const classes = useStyles();
  const theme = useTheme();
  const {
    title,
    writer,
    reviewNumber,
    typePosts,
    createdDate,
    link,
    id,
    totalComment,
  } = props;

  const history = useHistory();

  const _gotoDetail = () => {
    const createLink = createLinkDetail(link, id);
    history.push(createLink);
  };
  return (
    <Box onClick={_gotoDetail} className={classes.wrapper}>
      <Card className={classes.cardCss}>
        <CardContent
          style={{ backgroundColor: props.isSummary ? "#e6e6e6" : undefined }}
        >
          <Box
            color="primary.dark"
            textAlign="start"
            fontSize={theme.spacing(2.5)}
            display="flex"
            alignItems="center"
          >
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
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Box display="flex" alignItems="center">
                <Icon>person</Icon>
                <Box textAlign="start" marginLeft="4px">
                  {writer}
                </Box>
              </Box>
            </Grid>
            {props.isSummary ? <Box width="18px"></Box> : null}
            <Grid
              item
              xs={6}
              sm={6}
              md={3}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Box
                display="flex"
                alignItems="center"
                textAlign="start"
                margin="8px 0"
              >
                <CalendarTodayIcon /> {formateDateTime(createdDate)}
              </Box>
            </Grid>
            {props.isSummary ? null : (
              <>
                <Grid
                  item
                  xs={3}
                  sm={6}
                  md={3}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Box
                    textAlign="start"
                    display="flex"
                    margin="8px 0"
                    alignItems="center"
                  >
                    <ChatBubbleIcon />
                    <Box
                      display="flex"
                      alignItems="center"
                      marginLeft="4px"
                      color="error.main"
                      fontSize="18px"
                    >
                      {totalComment}
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sm={6}
                  md={3}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Box
                    textAlign="start"
                    display="flex"
                    margin="8px 0"
                    alignItems="center"
                  >
                    <VisibilityIcon />
                    <Box
                      display="flex"
                      alignItems="center"
                      marginLeft="4px"
                      color="error.main"
                      fontSize="18px"
                    >
                      {reviewNumber}
                    </Box>
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

ReportItem.propTypes = {};

export default ReportItem;

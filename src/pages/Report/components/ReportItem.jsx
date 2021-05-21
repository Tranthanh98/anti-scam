import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Icon,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import React from "react";
import { formateDateTime } from "../../../general/helper";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useHistory } from "react-router";
import { Paths } from "../../route";
import createLinkDetail from "../../../general/createLinkDetail";

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
    object,
    reviewNumber,
    type,
    createdDate,
    link,
    id,
    comment,
  } = props;

  const history = useHistory();

  const _gotoDetail = () => {
    const createLink = createLinkDetail(link, id);
    history.push(createLink);
  };
  return (
    <Box onClick={_gotoDetail} className={classes.wrapper}>
      <Card className={classes.cardCss}>
        <CardContent>
          <Box
            color="primary.dark"
            textAlign="start"
            fontSize={theme.spacing(2.5)}
            display="flex"
            alignItems="center"
          >
            {title}
          </Box>
          <Box
            textAlign="start"
            display="flex"
            margin="8px 0"
            alignItems="center"
          >
            {type.label}:{" "}
            {type.value === 3 ? (
              <a style={{ marginLeft: 4 }} href={object} target="_blank">
                {object}
              </a>
            ) : (
              <Box
                textOverflow="ellipsis"
                overflow="hidden"
                marginLeft="4px"
                color="error.main"
              >
                {object}
              </Box>
            )}
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
            <Grid
              item
              xs={12}
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
                Ngày báo: {formateDateTime(createdDate)}
              </Box>
            </Grid>
            <Grid
              item
              xs={6}
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
                Comment:
                <Box
                  display="flex"
                  alignItems="center"
                  marginLeft="4px"
                  color="warning.main"
                >
                  {comment}
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={6}
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
                  color="warning.main"
                >
                  {reviewNumber}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

ReportItem.propTypes = {};

export default ReportItem;

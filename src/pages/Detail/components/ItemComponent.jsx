import { Avatar, Box, Card, CardContent, makeStyles } from "@material-ui/core";
import React from "react";
import { formateDateTime } from "../../../general/helper";

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

const ItemComponent = React.memo((props) => {
  const { cmt } = props;
  const classes = useStyles();
  return (
    <Card className={classes.cardCss}>
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
              alignItems="center"
            >
              <Box color="primary.main" fontSize="18px" fontWeight="bold">
                {cmt.name}
              </Box>
              <Box fontWeight="400" fontSize="14px" fontStyle="italic">
                {formateDateTime(cmt.createdDate, "DD/MM/YYYY hh:mm A")}
              </Box>
            </Box>
            <Box padding="8px" textAlign="start">
              <div dangerouslySetInnerHTML={{ __html: cmt.commentContent }} />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
});

ItemComponent.propTypes = {};

export default ItemComponent;

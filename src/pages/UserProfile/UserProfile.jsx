import { makeStyles } from "@material-ui/core";
import React from "react";
import BaseLayout from "../../components/BaseLayout";

const useStyles = makeStyles((theme) => ({}));

export default function UserProfile() {
  const classes = useStyles();
  return (
    <BaseLayout
      leftChilren={<div>User</div>}
      rightChildren={<div>Nothing here</div>}
    />
  );
}

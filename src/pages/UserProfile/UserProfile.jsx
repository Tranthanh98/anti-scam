import React from "react";
import BaseLayout from "../../components/BaseLayout";
import LeftPageProfile from "./components/LeftPageProfile";
import RightPageProfile from "./components/RightPageProfile";

export default function UserProfile() {
  return (
    <BaseLayout
      leftChilren={<LeftPageProfile />}
      rightChildren={<RightPageProfile />}
    />
  );
}

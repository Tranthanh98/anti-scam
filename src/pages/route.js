import { Icon } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AboutMeIcon from "@material-ui/icons/ChevronRight";
import HelpIcon from "@material-ui/icons/Help";
import ReportIcon from "@material-ui/icons/Report";
import React from "react";
import AboutMe from "./AboutMe";
import AskedQuestions from "./AskedQuestions";
import Detail from "./Detail";
import ReportPage from "./Report";
import ReputationPage from "./Reputation";
import UserProfile from "./UserProfile/UserProfile";

let i = 1;
function createRoute(title, icon, path, component, isShow = true) {
  return {
    id: i++,
    title,
    icon,
    path,
    component,
    isShow,
  };
}

export const Paths = {
  detail: "/detail/:link/:id",
  report: "/report",
  reputation: "/reputation",
  profile: "/profile",
  contact: "/contact",
  about: "/about-me",
  resetPassword: "/reset-password",
};
export default [
  createRoute("Detail", null, Paths.detail, Detail, false),
  createRoute("Báo cáo lừa đảo", <ReportIcon />, Paths.report, ReportPage),
  createRoute(
    "Dịch vụ uy tín",
    <Icon>verified_user</Icon>,
    Paths.reputation,
    ReputationPage
  ),
  createRoute(
    "Thông tin người dùng",
    <AccountCircleIcon />,
    Paths.profile,
    UserProfile
  ),
  createRoute("Về chúng tôi", <AboutMeIcon />, Paths.about, AboutMe),
  createRoute(
    "Câu hỏi thường gặp",
    <HelpIcon />,
    Paths.contact,
    AskedQuestions
  ),
];

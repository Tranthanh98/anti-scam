import { Icon } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AboutMeIcon from "@material-ui/icons/ChevronRight";
import ContactIcon from "@material-ui/icons/Mail";
import ReportIcon from "@material-ui/icons/Report";
import React from "react";
import AboutMe from "./AboutMe";
import Detail from "./Detail";
import ReportPage from "./Report";
import ReputationPage from "./Reputation";
import UserProfile from "./UserProfile/UserProfile";
import HelpIcon from "@material-ui/icons/Help";
import AskedQuestions from "./AskedQuestions";

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
};
export default [
  createRoute("Detail", null, Paths.detail, Detail, false),
  createRoute("Báo cáo lừa đảo", <ReportIcon />, Paths.report, ReportPage),
  createRoute(
    "Trang web uy tín",
    <Icon>verified_user</Icon>,
    Paths.reputation,
    ReputationPage
  ),
  createRoute("Profile", <AccountCircleIcon />, Paths.profile, UserProfile),
  createRoute("Về chúng tôi", <AboutMeIcon />, Paths.about, AboutMe),
  createRoute(
    "Câu hỏi thường gặp",
    <HelpIcon />,
    Paths.contact,
    AskedQuestions
  ),
];

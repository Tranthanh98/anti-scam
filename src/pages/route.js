import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ReportPage from "./Report";
import ReputationPage from "./Reputation";
import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import InfoIcon from "@material-ui/icons/Info";
import Detail from "./Detail";

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
  createRoute("Báo cáo xấu", <RemoveCircleIcon />, Paths.report, ReportPage),
  createRoute(
    "Trang web uy tín",
    <CheckCircleIcon />,
    Paths.reputation,
    ReputationPage
  ),
  createRoute("Profile", <AccountCircleIcon />, Paths.profile, ReportPage),
  createRoute("Liên hệ", <ContactPhoneIcon />, Paths.contact, ReportPage),
  createRoute("Về chúng tôi", <InfoIcon />, Paths.about, ReportPage),
];

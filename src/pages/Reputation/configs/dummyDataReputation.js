import { KIND_OF } from "../../../general/enum";
import { dummyData } from "../../Report/config/dummyDataReport";
import types from "../../Report/config/dummyTypes";

const dummyDataReputation = [
  dummyData(
    "Trang web này cực xịn",
    "Thanh dep trai 123",
    "02145568471",
    8,
    types[1],
    new Date(),
    "thang-cho",
    KIND_OF.Reputation
  ),
  dummyData(
    "Bạn này dẹp trai",
    "Thanh dep trai 123",
    "https://www.facebook.com/thanhtran2412/",
    8,
    types[3],
    new Date(),
    "thanh-dep-trai",
    KIND_OF.Reputation
  ),
  dummyData(
    "ahihi :))",
    "Thanh dep trai 123",
    "02145568471",
    8,
    types[1],
    new Date(),
    "alo-alo-toi-la-de-nhat-quoc-su-Hoa-Ky",
    KIND_OF.Reputation
  ),
  dummyData(
    "Thằng chó mày lừa bố mày",
    "Thanh dep trai 123",
    "02145568471",
    8,
    types[1],
    new Date(),
    "dep-trai-khoai-to",
    KIND_OF.Reputation
  ),
  dummyData(
    "Thằng chó mày lừa bố mày",
    "Thanh dep trai 123",
    "02145568471",
    8,
    types[1],
    new Date(),
    "nha-tien-tri-vu-tru-tran-dan",
    KIND_OF.Reputation
  ),
];

export default dummyDataReputation;

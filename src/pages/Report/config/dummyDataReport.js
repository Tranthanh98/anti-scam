import types from "./dummyTypes";

let id = 1;

function dummyData(
  title,
  writer,
  object,
  reviewNumber,
  type,
  createdDate,
  link
) {
  return {
    id: id++,
    title,
    writer,
    object,
    reviewNumber,
    type,
    createdDate,
    link,
  };
}
export default [
  dummyData(
    "Thằng chó mày lừa bố mày Thằng chó mày lừa bố mày Thằng chó mày lừa bố mày",
    "Thanh dep trai 123",
    "02145568471",
    8,
    types[1],
    new Date(),
    "thang-cho"
  ),
  dummyData(
    "Bạn này dễ thương :))",
    "Thanh dep trai 123",
    "https://www.facebook.com/hoaikhang.230798",
    8,
    types[2],
    new Date(),
    "thang-cho"
  ),
  dummyData(
    "Thằng chó mày lừa bố mày",
    "Thanh dep trai 123",
    "02145568471",
    8,
    types[1],
    new Date(),
    "alo-alo-toi-la-de-nhat-quoc-su-Hoa-Ky"
  ),
  dummyData(
    "Thằng chó mày lừa bố mày",
    "Thanh dep trai 123",
    "02145568471",
    8,
    types[1],
    new Date(),
    "dep-trai-khoai-to"
  ),
  dummyData(
    "Thằng chó mày lừa bố mày",
    "Thanh dep trai 123",
    "02145568471",
    8,
    types[1],
    new Date(),
    "nha-tien-tri-vu-tru-tran-dan"
  ),
];

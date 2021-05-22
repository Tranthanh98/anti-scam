import { KIND_OF } from "../../../general/enum";
import types from "./dummyTypes";

var dateTime = new Date();

let id = dateTime.getTime();

export function dummyData(
  title,
  writer,
  object,
  reviewNumber,
  type,
  createdDate,
  link,
  comment = 3,
  kindOf = KIND_OF.Cheat
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
    comment,
    description:
      "Sau này, chỉ có làm, chịu khó, cần cù thì bù siêng năng, chỉ có làm thì mới có ăn. Những cái loại không làm mà đòi có ăn thì ăn đồng bằng, ăn cát :))",
    imageList: [
      "https://i.pinimg.com/564x/3c/77/16/3c771649b5de0375b045a64599a6acf2.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Fq-fvoVqe1_R8hwTatkwtOBj-My42fAOyg&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4uDQ2Uomp7076bfVGEi-PWj0jCzJMvFMB8Q&usqp=CAU",
    ],
    kindOf,
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
    types[3],
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
  dummyData(
    "Trang web này cực xịn",
    "Thanh dep trai 123",
    "02145568471",
    8,
    types[1],
    new Date(),
    "thang-cho",
    4,
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
    5,
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
    6,
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
    9,
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
    1,
    KIND_OF.Reputation
  ),
];

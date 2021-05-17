import types from './dummyTypes';

let id = 1;

function dummyData(
    title,
    writer,
    object,
    reviewNumber,
    type,
    createdDate) {
    return {
        id: id++,
        title,
        writer,
        object,
        reviewNumber,
        type,
        createdDate
    }
}
export default [
    dummyData("Thằng chó mày lừa bố mày Thằng chó mày lừa bố mày Thằng chó mày lừa bố mày", "Thanh dep trai 123", "02145568471", 8, types[1], new Date()),
    dummyData("Bạn này dễ thương :))", "Thanh dep trai 123", "https://www.facebook.com/hoaikhang.230798", 8, types[2], new Date()),
    dummyData("Thằng chó mày lừa bố mày", "Thanh dep trai 123", "02145568471", 8, types[1], new Date()),
    dummyData("Thằng chó mày lừa bố mày", "Thanh dep trai 123", "02145568471", 8, types[1], new Date()),
    dummyData("Thằng chó mày lừa bố mày", "Thanh dep trai 123", "02145568471", 8, types[1], new Date()),
];

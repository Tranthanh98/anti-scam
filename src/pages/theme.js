import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette:{
        primary :{
            main:"#608fb9",
            light:"#608fb9",
            dark:"#13528a",
            background:"#000228", //màu header trang report
            selected:"#ccc"//màu được chọn
        },
        secondary:{
            main:"#41cc51",
            light:"#aef7b6",
            dark:"#41cc51"
        },
        // error:{
        //     main:"#f55a4e"
        // },
        // warning:{
        //     main:"#ffca28"
        // },
        // success:{main:"#4caf50"},
        // info:{main:"#26a69a"}
    },
    MuiButton: {
        size: 'small',
    },
    MuiTextField:{
        size:"small",
        variant:"outlined"
    }
})
export default theme;
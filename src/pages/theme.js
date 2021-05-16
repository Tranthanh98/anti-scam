import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette:{
        primary :{
            main:"#608fb9",
            light:"#608fb9",
            dark:"#ccc",
            selected:"#ccc"
        },
        secondary:{
            main:"#41cc51",
            light:"#41cc51",
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
})
export default theme;
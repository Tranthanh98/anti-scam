import { FormControl, InputBase, InputLabel, MenuItem, Select, TextField, withStyles } from '@material-ui/core'
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

class SelectOption extends Component {
    _onChangeSelect = (e) => {
        const { onChange } = this.props;
        let { value } = e.target;
        onChange(value);
    }
    render() {
        const {
            value,
            defaultValue,
            options,
            multiple,
            classes,
            label,
            width,
            variant
        } = this.props;
        console.log("variant:", variant);
        return (
            // <FormControl style={{minWidth:width}} className={classes.sizeSelect}>
            //     {label ? <InputLabel id="label-select-option">{label}</InputLabel> :null }
            //     <Select
            //         labelId="label-select-option"
            //         value={value}
            //         onChange={this._onChangeSelect}
            //         defaultValue={defaultValue ?? undefined}
            //         inputProps={{ 'aria-label': 'Without label' }}
            //         variant={variant}
            //         multiple={multiple}
            //         input={<BootstrapInput />}
            //         fullWidth
            //     >
            //         {
            //             options.map(i => {
            //                 return (
            //                     <MenuItem key={i.value} value={i.value}>{i.label}</MenuItem>
            //                 )
            //             })
            //         }
            //     </Select>
            // </FormControl>
            <TextField
                id="outlined-select-currency"
                select
                label={label}
                value={value}
                onChange={this._onChangeSelect}
                helperText={`Chọn ${label}`}
                variant={variant}
                fullWidth
                size="small"
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        )
    }
}
const styles = {
    sizeSelect: {
        height: 40,
        // minWidth:200
    }
}
SelectOption.propTypes = {
    variant: PropTypes.string,
    width: PropTypes.number,

}
SelectOption.defaultProps = {
    variant: "outlined",
    width: 200,

}

export default withStyles(styles)(SelectOption);

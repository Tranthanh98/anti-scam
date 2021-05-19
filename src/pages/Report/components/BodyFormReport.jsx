import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Grid, IconButton, TextField } from '@material-ui/core'
import SelectOption from '../../../components/SelectOption'
import types from '../config/dummyTypes'
import DeleteIcon from '@material-ui/icons/Delete';
import {DropzoneArea} from 'material-ui-dropzone'

const typeOptions = [...types].splice(1);

function BodyFormReport(props) {
    const [type, setType] = useState({});

    const [listTypeInput, setListType] = useState([]);

    const _onChangeType = (value) => {
        setType(value);
    }

    const _onClickAddType = () => {
        let cloneList = [...listTypeInput];
        let dataType = {
            type: type,
            data: null
        }
        cloneList.push(dataType);
        setListType(cloneList);
    }
    const _onDelete = (item) => {
        let cloneList = [...listTypeInput];
        let indexItem = listTypeInput.findIndex(i => i == item);
        cloneList.splice(indexItem, 1);
        setListType(cloneList);

    }
    const _uploadFile = (files)=>{
        console.log("files:", files);
    }
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        label="Title"
                        placeholder="Nhập title, phần này được xem như một trường tìm kiếm"
                        size="small"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <Grid container spacing={1}>
                                <Grid item xs={8} md={9}>
                                    <SelectOption
                                        value={type}
                                        onChange={_onChangeType}
                                        options={typeOptions}
                                        label="Thể loại"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={4} md={3}>
                                    <Button onClick={_onClickAddType} variant="contained">Thêm</Button>
                                </Grid>
                                {
                                    listTypeInput.map((item, index) => {
                                        return (
                                            <Grid key={index} item xs={12}>
                                                <Box display="flex">
                                                    <TextField
                                                        variant="outlined"
                                                        label={item.type.label}
                                                        placeholder={`Nhập ${item.type.label}`}
                                                        size="small"
                                                        fullWidth
                                                    />
                                                    <IconButton onClick={() => _onDelete(item)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box marginBottom="12px">
                                <TextField
                                    variant="outlined"
                                    label="Mô tả"
                                    placeholder="Mô tả bạn bị nó lừa như thế nào..."
                                    size="small"
                                    fullWidth
                                    rows={4}
                                    multiline
                                />
                            </Box>
                            <Box>
                                <DropzoneArea
                                    onChange={_uploadFile}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>



            </Grid>
        </Box>
    )
}

BodyFormReport.propTypes = {

}

export default BodyFormReport


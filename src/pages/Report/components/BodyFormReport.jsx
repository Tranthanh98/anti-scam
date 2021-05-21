import { Box, Button, Grid, IconButton, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useState } from "react";
import SelectOption from "../../../components/SelectOption";
import UploadComponent from "../../../components/UploadComponent";
import types from "../config/dummyTypes";

const typeOptions = [...types].splice(1);

function BodyFormReport(props) {
  const [type, setType] = useState(typeOptions[0]);

  const [listTypeInput, setListType] = useState([]);
  const [fileImages, setFileImage] = useState([]);

  const _onChangeType = (value) => {
    setType(value);
  };

  const _onClickAddType = () => {
    let cloneList = [...listTypeInput];
    let dataType = {
      type: type,
      data: null,
    };
    cloneList.push(dataType);
    setListType(cloneList);
  };

  const _onDeleteForm = (item) => {
    let cloneList = [...listTypeInput];
    let indexItem = listTypeInput.findIndex((i) => i == item);
    cloneList.splice(indexItem, 1);
    setListType(cloneList);
  };

  const _onChangeValueType = (e, item) => {
    let cloneList = [...listTypeInput];
    let findItem = cloneList.find((i) => i == item);
    findItem.data = e.target.value;
    setListType(cloneList);
  };

  const _onUploadFile = async (e) => {
    const { files } = e.target;
    const fileList = [];
    for (let i of files) {
      let reader = new FileReader();
      let url = await reader.readAsDataURL(i);
      reader.onloadend = async function (m) {
        fileList.push(reader.result);
        const cloneImageList = [...fileImages, ...fileList];
        await setFileImage(cloneImageList);
      };
    }
  };
  const _onDeleteImage = (image) => {
    let cloneListImage = [...fileImages];
    const index = fileImages.findIndex((i) => i == image);
    if (index != -1) {
      cloneListImage.splice(index, 1);
      setFileImage(cloneListImage);
    }
  };
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
                  <Button onClick={_onClickAddType} variant="contained">
                    Thêm
                  </Button>
                </Grid>
                {listTypeInput.map((item, index) => {
                  return (
                    <Grid key={index} item xs={12}>
                      <Box display="flex" marginBottom="12px">
                        <TextField
                          variant="outlined"
                          label={item.type.label}
                          placeholder={`Nhập ${item.type.label}`}
                          size="small"
                          fullWidth
                          value={item.data}
                          onChange={(e) => _onChangeValueType(e, item)}
                          error={!Boolean(item.data)}
                          helperText={
                            !Boolean(item.data)
                              ? "*Trường này là bắt buộc"
                              : null
                          }
                        />
                        <IconButton
                          style={{ width: 40, height: 40 }}
                          sty
                          onClick={() => _onDeleteForm(item)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  );
                })}
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
              <Box marginBottom="12px">
                {/* <DropzoneArea onChange={_uploadFile} /> */}
                <UploadComponent onChange={_onUploadFile} />
              </Box>
              <Grid container spacing={1}>
                {fileImages.map((ima, index) => {
                  return (
                    <Grid item xs={1} sm={4} style={{ maxHeight: 150 }}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        height="100%"
                        position="relative"
                      >
                        <IconButton
                          style={{ position: "absolute", top: 0, right: -15 }}
                          onClick={() => _onDeleteImage(ima)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <img
                          src={ima}
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                      </Box>
                    </Grid>
                  );
                })}
                {/* <Grid item xs={1} sm={4}>
                    
                </Grid> */}
              </Grid>
              {/* <Box display="block"></Box> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

BodyFormReport.propTypes = {};

export default BodyFormReport;

import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { selectLanguageAct } from '../actions/select-language';

const languages = [
    {
        value: 1,
        title: "Việt Nam"
    },
    {
        value: 2,
        title: "English"
    }
]

function SelectLanguage(props) {
    const isMobile = window.mobileCheck();
    const lang = useSelector(state=>state.selectLanguage);

    const dispatch = useDispatch();
    return (
        <Box 
        display="flex"
        alignItems="flex-end">
            {!isMobile ? <Box marginRight="4px" color="white">Ngôn ngữ :</Box> : null}
            <select
                value={lang.value}
                onChange={(value) => dispatch(selectLanguageAct(value))}
            >
                {
                    languages.map((item,index) => {
                        return <option key={index}>{item.title}</option>
                    })
                }
            </select>
        </Box>
    )
}

SelectLanguage.propTypes = {

}

export default SelectLanguage


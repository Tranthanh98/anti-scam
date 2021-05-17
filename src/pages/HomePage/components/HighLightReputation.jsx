import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Divider } from '@material-ui/core'
import data from '../configs/dummyDataHighLight';
import HighlightItem from './HighlightItem';

function HighLightReputation(props) {
    return (
        <Card>
            <CardContent>
                {data.map((post, index)=>{
                    return (
                        <React.Fragment key={index}>
                            <HighlightItem
                                {...post}
                            />
                            <Divider/>
                        </React.Fragment>
                    )
                })}
            </CardContent>
        </Card>
    )
}

HighLightReputation.propTypes = {

}

export default HighLightReputation


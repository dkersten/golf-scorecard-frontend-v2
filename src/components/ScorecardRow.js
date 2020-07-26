import React from 'react';

const ScorecardRow = (props) => {

    // const index = props.num

    return(
        <tr>
            <td>{props.num}</td>
            <td>Par</td>
            <td>Score</td>
        </tr>
    )
}

export default ScorecardRow
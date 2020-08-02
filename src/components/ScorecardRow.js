import React from 'react';

const ScorecardRow = (props) => {

    const index = props.num

    // passes hole num and par up to scorecard component
    const handleParChange = (e) => {
        props.changeParFunc(e.target.value, index)
    }

    // passes hole num and score up to scorecard component
    const handleScoreChange = (e) => {
        props.changeScoreFunc(e.target.value, index)
    }

    return(
        <tr>
            <td>{props.num}</td>
            <td><input value={props.pars[index]} onChange={handleParChange} type="number" placeholder="Par" /></td>
            
            <td><input value={props.scores[index]} onChange={handleScoreChange} type="number" placeholder="Score" /></td>
        </tr>
    )
}

export default ScorecardRow
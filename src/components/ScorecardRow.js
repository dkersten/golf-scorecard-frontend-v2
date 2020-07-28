import React from 'react';

const ScorecardRow = (props) => {

    const index = props.num
    // console.log(index)

    const handleParChange = (e) => {
        console.log(`Par ${e.target.value}`)
    }

    const handleScoreChange = (e) => {
        console.log(`Score ${e.target.value}`)
    }
    // console.log(props.scores[index])

    return(
        <tr>
            <td>{props.num}</td>
            <td><input value={props.pars[index]} onChange={handleParChange} type="number" placeholder="Par" /></td>
            <td><input value={props.scores[index]} onChange={handleScoreChange} type="number" placeholder="Score" /></td>
        </tr>
    )
}

export default ScorecardRow
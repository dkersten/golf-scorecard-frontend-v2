import React from 'react';

const ScorecardRow = (props) => {

    const index = props.num

    // passes hole num and par up to scorecard component
    // const handleParChange = (e) => {
    //     props.changeParFunc(e.target.value, index)
    // }

    const handleParChange = (e) => {
        props.changeParFunc(parseInt(e.target.textContent), index)
    }

    // passes hole num and score up to scorecard component
    const handleScoreChange = (e) => {
        props.changeScoreFunc(parseInt(e.target.textContent), index)
    }

    const handlePar = () => {
        props.toggleModalFunc("par", props.num)
    }
    const handleScore = () => {
        props.toggleModalFunc("score", props.num)
    }

    return(
        <tr>
            <td>{props.num}</td>
            
            <td className="user-data"><div onClick={handlePar} onChange={handleParChange}>{props.pars[index]}</div></td>

            <td className="user-data"><div onClick={handleScore} onChange={handleScoreChange}>{props.scores[index]}</div></td>
        </tr>
    )
}

export default ScorecardRow
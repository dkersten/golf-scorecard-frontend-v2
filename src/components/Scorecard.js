import React, {useState} from 'react';
import ScorecardRow from './ScorecardRow';

const Scorecard = () => {

    // state for scorecard
    // const [editing, setEditing] = useState(false)
    const [numHoles, setNumHoles] = useState('')
    const [parsState, setParsState] = useState({
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0
    })
    const [scoresState, setScoresState] = useState({
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0
    })
    const [courseName, setCourseName] = useState('')

    // render scorecard options
    const scorecardOptions = () => {
        return(
            <div>
                <h2>Scorecard Options</h2>
                <div className="controls">
                    <p>How many holes?</p>
                    <button onClick={renderFront9} className="btn">Front 9</button>
                    <button onClick={renderBack9} className="btn">Back 9</button>
                    <button onClick={render18Holes} className="btn">18 Holes</button>
                </div>
            </div>
        )
    }

    //render front 9 holes
    const renderFront9 = () => {
        setNumHoles('f9')
    }

    //render back 9 holes
    const renderBack9 = () => {
        setNumHoles('b9')
    }

    //render 18 holes
    const render18Holes = () => {
        setNumHoles('18')
    }

    // renders the correct holes based on user's choice
    const cardNumHoles = () => {
        if (numHoles === 'f9') {
            const rows = []

            for (let i = 1; i <= 9; i++) {
                rows.push( <ScorecardRow key={i} num={i} scores={scoresState} pars={parsState} changeScoreFunc={updateScores} changeParFunc={updatePars} /> )
            }
            return rows

        } else if (numHoles === 'b9') {
            const rows = []

            for (let i = 10; i <= 18; i++) {
                rows.push( <ScorecardRow key={i} num={i} scores={scoresState} pars={parsState} changeScoreFunc={updateScores} changeParFunc={updatePars} /> )
            }
            return rows

        } else if (numHoles === "18") {
            const rows = []

            for (let i = 1; i <= 18; i++) {
                rows.push( <ScorecardRow key={i} num={i} scores={scoresState} pars={parsState} changeScoreFunc={updateScores} changeParFunc={updatePars} /> )
            }
            return rows

        }
    }

    // function to fully controll course name input
    const handleCourseNameChange = (e) => {
        setCourseName(e.target.value)
        // console.log(e.target.value)
    }

    // function (passed down to scorecardRow) to update the pars in state
    const updatePars = (par, holeNum) => {
        const parInt = parseInt(par)
        setParsState({
            ...parsState,
            [holeNum]: parInt
        })
    }

    // function (passed down to scorecardRow) to update the scores in state
    const updateScores = (score, holeNum) => {
        const scoreInt = parseInt(score)
        setScoresState({
            ...scoresState,
            [holeNum]: scoreInt
        })
    }

    // helper function to add up totals in objects
    const add = (a,b) => a + b

    // function to compute par total
    const computeParTotal = () => {
        const parScores = Object.values(parsState)
        if (parScores.includes(NaN)) {
            return "-"
        } else {
            const sum = parScores.reduce(add)
            return sum
        }
    }

    // function to compute score total
    const computeScoreTotal = () => {
        const scores = Object.values(scoresState)
        if (scores.includes(NaN)) {
            return "-"
        } else {
            const sum = scores.reduce(add)
            if (sum === 0) {
                return "-"
            } else {
                return sum
            }
        }
    }

    return(
        <div className="scorecard">
            <main>
                <div className="inner-container">
                    <div className="scorecard-options card">
                        {
                            scorecardOptions()
                        }
                    </div>
                    <form>
                        <table>
                            <thead>
                                <tr>
                                    <th>Hole</th>
                                    <th>Par</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cardNumHoles()
                                }
                                <tr>
                                    <td>Total</td>
                                    <td>{ computeParTotal() }</td>
                                    <td>{ computeScoreTotal() }</td>
                                </tr>
                                <tr>
                                    <td colSpan="3">Course: <input className="course" type="text" onChange={handleCourseNameChange} value={courseName} placeholder="Course name" /></td>
                                </tr>
                                <tr>
                                    <td colSpan="3">
                                        <input className="btn" type="submit" />
                                    </td>                                 
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Scorecard
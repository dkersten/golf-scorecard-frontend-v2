import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import ScorecardRow from './ScorecardRow';

const Scorecard = (props) => {

    // state for scorecard
    const [numHoles, setNumHoles] = useState('')
    const [parsState, setParsState] = useState({
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0
    })
    const [scoresState, setScoresState] = useState({
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0
    })
    const [courseName, setCourseName] = useState('')
    const [editing, setEditing] = useState(false)
    const [scorecardToEdit, setScorecardToEdit] = useState({})

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

    /////// Code below deals with submitting new and edited scorecards, controlling edited scorecards

    useEffect(() => {
        // this is only executed once
        if (typeof props.scorecardID === 'number') {
            setEditing(true)
            fetch(`http://localhost:3000/api/v1/scorecards/${props.scorecardID}`)
                .then(resp => resp.json())
                .then(scorecard => populateDataToEdit(scorecard))
        }
      }, [])

    //   populate the scorecard data to the form
    const populateDataToEdit = (scorecard) => {

        const pars = {
            ...scorecard.f9_par,
            ...scorecard.b9_par
        }
        console.log(pars)

        const scores = {
            ...scorecard.f9_score,
            ...scorecard.b9_score
        }
        console.log(scores)

        if (scorecard.b9_score === null) {
            setNumHoles('f9')
        } else if (scorecard.f9_score === null) {
            setNumHoles('b9')
        } else if (scorecard.f9_score !== null && scorecard.b9_score !== null) {
            setNumHoles('18')
            setParsState(pars)
            setScoresState(scores)
            setCourseName(scorecard.course)
        }
    }

    //determine if new scorecard or editing existing scorecard
    const scorecardType = (e) => {
        if (editing) {
            // console.log("editing scorecard")
        } else {
            postNewScorecard(e)
        }
    }
    console.log(editing)

    // format data in state to prepare for DB data structure
    const f9p = {
        1: parsState[1], 2: parsState[2], 3: parsState[3], 4: parsState[4], 5: parsState[5], 6: parsState[6], 7: parsState[7], 8: parsState[8], 9: parsState[9]
    }
    const f9s = {
        1: scoresState[1], 2: scoresState[2], 3: scoresState[3], 4: scoresState[4], 5: scoresState[5], 6: scoresState[6], 7: scoresState[7], 8: scoresState[8], 9: scoresState[9]
    }
    const b9p = {
        10: parsState[10], 11: parsState[11], 12: parsState[12], 13: parsState[13], 14: parsState[14], 15: parsState[15], 16: parsState[16], 17: parsState[17], 18: parsState[18]
    }
    const b9s = {
        10: scoresState[10], 11: scoresState[11], 12: scoresState[12], 13: scoresState[13], 14: scoresState[14], 15: scoresState[15], 16: scoresState[16], 17: scoresState[17], 18: scoresState[18]
    }

    //post new scorecard to database
    const postNewScorecard = (e) => {

        e.preventDefault()
        if (numHoles === 'f9') {
            
            fetch("http://localhost:3000/api/v1/scorecards", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    user_id: props.userID,
                    f9_par: f9p,
                    f9_score: f9s,
                    b9_par: null,
                    b9_score: null,
                    course: courseName
                })
            })
                .then(resp => resp.json())
                .then(scorecard => props.updateScorecardsFunc(scorecard))
                .then(() => resetScorecard())
                .then(() => props.history.push('/profile'))


        } else if (numHoles === 'b9') {
            
            fetch("http://localhost:3000/api/v1/scorecards", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    user_id: props.userID,
                    f9_par: null,
                    f9_score: null,
                    b9_par: b9p,
                    b9_score: b9s,
                    course: courseName
                })
            })
                .then(resp => resp.json())
                .then(scorecard => props.updateScorecardsFunc(scorecard))
                .then(() => resetScorecard())
                .then(() => props.history.push('/profile'))

        } else if (numHoles === '18') {
            
            fetch("http://localhost:3000/api/v1/scorecards", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    user_id: props.userID,
                    f9_par: f9p,
                    f9_score: f9s,
                    b9_par: b9p,
                    b9_score: b9s,
                    course: courseName
                })
            })
                .then(resp => resp.json())
                .then(scorecard => props.updateScorecardsFunc(scorecard))
                .then(() => resetScorecard())
                .then(() => props.history.push('/profile'))

        }
    }

    // function to reset state for par, score, hole nums, and course name
    const resetScorecard = () => {
        setParsState({
            1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0
        })
        setScoresState({
            1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0
        })
        setNumHoles('')
        setCourseName('')
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
                                    <td colSpan="3">Course: <input className="course" type="text" onChange={handleCourseNameChange} value={courseName} placeholder="Course name" required /></td>
                                </tr>
                                <tr>
                                    <td colSpan="3">
                                        <input onClick={scorecardType} className="btn" type="submit" />
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

export default withRouter(Scorecard)
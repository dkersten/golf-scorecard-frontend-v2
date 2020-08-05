import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ScorecardRow from './ScorecardRow.js';
import Modal from './Modal.js';

const Scorecard = (props) => {

    const { user, isAuthenticated } = useAuth0();

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
    const [showModal, setShowModal] = useState(false)
    const [inputType, setInputType] = useState('')
    const [currentHoleBeingEdited, setCurrentHoleBeingEdited] = useState('')

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
                rows.push( <ScorecardRow 
                    key={i}
                    num={i}
                    scores={scoresState}
                    pars={parsState}
                    changeScoreFunc={updateScores}
                    changeParFunc={updatePars}
                    toggleModalFunc={toggleModal}
                /> )
            }
            return rows

        } else if (numHoles === 'b9') {
            const rows = []

            for (let i = 10; i <= 18; i++) {
                rows.push( <ScorecardRow
                    key={i}
                    num={i}
                    scores={scoresState}
                    pars={parsState}
                    changeScoreFunc={updateScores}
                    changeParFunc={updatePars}
                    toggleModalFunc={toggleModal}
                /> )
            }
            return rows

        } else if (numHoles === "18") {
            const rows = []

            for (let i = 1; i <= 18; i++) {
                rows.push( <ScorecardRow
                    key={i}
                    num={i}
                    scores={scoresState}
                    pars={parsState}
                    changeScoreFunc={updateScores}
                    changeParFunc={updatePars}
                    toggleModalFunc={toggleModal}
                /> )
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
        if (typeof props.scorecardID === 'number') {
            const id = props.scorecardID
            setEditing(true)
            fetch(`http://localhost:3000/api/v1/scorecards/${id}`)
                .then(resp => resp.json())
                .then(scorecard => populateDataToEdit(scorecard))
        }
      }, [])

    //   populate the scorecard data to the form
    const populateDataToEdit = (scorecard) => {

        // adds scorecard to state to access info later
        setScorecardToEdit(scorecard)

        // populates when round was just front 9
        if (scorecard.b9_score === null) {
            setNumHoles('f9')
            setCourseName(scorecard.course)

            const b9_par = {10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0}
            const pars = {
                ...scorecard.f9_par,
                ...b9_par
            }
            setParsState(pars)

            const b9_score = {10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0}
            const scores = {
                ...scorecard.f9_score,
                ...b9_score
            }
            setScoresState(scores)
            
        // populates when round was just back 9
        } else if (scorecard.f9_score === null) {
            setNumHoles('b9')
            setCourseName(scorecard.course)

            const f9_par = {1:0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0}
            const pars = {
                ...f9_par,
                ...scorecard.b9_par
            }
            setParsState(pars)

            const f9_score = {1:0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0}
            const scores = {
                ...f9_score,
                ...scorecard.b9_score
            }
            setScoresState(scores)

        // populates when round was 18 holes
        } else if (scorecard.f9_score !== null && scorecard.b9_score !== null) {
            const pars = {
                ...scorecard.f9_par,
                ...scorecard.b9_par
            }
    
            const scores = {
                ...scorecard.f9_score,
                ...scorecard.b9_score
            }

            setNumHoles('18')
            setCourseName(scorecard.course)
            setParsState(pars)
            setScoresState(scores)
        }
    }

    //determine if new scorecard or editing existing scorecard
    const scorecardType = (e) => {
        if (editing) {
            patchEditScorecard(e)
        } else {
            postNewScorecard(e)
        }
    }

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

    // function to calculate pars, bogeys, etc. also invokes conditional POST/PATCH
    const calculateRoundStats = () => {
        let eagle = 0, birdie = 0, par = 0, bogey = 0, other = 0

        //Create array of pars
        const pArr = Object.values(parsState)
        const f9pArr = pArr.slice(0, 9)
        const b9pArr = pArr.slice(9,18)

        //Create array of scores
        const sArr = Object.values(scoresState)
        const f9sArr = sArr.slice(0,9)
        const b9sArr = sArr.slice(9,18)

        // helper function to calculate breakdown of front 9
        const roundBreakdownFront = () => {
            const scoreF = f9sArr.map((n, i) => n - f9pArr[i])
            for (let i = 0; i < scoreF.length; i++) {
                if (scoreF[i] === -2) {
                    eagle = eagle + 1
                } else if (scoreF[i] === -1) {
                    birdie = birdie + 1
                } else if (scoreF[i] === 0) {
                    par = par + 1
                } else if (scoreF[i] === 1) {
                    bogey = bogey + 1
                } else {
                    other = other + 1
                }
            }
        }

        // helper function to calculate breakdown of back 9
        const roundBreakdownBack = () => {
            const scoreB = b9sArr.map((n, i) => n - b9pArr[i])
            for (let i = 0; i < scoreB.length; i++) {
                if (scoreB[i] === -2) {
                    eagle = eagle + 1
                } else if (scoreB[i] === -1) {
                    birdie = birdie + 1
                } else if (scoreB[i] === 0) {
                    par = par + 1
                } else if (scoreB[i] === 1) {
                    bogey = bogey + 1
                } else {
                    other = other + 1
                }
            }
        }

        if (editing) {
            if (numHoles === 'f9') {
                roundBreakdownFront()
                patchEdit(f9p, f9s, null, null, 9, eagle, birdie, par, bogey, other)
            } else if (numHoles === 'b9') {
                roundBreakdownBack()
                patchEdit(null, null, b9p, b9s, 9, eagle, birdie, par, bogey, other)
            } else if (numHoles === '18') {
                roundBreakdownFront()
                roundBreakdownBack()
                patchEdit(f9p, f9s, b9p, b9s, 18, eagle, birdie, par, bogey, other)
            }
        } else {
            if (numHoles === 'f9') {
                roundBreakdownFront()
                postNew(f9p, f9s, null, null, 9, eagle, birdie, par, bogey, other)
            } else if (numHoles === 'b9') {
                roundBreakdownBack()
                postNew(null, null, b9p, b9s, 9, eagle, birdie, par, bogey, other)
            } else if (numHoles === '18') {
                roundBreakdownFront()
                roundBreakdownBack()
                postNew(f9p, f9s, b9p, b9s, 18, eagle, birdie, par, bogey, other)
            }
        }
    }

    // helper function for patch to DB
    const patchEdit = (f9Par, f9Score, b9Par, b9Score, holes, eagles, birdies, pars, bogeys, others) => {
        const id = scorecardToEdit.id
        fetch(`http://localhost:3000/api/v1/scorecards/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    f9_par: f9Par,
                    f9_score: f9Score,
                    b9_par: b9Par,
                    b9_score: b9Score,
                    course: courseName,
                    holes: holes,
                    eagles: eagles,
                    birdies: birdies,
                    pars: pars,
                    bogeys: bogeys,
                    other_scores: others
                })
            })
                .then(resp => resp.json())
                .then(scorecard => props.scorecardEditFunc(scorecard))
                .then(() => resetScorecard())
                .then(() => props.history.push('/profile'))
    }

    //patch existing scorecard to database
    const patchEditScorecard = (e) => {
        e.preventDefault()
        calculateRoundStats()    
    }

    // helper function to post new scorecard to DB
    const postNew = (f9Par, f9Score, b9Par, b9Score, holes, eagles, birdies, pars, bogeys, others) => {
        fetch("http://localhost:3000/api/v1/scorecards", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    user_id: props.userID,
                    f9_par: f9Par,
                    f9_score: f9Score,
                    b9_par: b9Par,
                    b9_score: b9Score,
                    course: courseName,
                    holes: holes,
                    eagles: eagles,
                    birdies: birdies,
                    pars: pars,
                    bogeys: bogeys,
                    other_scores: others
                })
            })
                .then(resp => resp.json())
                .then(scorecard => props.updateScorecardsFunc(scorecard))
                .then(() => resetScorecard())
                .then(() => props.history.push('/profile'))
    }

    //post new scorecard to database
    const postNewScorecard = (e) => {
        e.preventDefault()
        calculateRoundStats()
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
        setEditing(false)
        setShowModal(false)
        setInputType('')
        setCurrentHoleBeingEdited('')
    }

    // function to toggle modal to true (passed down to modal component), updates current hole being edited in state so update par/score functions can be called too
    const toggleModal = (text, currentHole) => {
        setShowModal(!showModal)
        setCurrentHoleBeingEdited(currentHole)
        if (text === "par") {
            setInputType("par")
        } else if (text === "score") {
            setInputType("score")
        }
    }

    const updateHolePar = (hPar) => {
        updatePars(parseInt(hPar), parseInt(currentHoleBeingEdited))
    }

    const updateHoleScore = (hScore) => {
        updateScores(parseInt(hScore), parseInt(currentHoleBeingEdited))
    }

    return(
        isAuthenticated && (
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
                    { showModal 
                        ? 
                            <Modal 
                                toggleModalFunc={toggleModal}
                                modalType={inputType}
                                updateHoleParFunc={updateHolePar}
                                updateHoleScoreFunc={updateHoleScore}
                            /> 
                        : 
                            null 
                    }
                </main>
            </div>
        )
    )
}

export default withRouter(Scorecard)
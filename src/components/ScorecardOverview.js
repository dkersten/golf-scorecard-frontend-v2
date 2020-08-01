import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const ScorecardOverview = (props) => {

    // function to turn created_at date from scorecard DB to readable date
    const formatRoundDate = () => {
        let dateObj = new Date(props.date)
        let month = dateObj.getMonth()
        let day = String(dateObj.getDate()).padStart(2, '0')
        let year = dateObj.getFullYear()
        let date = `${month}/${day}/${year}`
        return date
    }

    const [showRoundOptions, setShowRoundOptions] = useState('false')

    // helper function to sum all array indexes
    const add = (a,b) => a + b

    // function to compute round score
    const computeRoundScore = () => {
        // console.log(props.f9p, props.f9s, props.b9p, props.b9s)
        if (props.f9s !== null && props.b9s !== null) {
            const scoresFront = Object.values(props.f9s)
            const scoresBack = Object.values(props.b9s)
            const scores = scoresFront.concat(scoresBack)
            const sum = scores.reduce(add)
            return `${sum} (18 holes)`
        } else if (props.b9s === null) {
            const scores = Object.values(props.f9s)
            const sum = scores.reduce(add)
            return `${sum} (9 holes)`
        } else if (props.f9s === null) {
            const scores = Object.values(props.b9s)
            const sum = scores.reduce(add)
            return `${sum} (9 holes)`
        }
    }

    ////// Functions below deal with more/hide options functionality

    //function to toggle more round options/info
    const toggleMore = () => {
        setShowRoundOptions(!showRoundOptions)
    }

    // function to render the front 9 hole numbers on scorecard preview
    const renderFront9Hole = () => {
        const holeCells = [<th key={0}>Hole</th>]
        if (props.f9s === null) {
            return null
        } else {
            for (const key in props.f9s) {
                holeCells.push(<th key={key}>{ key }</th>)
            }
        }
        return holeCells
    }

    // function to render the front 9 par ratings on scorecard preview
    const renderFront9Par = () => {
        const parCells = [<th key={0}>Par</th>]
        if (props.f9p === null) {
            return null
        } else {
            for (const key in props.f9p) {
                parCells.push(<td key={key}>{ props.f9p[key] }</td>)
            }
        }
        return parCells
    }

    // function to render the front 9 scores on scorecard preview
    const renderFront9Scores = () => {
        const scoreCells = [<th key={0}>Score</th>]
        if (props.f9s === null) {
            return null
        } else {
            for (const key in props.f9s) {
                scoreCells.push(<td key={key}>{ props.f9s[key] }</td>)
            }
        }
        return scoreCells
    }

    // function to render the back 9 hole numbers on scorecard preview
    const renderBack9Hole = () => {
        const holeCells = [<th key={0}>Hole</th>]
        if (props.b9s === null) {
            return null
        } else {
            for (const key in props.b9s) {
                holeCells.push(<th key={key}>{ key }</th>)
            }
        }
        return holeCells
    }

    // function to render the front 9 par ratings on scorecard preview
    const renderBack9Par = () => {
        const parCells = [<th key={0}>Par</th>]
        if (props.b9p === null) {
            return null
        } else {
            for (const key in props.b9p) {
                parCells.push(<td key={key}>{ props.b9p[key] }</td>)
            }
        }
        return parCells
    }

    // function to render the front 9 scores on scorecard preview
    const renderBack9Scores = () => {
        const scoreCells = [<th key={0}>Score</th>]
        if (props.b9s === null) {
            return null
        } else {
            for (const key in props.b9s) {
                scoreCells.push(<td key={key}>{ props.b9s[key] }</td>)
            }
        }
        return scoreCells
    }

    // render scorecard table for just front 9
    const renderFront9Table = () => {
        return(
            <table>
                <thead>
                    <tr>{ renderFront9Hole() }</tr>
                    <tr>{ renderFront9Par() }</tr>
                    <tr>{ renderFront9Scores() }</tr>
                </thead>
            </table>
        )
    }

    // render scorecard table for just back 9
    const renderBack9Table = () => {
        return(
            <table>
                <thead>
                    <tr>{ renderBack9Hole() }</tr>
                    <tr>{ renderBack9Par() }</tr>
                    <tr>{ renderBack9Scores() }</tr>
                </thead>
            </table>
        )
    }

    // render scorecard table for 18 holes
    const render18HolesTable = () => {
        return(
            <div>
                <table>
                    <thead>
                        <tr>{ renderFront9Hole() }</tr>
                        <tr>{ renderFront9Par() }</tr>
                        <tr>{ renderFront9Scores() }</tr>
                    </thead>
                </table>

                <table>
                    <thead>
                        <tr>{ renderBack9Hole() }</tr>
                        <tr>{ renderBack9Par() }</tr>
                        <tr>{ renderBack9Scores() }</tr>
                    </thead>
                </table>
            </div>
        )
    }

    // render scorecard breakdown (eagles, birdies, pars, etc.)
    const roundBreakdown = () => {
        let eagle = 0
        let birdie = 0
        let par = 0
        let bogey = 0
        let other = 0

        // helper function to calculate breakdown of front 9
        const roundBreakdownFront = (f9p, f9s) => {
            const scoreF = f9s.map((n, i) => n - f9p[i])
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
        const roundBreakdownBack = (b9p, b9s) => {
            const scoreB = b9s.map((n, i) => n - b9p[i])
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

        // breakdown 18 holes
        if (props.f9s !== null && props.b9s !== null) {
            // caculate front 9
            const f9pArr = Object.values(props.f9p)
            const f9sArr = Object.values(props.f9s)
            roundBreakdownFront(f9pArr, f9sArr)
            // calculate back 9
            const b9pArr = Object.values(props.b9p)
            const b9sArr = Object.values(props.b9s)
            roundBreakdownBack(b9pArr, b9sArr)
            
        } else if (props.b9s === null) {
            const f9pArr = Object.values(props.f9p)
            const f9sArr = Object.values(props.f9s)
            roundBreakdownFront(f9pArr, f9sArr)

        } else if (props.f9s === null) {
            const b9pArr = Object.values(props.b9p)
            const b9sArr = Object.values(props.b9s)
            roundBreakdownBack(b9pArr, b9sArr)
        }

        return(
            <table>
                <thead>
                    <tr>
                        <th>Eagle</th>
                        <th>Birdie</th>
                        <th>Par</th>
                        <th>Bogey</th>
                        <th>Other</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{eagle}</td>
                        <td>{birdie}</td>
                        <td>{par}</td>
                        <td>{bogey}</td>
                        <td>{other}</td>
                    </tr>
                </tbody>
            </table>
        )
    }

    // function to edit a scorecard (passes up to app, down to scorecard)
    const handleScorecardEdit = (e) => {
        props.updateEditScorecardFunc(props.id)
    }

    // function to delete a scorecard
    const handleScorecardDelete = () => {
        fetch(`http://localhost:3000/api/v1/scorecards/${props.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              }
        })
            .then(resp => resp.json())
            .then(() => props.deleteScorecardFunc(props.id))
    }

    return(
        <div className="scorecard-overview card">
            <p>Course: <span>{ props.courseName }</span></p>
            <p>Date: <span>{ formatRoundDate() }</span></p>
            <p>Round Score: <span>{ computeRoundScore() }</span></p>
            {
                showRoundOptions ? 
                    <button onClick={toggleMore} className="show">Show Options &#x25BE;</button>
                    :       
                    <button onClick={toggleMore} className="hide">Hide Options &#x25B4;</button>
            }

            {
                showRoundOptions ?
                    null
                    :
                    <div className="options">
                    {
                        props.f9s === null && renderBack9Table()
                    }
                    {
                        props.b9s === null && renderFront9Table()
                    }
                    {
                        props.f9s !== null && props.b9s !== null && render18HolesTable()
                    }
                    { roundBreakdown() }

                        {/* <NavLink to="/scorecard/edit" onClick={this.editRound} className="btn edit">Edit</NavLink>
                        <button onClick={this.deleteRound} className="btn delete">Delete</button> */}
                        <div className="btn-container">
                            <NavLink to="/scorecard/edit" onClick={handleScorecardEdit} className="btn edit">Edit Round</NavLink>
                            <button onClick={handleScorecardDelete} className="btn delete">Delete Round</button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default ScorecardOverview;
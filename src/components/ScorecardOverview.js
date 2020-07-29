import React, { useState } from 'react';

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

    //function to toggle more round options/info
    const toggleMore = () => {
        setShowRoundOptions(!showRoundOptions)
    }

    // function to render the front 9 hole numbers on scorecard preview
    const renderFront9Hole = () => {
        const holeCells = []
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
        const parCells = []
        if (props.f9p === null) {
            return null
        } else {
            for (const key in props.f9p) {
                parCells.push(<td>{ props.f9p[key] }</td>)
            }
        }
        return parCells
    }

    // function to render the front 9 scores on scorecard preview
    const renderFront9Scores = () => {
        const scoreCells = []
        if (props.f9s === null) {
            return null
        } else {
            for (const key in props.f9s) {
                scoreCells.push(<td>{ props.f9s[key] }</td>)
            }
        }
        return scoreCells
    }

    // function to render the back 9 hole numbers on scorecard preview
    const renderBack9Hole = () => {
        const holeCells = []
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
        const parCells = []
        if (props.b9p === null) {
            return null
        } else {
            for (const key in props.b9p) {
                parCells.push(<td>{ props.b9p[key] }</td>)
            }
        }
        return parCells
    }

    // function to render the front 9 scores on scorecard preview
    const renderBack9Scores = () => {
        const scoreCells = []
        if (props.b9s === null) {
            return null
        } else {
            for (const key in props.b9s) {
                scoreCells.push(<td>{ props.b9s[key] }</td>)
            }
        }
        return scoreCells
    }
    

    // console.log(props)

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
                        <table>
                            <thead>
                                <tr>
                                    <th>Hole</th>
                                    { renderFront9Hole() }
                                </tr>
                                <tr>
                                    <th>Par</th>
                                    { renderFront9Par() }
                                </tr>
                                <tr>
                                    <th>Score</th>
                                    { renderFront9Scores() }
                                </tr>
                            </thead>
                        </table>

                        <table>
                            <thead>
                                <tr>
                                    <th>Hole</th>
                                    { renderBack9Hole() }
                                </tr>
                                <tr>
                                    <th>Par</th>
                                    { renderBack9Par() }
                                </tr>
                                <tr>
                                    <th>Score</th>
                                    { renderBack9Scores() }
                                </tr>
                            </thead>
                        </table>

                        {/* <NavLink to="/scorecard/edit" onClick={this.editRound} className="btn edit">Edit</NavLink>
                        <button onClick={this.deleteRound} className="btn delete">Delete</button> */}
                        <div className="btn-container">
                            <button className="btn edit">Edit</button>
                            <button className="btn delete">Delete</button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default ScorecardOverview;
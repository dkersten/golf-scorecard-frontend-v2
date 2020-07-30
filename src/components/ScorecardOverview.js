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

    // function to edit a scorecard
    const handleScorecardEdit = () => {
        console.log(`edit scorecard number ${props.id}`)
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

                        {/* <NavLink to="/scorecard/edit" onClick={this.editRound} className="btn edit">Edit</NavLink>
                        <button onClick={this.deleteRound} className="btn delete">Delete</button> */}
                        <div className="btn-container">
                            <button onClick={handleScorecardEdit} className="btn edit">Edit</button>
                            <button onClick={handleScorecardDelete} className="btn delete">Delete</button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default ScorecardOverview;
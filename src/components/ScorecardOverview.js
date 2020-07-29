import React from 'react';

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

    return(
        <div className="scorecard-overview card">
            <p>Course: <span>Need to implement this</span></p>
            <p>Date: <span>{ formatRoundDate() }</span></p>
            <p>Round Score: <span>{ computeRoundScore() }</span></p>
        </div>
    )
}

export default ScorecardOverview;
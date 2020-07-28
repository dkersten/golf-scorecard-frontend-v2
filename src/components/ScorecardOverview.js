import React from 'react';

const ScorecardOverview = (props) => {

    const formatRoundDate = () => {
        let dateObj = new Date(props.date)
        let month = dateObj.getMonth()
        let day = String(dateObj.getDate()).padStart(2, '0')
        let year = dateObj.getFullYear()
        let date = `${month}/${day}/${year}`
        return date
    }

    return(
        <div className="scorecard-overview card">
            <p>Date: <span>{ formatRoundDate() }</span></p>
        </div>
    )
}

export default ScorecardOverview;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScorecardOverview from './ScorecardOverview.js';

const Profile = (props) => {

    const [totalHoles, setTotalHoles] = useState(0)
    const [totalEagles, setTotalEagles] = useState(0)
    const [totalBirdies, setTotalBirdies] = useState(0)
    const [totalPars, setTotalPars] = useState(0)
    const [totalBogeys, setTotalBogeys] = useState(0)
    const [totalOtherShots, setTotalOtherShots] = useState(0)
    const [showMoreStats, setShowMoreStats] = useState(true)
    
    // determines if a user has recorded at least 1 round
    let noRounds = false;
    if (props.userScorecards.length === 0) {
        noRounds = true
    }

    // calculates the number of rounds a user has played
    const numRounds = () => {
        if (noRounds === true) {
            return 0
        } else {
            return props.userScorecards.length
        }
        
    }

    // helper function to sum array values together
    const add = (a,b) => a + b

    // function to determine best score on 18 holes
    const bestRoundScore18 = () => {
        const scorecards = props.userScorecards
        const scoresArr = []
        // loops through all scorecards and saves scores into 2 arrays
        for (const scorecard of scorecards) {
            if (scorecard.f9_score !== null && scorecard.b9_score !== null) {
                let f9 = Object.values(scorecard.f9_score)
                let b9 = Object.values(scorecard.b9_score)
                let totalScore = f9.concat(b9)
                const sum = totalScore.reduce(add)
                scoresArr.push(sum)
            }
            // find the lowest score in the array of all total scores
            if (scoresArr.length > 0) {
                const scores = scoresArr
                Array.min = function(scores){
                    return Math.min.apply(Math, scores)
                }
                const bestScore = Array.min(scores)
                return bestScore
            } else if (scoresArr.length === 0) {
                return "NA"
            }
        }
    }
    
    // function to determine best score on 9 holes
    const bestRoundScore9 = () => {
        const scorecards = props.userScorecards
        const scoresArr = []
        // loop through scorecards and get an array of all scores (9 hole only)
        for (const scorecard of scorecards) {
            const f9 = scorecard.f9_score
            const b9 = scorecard.b9_score
            if (b9 === null) {
                const f9Arr = Object.values(f9)
                const sum = f9Arr.reduce(add)
                scoresArr.push(sum)
            } else if (f9 === null) {
                const b9Arr = Object.values(b9)
                const sum = b9Arr.reduce(add)
                scoresArr.push(sum)
            }
        }
        // find the lowest score in the array of all total scores
        if (scoresArr.length > 0) {
            const scores = scoresArr
            Array.min = function(scores){
                return Math.min.apply(Math, scores)
            }
            const bestScore = Array.min(scores)
            return bestScore
        } else if (scoresArr === 0) {
            return "NA"
        }
    }

    // function to set hole stats in state only when props.userScorecards change
    useEffect(() => {
        
        const scorecards = props.userScorecards
        let holeTotal = 0
        let eagleTotal = 0
        let birdieTotal = 0
        let parTotal = 0
        let bogeyTotal = 0
        let otherShotsTotal = 0

        scorecards.map(scorecard => {
            holeTotal += scorecard.holes
            eagleTotal += scorecard.eagles
            birdieTotal += scorecard.birdies
            parTotal += scorecard.pars
            bogeyTotal += scorecard.bogeys
            otherShotsTotal += scorecard.other_scores
            return null
        })
        
        setTotalHoles(holeTotal)
        setTotalEagles(eagleTotal)
        setTotalBirdies(birdieTotal)
        setTotalPars(parTotal)
        setTotalBogeys(bogeyTotal)
        setTotalOtherShots(otherShotsTotal)

      }, [props.userScorecards])

    // function to determine eagle percentage
    const eaglePercentage = () => {
        if (totalHoles === 0) {
            return "NA"
        } else if (totalEagles === 0) {
            return 0
        } else {
            return `${((totalEagles / totalHoles) * 100).toFixed(1)}%`
        }
    }

    // function to determine birdie percentage
    const birdiePercentage = () => {
        if (totalHoles === 0) {
            return "NA"
        } else if (totalBirdies === 0) {
            return 0
        } else {
            return `${((totalBirdies / totalHoles) * 100).toFixed(1)}%`
        }
    }

    // function to determine par percentage
    const parPercentage = () => {
        if (totalHoles === 0) {
            return "NA"
        } else if (totalPars === 0) {
            return 0
        } else {
            return `${((totalPars / totalHoles) * 100).toFixed(1)}%`
        }
    }

    // function to determine bogey percentage
    const bogeyPercentage = () => {
        if (totalHoles === 0) {
            return "NA"
        } else if (totalBogeys === 0) {
            return 0
        } else {
            return `${((totalBogeys / totalHoles) * 100).toFixed(1)}%`
        }
    }

    // function to determine other percentage
    const otherPercentage = () => {
        if (totalHoles === 0) {
            return "NA"
        } else if (totalOtherShots === 0) {
            return 0
        } else {
            return `${((totalOtherShots / totalHoles) * 100).toFixed(1)}%`
        }
    }

    /////////// Below deals with conditional rendering of content

    // page structure for a new user (no rounds played)
    const newUser = () => {
        return(
            <div className="stat-container">
                <section className="card stats">
                    <p>You haven't recorded a round yet! Add a round <Link to="/scorecard/new">here</Link>.</p>
                </section>
            </div>
        )
    }

    // function to render additional player stats
    const statBreakdownShowMore = () => {
            return(
                <div>
                    <h2>Stats Overview</h2>
                    <p>You have played {totalHoles} holes</p>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Eagle</th>
                                <th>Birdie</th>
                                <th>Par</th>
                                <th>Bogey</th>
                                <th>Other</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Total</td>
                                <td>{totalEagles}</td>
                                <td>{totalBirdies}</td>
                                <td>{totalPars}</td>
                                <td>{totalBogeys}</td>
                                <td>{totalOtherShots}</td>
                            </tr>
                            <tr>
                                <td>As %</td>
                                <td>{eaglePercentage()}</td>
                                <td>{birdiePercentage()}</td>
                                <td>{parPercentage()}</td>
                                <td>{bogeyPercentage()}</td>
                                <td>{otherPercentage()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
    }

    // toggles show more stats in state
    const toggleMore = () => {
        setShowMoreStats(!showMoreStats)
    }

    // page structure for an existing user (at least 1 round)
    const existingUser = () => {
        return(
            <div>
                <div className="stat-container">
                    <section className="card stats">
                        <p>You have played <span>{numRounds()}</span> round(s)</p>
                        <p>Best round (18 holes): <span>{bestRoundScore18()}</span></p>
                        <p>Best round (9 holes): <span>{bestRoundScore9()}</span></p>
                        {
                            showMoreStats ? 
                                <button onClick={toggleMore} className="show">Show More Stats &#x25BE;</button>
                                :       
                                <button onClick={toggleMore} className="hide">Hide More Stats &#x25B4;</button>
                        }
                        { showMoreStats ? null : statBreakdownShowMore() }
                    </section> 
                </div>
                <h2>Your Previous Rounds</h2>
                <div className="scorecard-container">
                    {
                        props.userScorecards.map(scorecard => <ScorecardOverview 
                            key={scorecard.id}
                            id={scorecard.id}
                            date={scorecard.created_at}
                            f9p={scorecard.f9_par}
                            f9s={scorecard.f9_score}
                            b9p={scorecard.b9_par}
                            b9s={scorecard.b9_score}
                            courseName={scorecard.course}
                            deleteScorecardFunc={props.deleteScorecardFunc}
                            updateEditScorecardFunc={props.updateEditScorecardFunc}
                        />)
                    }
                </div>
            </div>
        )
    }

    return(
        <div className="profile">
            <main>
                <div className="inner-container">
                <h1>Welcome { props.firstName }!</h1>
                    {
                        noRounds ? newUser() : existingUser()
                    }
                </div>
            </main>
        </div>
    )
}

export default Profile;
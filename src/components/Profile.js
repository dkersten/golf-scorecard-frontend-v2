import React from 'react';
import { Link } from 'react-router-dom';
import ScorecardOverview from './ScorecardOverview.js';

const Profile = (props) => {
    
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

    // page structure for an existing user (at least 1 round)
    const existingUser = () => {
        return(
            <div>
                <div className="stat-container">
                    <section className="card stats">
                        <p>You have played <span>{numRounds()}</span> round(s)</p>
                        <p>Best round (18 holes): <span>{bestRoundScore18()}</span></p>
                        <p>Best round (9 holes): <span>{bestRoundScore9()}</span></p>
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
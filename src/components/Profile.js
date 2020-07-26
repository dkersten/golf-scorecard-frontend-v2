import React from 'react';
import { Link } from 'react-router-dom';

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
                    <p>You haven't recorded a round yet! Add a round <Link to="/signin">here</Link>.</p>
                </section>
            </div>
        )
    }

    // page structure for an existing user (at least 1 round)
    const existingUser = () => {
        return(
            <div className="stat-container">
                <section className="card stats">
                    <p>You have played <span>{props.userScorecards.length}</span> round(s).</p>
                </section> 
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
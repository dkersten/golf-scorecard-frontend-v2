import React from 'react';

const Profile = (props) => {

    // console.log(props.name)

    const numRounds = () => {
        if (props.userScorecards === undefined) {
            return 0
        } else {
            return props.userScorecards.length
        }
        
    }
    
    const newUser = () => {
        console.log("new user")
    }

    const existingUser = () => {
        console.log("existing user")
    }

    return(
        <div className="profile">
            <main>
                <h1>Welcome { props.firstName }!</h1>
                {
                    props.userScorecards === undefined ? newUser() : existingUser()
                }
            </main>
        </div>
    )
}

export default Profile;
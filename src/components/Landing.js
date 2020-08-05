import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const Landing = () => {

    const { loginWithRedirect } = useAuth0();

    return(
        <div className="inner-container landing">
            <h1>E-Z Golf Scores</h1>
            <p>Keep your mind on your game. Record your rounds with no extra distractions. Track your scores overtime to get insights into your game.</p>
            <section>
                <button className="btn" onClick={() => loginWithRedirect()}>Get Started</button>
            </section>
        </div>
    )
}

export default Landing;
import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return(
        <div className="inner-container landing">
            <h1>E-Z Golf Scores</h1>
            <p>Keep your mind on your game. Record your rounds with no extra distractions. Track your scores overtime to get insights into your game.</p>
            <section>
                <Link to="/login" className="btn">Login</Link>
                <span>or</span>
                <Link to="/signup" className="btn">Sign Up</Link>
            </section>
        </div>
    )
}

export default Landing;
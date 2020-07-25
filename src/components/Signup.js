import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    return(
        <div className="signup">
            <main>
                <div className="inner-container">
                    <form className="card">
                        <h1>Sign Up</h1>

                        <input name="firstName" placeholder="First Name" type="text"/>

                        <input name="lastName" placeholder="Last Name" type="text"/>

                        <input name="email" placeholder="Email" type="email"/>

                        <input name="password" placeholder="Password" type="password"/>

                        <input name="passConf"  placeholder="Confirm Password" type="password"/>

                        <input type="submit" className="btn" />

                        <p>Or <Link to="/login">login</Link> if you have an account.</p>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Signup;
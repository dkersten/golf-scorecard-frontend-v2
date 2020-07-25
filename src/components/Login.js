import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return(
        <div className="login">
            <main>
                    <div className="inner-container">
                        <form className="card">
                            <h1>Login</h1>

                            <input name="email" placeholder="Your email" type="email"/>

                            <input name="password" placeholder="Your password" type="password"/>

                            <input type="submit" className="btn" />

                            <p>Or <Link to="/signup">sign up</Link> if you don't have an account.</p>
                        </form>
                    </div>
                </main>
        </div>
    )
}

export default Login;
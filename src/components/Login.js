import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const handleChangeEmail = (e) => {
        setUserEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setUserPassword(e.target.value)
    }

    // console.log(userEmail, userPassword)

    return(
        <div className="login">
            <main>
                    <div className="inner-container">
                        <form className="card">
                            <h1>Login</h1>

                            <input name="setUserEmail" onChange={handleChangeEmail} value={userEmail} placeholder="Your email" type="email"/>

                            <input name="setUserPassword" onChange={handleChangePassword} value={userPassword} placeholder="Your password" type="password"/>

                            <input type="submit" className="btn" />

                            <p>Or <Link to="/signup">sign up</Link> if you don't have an account.</p>
                        </form>
                    </div>
                </main>
        </div>
    )
}

export default Login;
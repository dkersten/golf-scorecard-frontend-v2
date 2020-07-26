import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {

    const [userFirstName, setUserFirstName] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userPasswordConf, setUserPasswordConf] = useState('')

    const handleChangeFirstName = (e) => {
        setUserFirstName(e.target.value)
    }

    const handleChangeLastName = (e) => {
        setUserLastName(e.target.value)
    }

    const handleChangeEmail = (e) => {
        setUserEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setUserPassword(e.target.value)
    }

    const handleChangePasswordConf = (e) => {
        setUserPasswordConf(e.target.value)
    }

    // console.log(userFirstName, userLastName, userEmail, userPassword, userPasswordConf)

    return(
        <div className="signup">
            <main>
                <div className="inner-container">
                    <form className="card">
                        <h1>Sign Up</h1>

                        <input name="firstName" onChange={handleChangeFirstName} value={userFirstName} placeholder="First Name" type="text"/>

                        <input name="lastName" onChange={handleChangeLastName} value={userLastName} placeholder="Last Name" type="text"/>

                        <input name="email" onChange={handleChangeEmail} value={userEmail} placeholder="Email" type="email"/>

                        <input name="password" onChange={handleChangePassword} value={userPassword} placeholder="Password" type="password"/>

                        <input name="passConf" onChange={handleChangePasswordConf} value={userPasswordConf}  placeholder="Confirm Password" type="password"/>

                        <input type="submit" className="btn" />

                        <p>Or <Link to="/login">login</Link> if you have an account.</p>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Signup;
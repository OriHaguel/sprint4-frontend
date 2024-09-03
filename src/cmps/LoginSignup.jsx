import { useEffect, useState } from 'react'
import { userService } from '../services/user/index.js'
import { login, signup } from '../store/actions/user.actions.js'

export function LoginSignup({ elModal, onClose, isSignup, setIsSignUp }) {

    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onLogin(credentials)
        setCredentials(userService.getEmptyCredentials())
    }


    function onLogin(credentials) {
        const method = !isSignup ? signup : login

        method(credentials)
        // .then(user => showSuccessMsg('Hello!'))
        // .catch(err => showErrorMsg('Error logging in'))
    }


    function onCloseModal() {
        elModal.current.close()
        onClose()
    }
    return (
        // <div className="login-page">
        //     <form className="login-form" onSubmit={handleSubmit}>
        //         <input
        //             type="text"
        //             name="username"
        //             value={credentials.username}
        //             placeholder="Username"
        //             onChange={handleChange}
        //             required
        //             autoFocus
        //         />
        //         <input
        //             type="password"
        //             name="password"
        //             value={credentials.password}
        //             placeholder="Password"
        //             onChange={handleChange}
        //             required
        //             autoComplete="off"
        //         />
        //         {isSignup && <input
        //             type="text"
        //             name="fullname"
        //             value={credentials.fullname}
        //             placeholder="Full name"
        //             onChange={handleChange}
        //             required
        //         />}
        //         <button>{isSignup ? 'Signup' : 'Login'}</button>
        //     </form>

        //     <div className="btns">
        //         <a href="#" onClick={() => setIsSignUp(!isSignup)}>
        //             {isSignup ?
        //                 'Already a member? Login' :
        //                 'New user? Signup here'
        //             }
        //         </a >
        //     </div>
        // </div >
        <div>

            <form className='form' method='dialog' onSubmit={handleSubmit}>
                <h2>Create a new account</h2>
                {/* <p>Already have an account? Sign in</p> */}
                <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ?
                        'Don\'t have an account? join here' :
                        'Already have an account? sign in'
                    }
                </a >
                <label>
                    Email or username
                    <input type='text' onChange={handleChange} name='username' value={credentials.username} />
                </label>
                {!isSignup &&
                    <label> Fullname
                        <input
                            type="text"
                            name="fullname"
                            value={credentials.fullname}
                            onChange={handleChange}
                            required
                        />
                    </label>}
                <label>
                    Password
                    <input type='password' onChange={handleChange} name='password' value={credentials.password} />
                </label>
                {elModal.current && <button className='button' type='submit' onClick={onCloseModal}>Continue</button>}
            </form>
        </div>
    )
}

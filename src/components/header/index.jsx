import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import { doSignOut } from '../firebase/auth'

const Header = () => {
    const { userLoggedIn } = useAuth()
    return (
        <>
            {userLoggedIn &&
                <button onClick={doSignOut} className='text-sm text-blue-600 underline'>Logout</button>
            }
            {!userLoggedIn &&
                <>
                    <Link className='text-sm text-blue-600 underline' to={'/login'}>Login</Link>
                    <Link className='text-sm text-blue-600 underline' to={'/register'}>Register New Account</Link>
                </>
            }
        </>
    )
}

export default Header

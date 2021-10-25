import { useState } from 'react'
import { useDispatch } from "react-redux"
import { logInUser } from "../../modules/authentication-helper"

import { container, marginRight } from "../../modules/styles"
import { useEffect } from 'react'



const NotLoggedIn = () => {
    const [formData, setFormData] = useState({ username: '', password: '' })
    const [errorMessage, setErrorMessage] = useState()
    const dispatch = useDispatch()
    let isMounted = true

    useEffect(() => { return () => isMounted = false }, [])


    const handleSubmit = async e => {
        e.preventDefault()
        // setErrorMessage(e.message)
        setErrorMessage('Logging in')
        await logInUser(formData, dispatch)
            .then(ld => {
                console.log(ld)
                if (isMounted) setFormData(fd => fd = { username: '', password: '' })
                // saveToLocalStorage('authentication-data', ld)
                // dispatch({ type: 'ADD_AUTH', payload: ld })
            })
            .catch(e => {
                if (isMounted) {
                    setErrorMessage(e.message)
                    setFormData(ed => ({
                        ...ed, password: ''
                    }))
                }
            })
    }

    const handleChange = (e, target) => {
        setFormData(ed => ({
            ...ed, [target]: e.target.value
        }))
    }


    return (
        <form style={container} onSubmit={handleSubmit}>
            <div style={marginRight}>{errorMessage ?? ''}</div>
            <input value={formData?.username} placeholder='username' onChange={e => handleChange(e, 'username')} required style={marginRight} />
            <input value={formData?.password} type='password' placeholder='password' onChange={e => handleChange(e, 'password')} required style={marginRight} />
            <input type='submit' value='log in' />
        </form>

    );
}

export default NotLoggedIn
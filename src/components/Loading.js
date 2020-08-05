import React, { useEffect} from 'react';
import { useHistory } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

// this is a top level route /callback
const Loading = () => {
    const { getAccessTokenSilently, isLoading} = useAuth0()
    const history = useHistory()

    useEffect(() => {
        if(isLoading) { return; }
        getAccessTokenSilently().then((token) => {
            localStorage.setItem('token', token)
            history.push('/profile')
        })
    }, [isLoading])

    return <div>
        {isLoading && 'Loading...'}
    </div>
}

export default Loading
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useAuthStatus = () => {
    const { user } = useSelector((state) => state.auth)
    const [isLogged, setIsLogged] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(false)


    useEffect(() => {
        setCheckingStatus(true)

        if (user) {
            setIsLogged(true)
        } else {
            setIsLogged(false)
        }

        setCheckingStatus(false)
    }, [user])

    return { isLogged, checkingStatus }
}
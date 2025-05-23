import axios from 'axios'
import { APIURL } from '../config/Url'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

function useGetUser() {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()

    //get user profile

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${APIURL.baseUrl}/auth/profile`, { withCredentials: true })
                setData(response.data)
                dispatch({ type: 'user/setUser', payload: response.data.userStatus })
                console.log(response.data)
                setLoading(false)
            } catch (err: any) {
                setError(err)
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    return { data, loading, error }
}

export default useGetUser
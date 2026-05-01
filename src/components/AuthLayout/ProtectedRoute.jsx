import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({
    children,
    authentication=true
}) {

  const navigate = useNavigate()

  const [loader, setLoader] = useState(true)

  const authStatus = useSelector(state => state.auth.status)

  useEffect(() => {
    /* CHECKING THIS APPROACH
        if (authStatus === true) {
            navigate('/')
        } else if (authStatus === false) {
            navigate('/login')
        }
    */
   
    if (authentication && authStatus !== authentication) {
        navigate('/login')
    } else if (!authentication && authStatus !== authentication) {
        navigate('/')
    }
    setLoader(false)
  }, [authStatus, navigate, authentication])

  return loader ? <h1 className='flex flex-col justify-center items-center text-3xl font-bold text-white py-8'>Loading...</h1> : <>{children}</>
}

export default ProtectedRoute

import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/authentication/authSlice'
import authService from '../../appwrite/services/auth'
import toast from 'react-hot-toast' 
import { useNavigate } from 'react-router-dom'

function LogoutBtn({className='', handleMenu}) {

  const dispatch = useDispatch()  // Dispatch to Redux
  const navigate = useNavigate()

  const logoutHandler = () => {
    authService.logout()
    .then(() => {
      dispatch(logout());
      handleMenu?.();
      toast.success('Logged out successfully!');
    })
    .then(() => navigate('/'))
    .catch((error) => {
      toast.error('Error while logging out!', {
        duration: 2000
      });
      console.log('Error while logging out', error.message);
    })
  }

  return (
    <>
      <button 
        onClick={logoutHandler}
        className={`inline-block px-6 py-2 duration-200 text-orange-600 hover:bg-orange-100 hover:text-black rounded-full cursor-pointer ${className}`}
      >Logout</button>
    </>
  )
}

export default LogoutBtn

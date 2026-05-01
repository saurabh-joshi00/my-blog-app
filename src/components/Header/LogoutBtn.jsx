import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/authentication/authSlice'
import authService from '../../appwrite/services/auth'
import toast from 'react-hot-toast' 

function LogoutBtn() {

  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService.logout()
    .then(() => {
      dispatch(logout());
      toast.success('Logged out successfully!');
    })
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
        className='inline-block px-6 py-2 duration-200 text-orange-600 hover:bg-orange-100 hover:text-black rounded-full cursor-pointer'
      >Logout</button>
    </>
  )
}

export default LogoutBtn

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../appwrite/services/auth'
import { login } from '../../features/authentication/authSlice'
import { Button, InputBox, Logo } from '../index'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { BsGithub } from 'react-icons/bs'

function SignupPage() {
 
  const navigate = useNavigate()
  const dispatch = useDispatch() 
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
        name: '',
        email: '',
        password: ''
    }
  })

  const [error, setError] = useState('')
  
  const signup = async (data) => {
    setError('')
    try {
        const session = await authService.createAccount(data)
        if (session) {
            const userData = await authService.getCurrentUser()
            if (userData) dispatch(login({userData}));
            toast.success('Your account is created!');
            navigate('/')
        }
    } catch (error) {
        toast.error('Invalid email or password!', {
            duration: 2000
        });
        setError(error.message)
    }
  }

  const loginWithGoogle = async () => {
    try {
        await authService.loginWithGoogle();
    } catch (error) {
        toast.error('Google login failed!');
        console.log('Google login failed!');
    }
  }

  const loginWithGithub = async () => {
    try {
        await authService.loginWithGithub();
    } catch (error) {
        toast.error('GitHub login failed!');
        console.log('Github login failed!');
    }
  }

  return (
    <>
      <div className='flex items-center justify-center'>
        <div className={`mx-auto w-full max-w-lg bg-gray-200 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-25">
                    <Logo width='100%' />
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create account</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                Already have an account?&nbsp;
                <Link 
                    to='/login'
                    className='font-medium text-orange-600 text-primary transition-all duration-200 hover:underline'
                >
                    Sign In
                </Link>
            </p>

            {
                error && <p className='text-red-600 mt-8 text-center'>{error}</p>
            }

            <form
                onSubmit={handleSubmit(signup)}
                className='mt-8'
            >
                <div className='space-y-5'>
                    <InputBox 
                        label='Name: '
                        className={errors.name ? 'border-red-500' : ''}
                        placeholder='Enter your name'
                        {...register('name', {
                            required: true
                        })}
                    />
                    <InputBox 
                        label='Email: '
                        placeholder='Enter your email'
                        className={errors.email ? 'border-red-500' : ''}
                        type='email'
                        {...register('email', {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Email address must be a valid address'
                            }
                        })}
                    />
                    <InputBox 
                        label='Password: '
                        className={errors.password ? 'border-red-500' : ''}
                        type='password'
                        placeholder='Enter your password'
                        {...register('password', {
                            required: true
                        })}
                    />
                    <Button 
                        type='submit'
                        className='w-full inline-block font-semibold bg-orange-500 hover:bg-orange-600 duration-200'
                        children='Create Account'
                    />
                </div>
            </form>

            <div className='flex items-center justify-center'>
                <div className='w-[40%] border border-black/30 mt-4'></div>
                <span className='mt-3 text-gray-700 px-2 font-semibold'>OR</span>
                <div className='w-[40%] border border-black/30 mt-4'></div>
            </div>

            <div className='flex flex-col items-center gap-2 mt-2'>
                <div onClick={loginWithGoogle} className='w-full md:w-[80%] flex items-center justify-center gap-4 px-8 py-2 border border-black/20 rounded-xl cursor-pointer hover:bg-gray-300 duration-200'>
                    <FcGoogle size={25} />
                    <span className='text-black/60 font-semibold'>Continue with Google</span>
                </div>
                <div onClick={loginWithGithub} className='w-full md:w-[80%] flex items-center justify-center gap-4 px-8 py-2 border border-black/20 rounded-xl cursor-pointer hover:bg-gray-300 duration-200'>
                    <BsGithub size={25} />
                    <span className='text-black/60 font-semibold'>Continue with GitHub</span>
                </div>
            </div>

        </div>
      </div>
    </>
  )
}

export default SignupPage

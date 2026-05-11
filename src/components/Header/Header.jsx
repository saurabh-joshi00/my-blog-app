import React, { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Container, Logo, LogoutBtn } from '../index' 
import { IoMenu } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'

function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)

  const navigate = useNavigate()

  const location = useLocation()

  const navItems = useMemo(() => [
    {
      name: 'Home',
      url: '/',
      active: true
    },
    {
      name: 'Login',
      url: '/login',
      active: !authStatus
    },
    {
      name: 'Signup',
      url: '/signup',
      active: !authStatus
    },
    {
      name: 'My Posts',
      url: '/my-posts',
      active: authStatus
    },
    {
      name: 'Add Post',
      url: '/add-post',
      active: authStatus
    }

  ], [authStatus])

  const handleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const handleNavClick = useCallback((url) => {
    navigate(url)
  }, [navigate])

  const getNavButtonClass =useCallback((itemUrl) => {
    const isActive = location.pathname === itemUrl
    return isActive ? 'bg-orange-100 text-black font-semibold' : 'text-orange-600 hover:bg-orange-100 hover:text-black'
  }, [location.pathname])

  return (
    <>
      <header className='w-full bg-white shadow'>
        <Container>
          {/* DESKTOP MENU */}
          <nav className='hidden md:flex items-center justify-between'>

            <div>
              <Link to='/'>
                <Logo width='70px'/>
              </Link>
            </div>

            <div>
              {
                userData?.name && <span className='text-red-400 font-bold'>Hey! {userData.name.split(' ')[0]} 👋</span>
              }
            </div>

            <div>
              <ul className='flex ml-auto'>
                {
                  navItems.map((item) => 
                    item.active ? (
                    <li 
                      key={item.name}
                    >
                      <button
                        className={`outline-none inline-block px-6 py-2 duration-200 rounded-full cursor-pointer ${getNavButtonClass(item.url)}`}
                        onClick={() => handleNavClick(item.url)}
                      >{item.name}</button>
                    </li>
                    )
                    : 
                    null
                  )
                }

                {
                  authStatus && (
                    <li>
                      <LogoutBtn />
                    </li>
                  )
                }

              </ul>
            </div>

          </nav>

          {/* MOBILE HAMBURGER BUTTON */}
          <nav className='md:hidden flex items-center justify-between'>
            <div>
              <Link to='/'>
                <Logo width='70px'/>
              </Link>
            </div>

            <div>
              {
                userData?.name && <span className='text-red-400 font-bold'>Hey! {userData.name.split(' ')[0]} 👋</span>
              }
            </div>

            <button 
              onClick={handleMenu}
              className='cursor-pointer'
            >
              {isMenuOpen 
              ? 
              <RxCross2 size={32} />
              : 
              <IoMenu size={32} /> 
              }
            </button>
          </nav>
        </Container>

        {/* MOBILE MENU */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen? 'max-h-64 opacity-100': 'max-h-0 opacity-0'} overflow-hidden bg-gray-50`}>
          <ul className='flex flex-col p-4 space-y-2 font-medium'>
            {
              navItems.map((item) => (
                item.active 
                ? 
                <li key={item.name}>
                  <Link
                    to={item.url}
                    onClick={handleMenu}
                    className='block px-2 py-4 text-gray-700 hover:bg-orange-100 transition rounded-lg'
                  >
                    {item.name}
                  </Link>
                </li>
                :
                ''
              ))
            }

            {
              authStatus
              ?
              <li>
                <LogoutBtn className='w-full bg-orange-500 hover:bg-orange-600 rounded-lg text-white hover:text-white' handleMenu={handleMenu}/>
              </li>
              :
              <li>
                <button
                  onClick={() => (
                    handleMenu(),
                    handleNavClick('/login')
                  )}
                  className='w-full inline-block px-6 py-2 duration-200 bg-orange-500 hover:bg-orange-600 rounded-lg cursor-pointer text-white'
                >
                  Login
                </button>
              </li>
            }
          </ul>
          
        </div>
      </header>
    </>
  )
}

export default Header

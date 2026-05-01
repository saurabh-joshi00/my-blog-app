import React from 'react'
import { useSelector } from 'react-redux'
import { data, Link, useNavigate } from 'react-router-dom'
import { Container, Logo, LogoutBtn } from '../index' 

function Header() {

  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)

  const navigate = useNavigate()

  const navItems = [
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
      name: 'All Posts',
      url: '/all-posts',
      active: authStatus
    },
    {
      name: 'Add Post',
      url: '/add-post',
      active: authStatus
    }
  ]

  return (
    <>
      <header className='bg-white shadow'>
        <Container>
          <nav className='flex items-center justify-between'>

            <div>
              <Link to='/'>
                <Logo width='70px'/>
              </Link>
            </div>

            <div>
              {
                userData?.name && <span className='text-red-400 font-bold'>Hey! {userData.name.split(' ')[0]}</span>
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
                        className='inline-block px-6 py-2 duration-200 text-orange-600 hover:bg-orange-100 hover:text-black rounded-full cursor-pointer'
                        onClick={() => navigate(item.url)}
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
        </Container>
      </header>
    </>
  )
}

export default Header

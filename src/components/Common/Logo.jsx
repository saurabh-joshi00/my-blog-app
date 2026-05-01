import React from 'react'
import logoImg from '../../assets/logo.png'

function Logo({width='100px'}) {
  return (
    <>
      <div>
        <img src={logoImg} className='w-20'/>
      </div>
    </>
  )
}

export default Logo

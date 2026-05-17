import React, { useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'

function SearchBar({ onSearch = () => {} }) {

  const [value, setValue] = useState('')

  const handleChange = (e) => {
    const searchValue = e.currentTarget.value
    setValue(searchValue) // Update input value only, don't trigger search
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(value) // Trigger search only on Enter
    }
  }

  const handleClear = () => {
    setValue('')
    onSearch('') // Clear search
  }

  const handleSearchClick = () => {
    onSearch(value) // Trigger search on icon click
  }

  return (
    <>
      <div className='w-full p-2 mb-4'>
        <div className='w-1/2 flex items-center px-4 py-2 bg-white rounded-lg outline-none border border-gray-400'>
            <label htmlFor="search-bar">
                <IoSearch size={15} className='cursor-pointer' onClick={handleSearchClick} />
            </label>
            
            <input 
                id='search-bar'
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                autoComplete='off'
                type="text"
                className='w-full outline-none pl-2 placeholder:font-semibold' 
                placeholder='Search by title...'
            />

            {
                value && <RxCross2 size={20} onClick={handleClear} className='cursor-pointer' />
            }

        </div>
      </div>
    </>
  )
}

export default SearchBar

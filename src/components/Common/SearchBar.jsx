import React from 'react'
import { IoSearch } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'

function SearchBar({ value, onSearch }) {
  return (
    <>
      <div className='w-full p-2 mb-4'>
        <div className='w-full md:w-1/2 flex items-center px-4 py-2 bg-white rounded-lg outline-none border border-gray-400'>
            <label htmlFor="search-bar">
                <IoSearch size={15} />
            </label>
            
            <input 
                id='search-bar'
                value={value || ''}
                onChange={(e) => onSearch(e.currentTarget.value)}
                autoComplete='off'
                type="text"
                className='w-full outline-none pl-2 placeholder:font-semibold' 
                placeholder='Search by title, author...'
            />

            {
                value && <RxCross2 size={20} onClick={() => onSearch('')} className='cursor-pointer' />
            }

        </div>
      </div>
    </>
  )
}

export default SearchBar

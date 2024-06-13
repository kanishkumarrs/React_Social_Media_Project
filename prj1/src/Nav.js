import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({search, setSearch}) => {
  return (
    <nav className='Nav'>
      <form className='searchForm' onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor='search'>
          Search Posts
        </label>
        <input 
          id='search'
          type='text'
          placeholder='Search Posts'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </form>    
      <ul>
        <li><Link to='https://kanishkumarrs.github.io/React_Social_Media_Project/'>Home</Link></li>
        <li><Link to='https://kanishkumarrs.github.io/React_Social_Media_Project/post'>Post</Link></li>
        <li><Link to='https://kanishkumarrs.github.io/React_Social_Media_Project/about'>About</Link></li>
      </ul>
    </nav>
  )
}

export default Nav

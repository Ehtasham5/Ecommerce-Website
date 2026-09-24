import React, { useContext, useState } from 'react'
import {assets} from '../../src/assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
  const [visible, setVisible] = useState(false)

  const {setShowSearch, getCartCount, token, logout} = useContext(ShopContext)
  return (
    <div className='flex justify-between items-center py-5 font-medium'>

      <Link to='/'>
        <img src={assets.logo} alt="" className='w-36'/>
      </Link>

      <ul className='hidden sm:flex gap-5 text-md text-gray-700'>
        <NavLink to='/' className='flex flex-col gap-1 items-center'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>

        <NavLink to='/collection' className='flex flex-col gap-1 items-center'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>

        <NavLink to='/about' className='flex flex-col gap-1 items-center'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>

        <NavLink to='/contact' className='flex flex-col gap-1 items-center'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>

      </ul>

      <div className='flex items-center gap-6'> 
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt="" className='w-4 cursor-pointer'/>

        <div className='group relative'>
          <Link to={token ? "/" : "/login"}>
            <img src={assets.profile_icon} alt="" className='w-4 cursor-pointer'/>
          </Link>
          {token && (
            <div className='group-hover:block absolute hidden dropdown-menu right-0 pt-4'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700'>
                <p className='cursor-pointer hover:text-black'>My Profile</p>
                <Link to='/orders' className='hover:text-black'>Orders</Link>
                <button type='button' onClick={logout} className='text-left hover:text-black'>Logout</button>
              </div>
            </div>
          )}
        </div>

        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} alt="" className='w-4 min-w-4'/>
          <p className='absolute -right-1.5 -bottom-1.5 w-4 text-center leading-4 bg-black text-white rounded-full aspect-square text-[8px]'>{getCartCount()}</p>
        </Link>

        <a
          href='http://localhost:5174'
          target='_blank'
          rel='noreferrer'
          className='hidden sm:inline-block border border-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-700 hover:text-white transition'
        >
          Admin Panel
        </a>

        <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="" className='sm:hidden w-5 cursor-pointer' />

      </div>

      {/* Menu screen for mobile */}

      <div className={`absolute top-0 bottom-0 left-0 right-0 transition-all overflow-hidden bg-white ${visible ? 'h-screen' : 'h-0'}`}> 
        <div className='flex flex-col text-gray-700'>
          <div onClick={()=> setVisible(false)} className='flex items-center gap-3 p-3 cursor-pointer'>
            <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
            <p>Back</p>
          </div>

          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
          <a
            href='http://localhost:5174'
            target='_blank'
            rel='noreferrer'
            onClick={()=>setVisible(false)}
            className='py-2 pl-6 border text-left'
          >
            ADMIN PANEL
          </a>
        </div>
      </div>


    </div>
  )
}

export default Navbar
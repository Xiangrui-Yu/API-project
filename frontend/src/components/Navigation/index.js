// frontend/src/components/Navigation/index.js
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  // below as testing code

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // above is testing code


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div>
        {/* <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink> */}
        <button className='session-login' onClick={openMenu}>
          <i className="fa-solid fa-bars"></i>
          <i className="fa-solid fa-circle-user"></i>
        </button>
        {showMenu && (
          <ul className='login-dropdown'>
            <li><NavLink style={{ color: 'grey', textDecoration: 'none' }} to="/login">Log In</NavLink></li>
            <li><NavLink style={{ color: 'grey', textDecoration: 'none' }} to="/signup">Sign Up</NavLink></li>
            <li><NavLink style={{ color: 'grey', textDecoration: 'none' }} to="/demo">demo-user</NavLink></li>
          </ul>
        )}
      </div>
    );

  }

  const myfunction = () => {
    return sessionLinks
  }

  return (
    <div className='Navigation'>
      <button className='homebutton' >
        <i className="fa-brands fa-airbnb"></i>
        <NavLink exact to="/" style={{ color: 'red', fontSize: 20, textDecoration: 'none' }}> airbnb </NavLink>
      </button >

      <div>
        <button className='airbnb-home'>
          <NavLink exact to="/spots/new" style={{ color: 'grey', fontSize: 16, textDecoration: 'none' }}> Airbnb your home </NavLink>
        </button>

        {isLoaded && sessionLinks}

      </div>

    </div>
  );
}

export default Navigation;
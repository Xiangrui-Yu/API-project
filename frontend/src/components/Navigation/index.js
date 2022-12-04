// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div className='Navigation'>
        {/* <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink> */}
        <button className='session-login' type='select'>
          <i className="fa-solid fa-bars"></i>
          <i className="fa-solid fa-circle-user"></i>
        </button>

        <li><NavLink style={{ color: 'grey', textDecoration: 'none' }} to="/login">Log In</NavLink></li>
        <li><NavLink style={{ color: 'grey', textDecoration: 'none' }} to="/signup">Sign Up</NavLink></li>
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

      <button className='airbnb-home'>
        <NavLink exact to="/spots/new" style={{ color: 'black', fontSize: 20, textDecoration: 'none' }}> Airbnb your home </NavLink>
      </button>

      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
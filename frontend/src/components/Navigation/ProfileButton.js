// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './Navigation.css';


function ProfileButton({ user }) {
  const dispatch = useDispatch();
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div >
      <button className='profilebutton' onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <div style={{ color: 'grey', textDecoration: 'none' }}>{user.username}</div>
          <div className='profile-useremail' style={{ color: 'grey', textDecoration: 'none' }}>{user.email}</div>

          <div className="profile-yourspot"><NavLink style={{ color: 'grey', textDecoration: 'none' }} to="/user/spots">your spots</NavLink></div>
          <div className="profile-yourbookings"><NavLink style={{ color: 'grey', textDecoration: 'none' }} to="/user/bookings">your bookings</NavLink></div>


          <div >
            <button className="profile-logout" style ={{fontSize:16, color:'grey'}} onClick={logout}>Log Out</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
// frontend/src/components/Navigation/index.js
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import {SpotBrowser} from "../SpotBrowser"
// demo-user code
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';
// demo-user code


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
      if(document.activeElement.tagName ==='INPUT'){
        return;
      }
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // above is testing code

  // demo user code
  const dispatch = useDispatch();
  const credential = 'demo@user.io'
  const password = 'password'
  const history = useHistory()
  // demo user code




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
          <div className='login-dropdown'>
            <div className='navigation-login'><NavLink style={{ color: 'grey', textDecoration: 'none' }} to="/login">Log In</NavLink></div>
            <div className='navigation-signup'><NavLink style={{ color: 'grey', textDecoration: 'none' }} to="/signup">Sign Up</NavLink></div>
            
            <button className='navigation-demo' style={{ fontSize: 16, color:'grey' }} type="button"
              onClick={() => {
                dispatch(sessionActions.demoUser({ credential, password }))
                history.push('/')
              }}
            >Demo-User</button>


            {/* <li><NavLink style={{ color: 'grey', textDecoration: 'none' }} to="/demo">demo-user</NavLink></li> */}
          </div>
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
        <NavLink exact to="/" style={{ color: 'red', fontSize: 20, textDecoration: 'none' }}> airBingBing </NavLink>
      </button >

      <div className='Navigation-rightButtons'>
        <button className='airbnb-home' onClick={openMenu} style={{color:'grey',fontSize:16, textDecoration:'none'}}>
          {/* <NavLink exact to="/spots/new" style={{ color: 'grey', fontSize: 16, textDecoration: 'none' }}> Airbnb your home </NavLink> */}
          
          Airbnb your home
        </button>
        {showMenu&& <SpotBrowser />}

        {isLoaded && sessionLinks}

      </div>

    </div>
  );
}

export default Navigation;
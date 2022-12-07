// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function DemoPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const credential = 'demo@user.io'
  const password ='password'
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    // setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      {/* <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label> */}
      <button style={{fontSize:16}}type="submit">Demo-User</button>
    </form>
  );
}

export default DemoPage;
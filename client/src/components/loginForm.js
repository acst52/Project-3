import React, { useState } from 'react';
import {Link} from 'react-router-dom';

import { loginUser } from '../utils/API';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const response = await loginUser(userFormData);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { token, user } = await response.json();
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };
  return (
    <>
      <form className="loginForm" onSubmit={handleFormSubmit}>
        
        <label className="label">Email:</label>
        <input
          type="email"
          name= "email"
          className="entryField"
          value={userFormData.email}
          onChange={handleInputChange}
          required
        />

          <label className ="label" htmlFor='password'>Password:</label>
          <input
          className="entryField"
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <div>
        <button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </button>
        </div>
        <div className="linkContainer">
        <p>Don't have an account yet?</p>
        <Link to="/signup" className="link">
          Sign up instead!
        </Link>
      </div>
      </form>
    </>
  );
};

export default LoginForm;
 /*  return (
    <div>
    <h1 className='title'>LOGIN</h1>
    <form className="loginForm"noValidate validated={validated} onSubmit={handleFormSubmit}>   
      <div>
        <label className="label">Email:</label>
        <input
          type="email"
          className="entryField"
          value={userFormData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label className="label">Password:</label>
        <input
          type="password"
          className="entryField"
          value={userFormData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Login</button>
      <div className="linkContainer">
        <p>Don't have an account yet?</p>
        <Link to="/signup" className="link">
          Sign up instead!
        </Link>
      </div>
    </form>
    </div>
  );
} */


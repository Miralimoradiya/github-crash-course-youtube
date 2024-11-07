// Login.jsx 
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (email && password) {
      fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setErrorMessage(data.error);  
          } else {
            setSuccessMessage(data.message); 
            navigate('/home'); 
          }
        })
        .catch((err) => {
          console.error('Error during login:', err);
          setErrorMessage('Server error. Please try again later.');
        });
    } else {
      setErrorMessage('Email and password are required.');
    }
  };

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h3 className="text-center mb-4">Login</h3>
        
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value.trim())}
                  placeholder="Enter password"
                />
              </div>

               {/* Display error/success message */}
               {errorMessage && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {errorMessage}
                  </div>
                )}
                {successMessage && (
                  <div className="alert alert-success mt-3" role="alert">
                    {successMessage}
                  </div>
                )}

              <button type="submit" className="btn btn-primary btn-block mt-3">
                Login
              </button>
            </form>
            <div className="mt-3 text-center">
              <Link to="/">Don't have an account? Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}


import { useState } from 'react';
import { PiWechatLogo } from "react-icons/pi";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginRoute } from '../../apiRoutes';
import Cookies from 'js-cookie'; // Import js-cookie
import './login.css';

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: ""
  });

  const [errorMsg, setErrorMsg] = useState(""); // State to handle error messages
  const navigate = useNavigate(); // Used for navigation after successful login

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = values;

    if (username && password) {
        const { data } = await axios.post(loginRoute, { username, password });
        console.log(data);

        if (data.status === true) {
          setErrorMsg(""); // Clear error message on success
          // Store token in a cookie
          Cookies.set('authToken', data.token, { expires: 1 }); // Cookie expires in 1 day
          navigate("/"); // Navigate to home page after successful login
        } else if(data.status===false){
             console.log(data.msg)
          setErrorMsg(data.msg); // Show error message from server
        }
    } else {
      setErrorMsg("Please fill in both username and password.");
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div className='login-container'>
      <div className='login-content-container'>
        <div className='d-flex flex-row m-5'>
          <PiWechatLogo className='text-primary fs-1' />
          <h1 className='text-primary'>Chatty</h1>
        </div>
        <form className='d-flex flex-column shadow-sm p-3 login-form' onSubmit={(event) => handleSubmit(event)}>
          <h1 className='fs-3 login-text'>Login</h1>
          <input
            type='text'
            placeholder='Username'
            className='p-1 mb-3 login-input'
            name="username"
            required
            onChange={(e) => handleChange(e)}
          />
          <input
            type='password'
            placeholder='Password'
            className='p-1 mb-3 login-input'
            name="password"
            required
            onChange={(e) => handleChange(e)}
          />
          {errorMsg && (
            <p style={{ color: 'red' }}>{errorMsg}</p>
          )}
          <button className='btn btn-primary' type="submit">Login</button>
          <a href="/register" className='register-link'>Don't have an account? Register now</a>
        </form>
      </div>
    </div>
  );
};

export default Login;

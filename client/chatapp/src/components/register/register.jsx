import { useState } from 'react';
import { PiWechatLogo } from "react-icons/pi";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../login/login.css';
import { registerRoute } from '../../apiRoutes';

const Register = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [profileImage, setProfileImage] = useState(null); // State for handling image
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { password, email, username, confirmPassword } = values;

        if (password && confirmPassword && email && username) {
            if (password !== confirmPassword) {
                alert("Password mismatch");
            } else if (password.length < 6) {
                alert("Password must contain at least 6 characters");
            } else if (username.length < 5) {
                alert("Username must contain at least 5 characters");
            } else {
                // Creating FormData to send file and text data
                const formData = new FormData();
                formData.append("username", username);
                formData.append("email", email);
                formData.append("password", password);
                if (profileImage) {
                    formData.append("image", profileImage); // Adding profile image to form data
                }

                try {
                    const { data } = await axios.post(registerRoute, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });

                    console.log(data, 'data');
                    if (data.status === true) {
                        navigate("/login");
                    } else if (data.status === false) {
                        setErrorMsg(data.msg);
                    }
                } catch (error) {
                    console.log(error);
                    setErrorMsg("Error occurred during registration");
                }
            }
        }
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleImageChange = (event) => {
        setProfileImage(event.target.files[0]); // Handling file input
    };

    return (
        <div className='login-container'>
            <div className='login-content-container'>
                <div className='d-flex flex-row m-5'>
                    <PiWechatLogo className='text-primary fs-1' />
                    <h1 className='text-primary'>Chatty</h1>
                </div>
                <form className='d-flex flex-column shadow-sm p-3 login-form' onSubmit={(event) => handleSubmit(event)}>
                    <h1 className='fs-3 login-text'>Register</h1>
                    <input
                        type='text'
                        placeholder='Username'
                        className='p-1 mb-3 login-input'
                        required
                        name="username"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        className='p-1 mb-3 login-input'
                        required
                        name="email"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        className='p-1 mb-3 login-input'
                        required
                        name="password"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        className='p-1 mb-3 login-input'
                        required
                        name="confirmPassword"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="file"
                        className="p-1 mb-3 login-input"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {errorMsg && (
                        <p style={{ color: 'red' }}>{errorMsg}</p>
                    )}
                    <button className='btn btn-primary' type="submit">Register</button>
                    <a href="/login" className='register-link'>Already have an account? Login here</a>
                </form>
            </div>
        </div>
    );
};

export default Register;

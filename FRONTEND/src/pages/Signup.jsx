import React, { useEffect, useState } from 'react';
import LOGO from "../assets/logo.png";
import BG_Image from "../assets/bg.jpg";
import './Signup.css'; // Import CSS file if needed
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {useSignupMutation} from "../store/userApiSlice";
import { toast } from 'react-toastify';
import { setCredentials } from '../store/authSlice';


const Signup = () => {
  // State variables for form fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup] = useSignupMutation();

  const [isLoading, setIsLoading] = useState(true);
  const {userInfo} = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup({username, email, password, confirmPassword}).unwrap();
      // dispatch(setCredentials({...res}))
      navigate('/login')
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className=' d-flex vw-100 vh-100'>
        {isLoading ? (
          <div id='loader'>
            <div className="spinner"></div>
          </div>
        ) :
        (
          <div className="peers ai-s fxw-nw h-100vh d-flex col">
            <div className="peer peer-greed h-100 pos-r bgr-n bgpX-c bgpY-c bgsz-cv col-md-8 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${BG_Image})` }}>
              <div className="pos-a centerXY">
                <div className=" bg-white rounded-circle d-flex justify-content-center align-items-center" style={{width: '120px', height: '120px'}}>
                  <img className="pos-a centerXY" src={LOGO} alt=""/>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4 peer h-100 bgc-white scrollable pos-r p-5" style={{minWidth : '320px'}}>
              <h4 className="fw-300 c-grey-900 mB-40">Register</h4>
              <form className='' onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-normal text-dark">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    Placeholder='John Doe'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-normal text-dark">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    Placeholder='name@email.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-normal text-dark">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label text-normal text-dark">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary btn-color">Signup</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
  );
};

export default Signup;

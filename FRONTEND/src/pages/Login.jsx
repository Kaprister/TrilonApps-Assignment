import React, { useState, useEffect } from 'react';
import LOGO from "../assets/logo.png";
import BG_Image from "../assets/bg.jpg";
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { resolvePath, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../store/userApiSlice';
import { toast } from 'react-toastify';
import { setCredentials } from '../store/authSlice';


const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {userInfo} = useSelector((state) => state.auth)

  useEffect(() => {
    if(userInfo){
      navigate('/');
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({email, password}).unwrap();
      
      // console.log("response from login:", res);
      // console.log("response from login Payload ::::", res.payload);
      dispatch(setCredentials({...res}));
      navigate('/');
    } catch (err) {
      // console.error("An error occurred during login:", err);
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <div className=" d-flex vw-100 vh-100">
      {isLoading ? (
        <div id='loader'>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="peers ai-s fxw-nw h-100vh d-flex col">
          <div className="peer peer-greed h-100 pos-r bgr-n bgpX-c bgpY-c bgsz-cv col-md-8 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${BG_Image})` }}>
            <div className="pos-a centerXY">
              <div className=" bg-white rounded-circle d-flex justify-content-center align-items-center" style={{width: '120px', height: '120px'}}>
                <img className="pos-a centerXY" src={LOGO} alt=""/>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 peer p-5 h-100 bgc-white scrollable pos-r" style={{minWidth: '320px'}}>
            <h4 className="fw-300 c-grey-900 mB-40">Login</h4>
            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label className="text-normal text-dark form-label">Username</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="John Doe"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="text-normal text-dark form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}  
                  />
              </div>
              <div className="">
                <div className="peers ai-c jc-sb fxw-nw d-flex justify-content-between align-item-center">
                  <div className="peer">
                    <div className="checkbox checkbox-circle checkbox-info peers ai-c">
                      <input type="checkbox" id="inputCall1" name="inputCheckboxesCall" className="peer"/>
                      <label htmlFor="inputCall1" className=" peers peer-greed js-sb ai-c form-label">
                        <span className="peer peer-greed">Remember Me</span>
                      </label>
                    </div>
                  </div>
                  <div className="peer">
                    <button className="btn btn-primary btn-color">Login</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

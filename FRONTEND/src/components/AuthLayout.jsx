import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from './Loader'


function AuthLayout({children, authentication = true}) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)



    useEffect(()=>{
      if(authentication && authStatus != authentication){
        navigate("/login")
      } else if(!authentication && authStatus!== authentication){
        navigate("/")
      }
      setLoader(false)
    }, [authStatus, navigate, authentication])
  return loader? <div className='min-h-screen flex justify-center items-center bg-[#00040F]'><Loader/></div>: <div>{children}</div>
}

export default AuthLayout
'use client';
import React, { useState, useEffect } from 'react';
import cookieCutter from 'cookie-cutter';
import Logo from '../components/logo/Logo';
import styles from './Login.style';
import Input from '../components/input/Input';
import Button from '../components/button/Button';
import { useDispatch,useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setLogin } from '@/app/redux/slices/loginSlice';
import cookiesNames from '@/app/utils/constant/Constant';
const CryptoJS = require("crypto-js");
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {SlLogin} from 'react-icons/sl';


export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)

  const data = useSelector((state) => state.loginReducer)

  const [userField, setUserField] = useState({
    email: "",
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState("")
  const [iserror, setIserror] = useState(false)



  const changeUserFieldHandler = (e) => {
    const { name, value } = e.target;
    setUserField({
      ...userField,
      [e.target.name]: e.target.value
    });

  }

  const errorHandler = (flag, msg,loading) => {
    setIsLoading(loading)
    setIserror(flag)
    setErrorMsg(msg)
  }




  const makeLogin = async () => {   
    if(userField.email != "" && userField.password !=""){
      dispatch(setLogin(userField)).then(function (e) {
        if (e.payload && e.payload.success) {
          errorHandler(false,"",data.isLoading)
          localStorage.setItem('user', JSON.stringify(e.payload.data))
          localStorage.setItem(cookiesNames.LOGIN_NAME_ADMIN_XX, true)
          const encrypted = CryptoJS.AES.encrypt(e.payload.token, process.env.NEXT_PUBLIC_TITLE).toString();
          cookieCutter.set(cookiesNames.AUTH_X_MIT_DELIVER_20, true)  // for middleware 
          cookieCutter.set(cookiesNames.LOG_IN, true) // login status
          cookieCutter.set(cookiesNames.HOW_THIS_MEASUREMENT_IS, encrypted) //token 
          router.replace("/") 
        }
        else if(e.payload && !e.payload.success) {
          errorHandler(true,e.payload.message,data.isLoading)
  
        }
        else{
          errorHandler(true,data.msg,data.isLoading)
        }
      })
    }

    else {
          
      errorHandler(true,"All  fields are required.")

    }
   
  }

  return (
    <div className="container">

      <div className="row justify-content-center">

        <div className="col-xl-10 col-lg-12 col-md-9">

          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">

              <div className="row">
                <div className="col-lg-6 " style={styles.container}>
                  {
                    isLoading && !iserror ?
                      <AiOutlineLoading3Quarters size={30} />

                      :
                      iserror ? 
                    <div>{errorMsg}</div>
                    :
                      <Logo
                        width={100}
                        height={100}
                        top={60}
                      />
                  }
                


                </div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome ! Log in to cont.</h1>
                    </div>

                    <form className="user">

                      <div className="form-group">
                        <Input
                          name="email"
                          onChange={(e) => changeUserFieldHandler(e)}
                          placeholder="Enter User Name..." />
                      </div>
                      <div className="form-group">
                        <Input
                          name="password"
                          onChange={(e) => changeUserFieldHandler(e)}
                          type="password"
                          placeholder="Password" />
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input type="checkbox" className="custom-control-input" id="customCheck" />
                          <label className="custom-control-label" >Remember
                            Me</label>
                        </div>
                      </div>
                      <Button
                      classname="btn btn-user btn-block btn-danger"
                        text={"Login"}
                        onclick={makeLogin}
                        icon = <SlLogin size={20} />

                      />
                      <hr />

                    </form>
                    <hr />
                    <div className="text-center">
                      <a className="small" href="forgot-password.html">Forgot Password?</a>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

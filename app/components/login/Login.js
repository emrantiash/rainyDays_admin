'use client';
import React, { useState, userState } from 'react';
import cookieCutter from 'cookie-cutter';
import Logo from '../logo/Logo';
import styles from './Login.style';
import Input from '../input/Input';
import Button from '../button/Button';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setLogin } from '@/app/redux/slices/loginSlice';
import cookiesNames from '@/app/utils/constant/Constant';
const CryptoJS = require("crypto-js");


export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [userField, setUserField] = useState({
    email: "",
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState("")
  const [iserror, setIserror] = useState(false)

  const changeUserFieldHandler = (e) => {
    const {name,value} = e.target; 
    setUserField({
      ...userField,
      [e.target.name]: e.target.value
    });

  }

  const errorHandler = (flag, msg) => {
    setIserror(flag)
    setErrorMsg(msg)
}


  // const login = () => {
  //   let myPromise = new Promise(function (resolve, reject) {
  //     dispatch(setlogin(userField))
  //     resolve(e);

  //     reject(new Error('Will this be ignored?')); // ignored
  //   });


  //   myPromise
  //     .then(function (value) {
  //       console.log("the resolve value is =======" + value)
  //       localStorage.setItem('login', value)
  //     },
  //       function (error) {
  //         console.log(error)
  //       }
  //     )
  // }

  const makeLogin = async () => {
    errorHandler(false,"")
        dispatch(setLogin(userField)).then(function (e) {
            if (e.payload && e.payload.success) {  
              console.log("===if===",e.payload)
                setIserror(false)
                localStorage.setItem('user',JSON.stringify(e.payload.data))
                localStorage.setItem('login',true)
                const encrypted = CryptoJS.AES.encrypt(e.payload.token, process.env.NEXT_PUBLIC_TITLE).toString();
                cookieCutter.set(cookiesNames.AUTH_X_MIT_DELIVER_20, true)  // for middleware 
                cookieCutter.set(cookiesNames.LOG_IN, true) // login status
                cookieCutter.set(cookiesNames.HOW_THIS_MEASUREMENT_IS, encrypted) //token 

                
                 router.replace("/")
            }
            else {
              console.log("===else===",e.payload)
                 errorHandler(true,e.payload)
                
                //  return <Signin />
            }


        })
   

}

  return (
    <div className="container">


      <div className="row justify-content-center">

        <div className="col-xl-10 col-lg-12 col-md-9">

          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">

              <div className="row">
                <div className="col-lg-6 " style={styles.container}>
                  <Logo
                    width={300}
                    height={200}
                    // top={60}
                  />

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
                        name = "password"
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
                        text={"Login"}
                        onclick={makeLogin}
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

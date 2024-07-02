"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Label from '@/app/components/label/Label';
import Input from '@/app/components/input/Input';
import Select from '../components/select/Select';
import Textarea from '@/app/components/textarea/Textarea';
import Button from '@/app/components/button/Button';
import styles from './page.style';
import { setbreadcrumb } from '@/app/redux/slices/breadcrumbSlice';
import { addPickUpEmployee } from '@/app/redux/slices/pickupSlice';
import { RiAddCircleLine } from "react-icons/ri";
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { BiError } from "react-icons/bi";

const data = [
  {
    id: 1,
    name: "Category-1"
  },
  {
    id: 2,
    name: "Category-2"
  }
]

const re = /^(01[3-9])\d{8}$/

export default function Page() {
  const dispatch = useDispatch()
  const [msg, setMsg] = useState("")
  const [iserror, setIserror] = useState(false)
  const [userField, setUserField] = useState({
    name: "",
    email: "",
    mobile: "",
    nid: "",
    address: "",
    password: "",
    ref_name: "",
    ref_phone: "",
    ref_mobile: "",
    ref_nid: "",
    ref_relation: "",
    date: ""
  });


  useEffect(() => {
    dispatch(setbreadcrumb(["Merchant", "Sign Up"]))
  },[dispatch])

  const errorFlag = (flag, msg) => {
    setIserror(flag)
    setMsg(msg)
  }

  const changeUserFieldHandler = (e) => {
    const { name, value } = e.target;

    console.log(name, value)

    if (name === "mobile") {
      setIserror(false)
      setMsg("")
      console.log(name, iserror)

      const test = re.test(value)
      if (test) {
        errorFlag(false, "")
      }

      else {
        errorFlag(true, " Wrong Mobile number formate")
      }

    }
    setUserField({
      ...userField,
      [e.target.name]: e.target.value
    });

  }

  const submitMyForm = () => {
    let data = {
      name: userField.name,
      mobile: userField.mobile,
      email: userField.email,
      password: userField.password,
      address: userField.address,
      nid: userField.nid,
      guarantor_name: userField.ref_name,
      relation_with_guarantor: userField.ref_relation,
      guarantor_nid: userField.ref_nid,
      joining_date: userField.date,
      salary: userField.salary,
      status: 1
    }

    dispatch(addPickUpEmployee(data)).then(function (e) {
      console.log(e)
      if (e.payload && e.payload.success) {
        errorFlag(false, e.payload.message)
        // setMsg(e.payload.message)
      }
      else {
        console.log("the payload is ==", e.payload)
        setIserror(true)
        if (e.payload === "undefined")
          errorFlag(true, "Network Error .Try Later")
        else
          errorFlag(true, e.payload.message)

      }
    })
  }

  return (
    <main className="wow fadeInUp" data-wow-delay="2.12s">
      {/* <div>GO TO USER PORTAL FOR USER REGISTRATION</div> */}
      <div className="container-fluid" >

        <div className='row' >
          <div className='col-md-4' >

            <div className='row' style={styles.box}>
              <Label title="Name" required />
              <Input placeholder='Enter name' name="name" id="name" onChange={(e) => changeUserFieldHandler(e)} />
            </div>
            <div className='row' style={styles.box}>
              <Label title="Business Category" required />
              <Select data={data} name="category" id="category" onChange={(e) => changeUserFieldHandler(e)} />
            </div>
            <div className='row' style={styles.box}>
              <Label title="Shap/Page" required />
              <Input placeholder='Enter page/shop name' name="shop" id="shop" onChange={(e) => changeUserFieldHandler(e)} />
            </div>
            <div className='row' style={styles.box}>
              <Label title="Select Shop Area " required />
              <Select data={data} name="category" id="category" onChange={(e) => changeUserFieldHandler(e)} />
            </div>
            <div className='row' style={styles.box}>
              <Label title="Shap Address" required />
              <Input placeholder='Enter page/shop name' name="shop" id="shop" onChange={(e) => changeUserFieldHandler(e)} />
            </div>
            <div className='row' style={styles.box}>
              <Label title="Mobile" required />
              <Input placeholder='Enter page/shop name' name="shop" id="shop" onChange={(e) => changeUserFieldHandler(e)} />
            </div>
            <div className='row' style={styles.boxButton}>
              <Button  text="GET OTP"
              classname="btn btn-user  btn-warning"
              icon=<RiAddCircleLine size={30} />
                onclick={submitMyForm} />
            </div>



          </div>
          <div className='col-md-2'></div>

          <div className='col-md-4'>
          <div className='row' style={styles.box}>
            <Label title="OTP" required />
            <Input placeholder='OTP..' name="otp" id="otp" onChange={(e) => changeUserFieldHandler(e)} />
          </div>
          <div className='row' style={styles.box}>
            <Label title="Password" required />
            <Input placeholder='Enter page/shop name' name="shop" id="shop" onChange={(e) => changeUserFieldHandler(e)} />
          </div>

          <div className='row' style={styles.boxButton}>
              <Button  text="GET OTP"
              classname="btn btn-user  btn-success"
              icon=<RiAddCircleLine size={30} />
                onclick={submitMyForm} />
            </div>
        </div>


        <hr />

      </div>
    </div>



    </main >
  )
}

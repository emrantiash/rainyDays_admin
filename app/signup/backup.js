"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Label from '@/app/components/label/Label';
import Input from '@/app/components/input/Input';
import Textarea from '@/app/components/textarea/Textarea';
import Button from '@/app/components/button/Button';
import styles from './page.style';
import { setbreadcrumb } from '@/app/redux/slices/breadcrumbSlice';
import { addPickUpEmployee } from '@/app/redux/slices/pickupSlice';
import { RiAddCircleLine } from "react-icons/ri";
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { BiError } from "react-icons/bi";

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
      dispatch(setbreadcrumb(["Sign Up", ""]))
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
          errorFlag(false,e.payload.message)
          // setMsg(e.payload.message)
        }
        else {
          console.log("the payload is ==",e.payload)
          setIserror(true)
          if (e.payload === "undefined")
          errorFlag(true,"Network Error .Try Later")
          else
          errorFlag(true,e.payload.message)
          
        }
      })
    }
  
    return (
      <main className="wow fadeInUp" data-wow-delay="2.12s">
        {/* <div>GO TO USER PORTAL FOR USER REGISTRATION</div> */}
        <div className="container-fluid" >
  
        <div className='row' >
            <div className='col-md-12' >
  
          <div className='row' style={styles.box}>
            <div className='col-md-2' style={styles.label}>
              <Label title="Name" required />
            </div>
            <div className='col-md-4' >
              <Input placeholder='Enter name' name="name" id="name" onChange={(e) => changeUserFieldHandler(e)} />
            </div>
  
  
          </div>
          <div className='row' style={styles.box}>
            <div className='col-md-2' style={styles.label}>
              <Label title="Phone" required />
            </div>
            <div className='col-md-4'>
              <Input placeholder='Enter phone' name="mobile" id="mobile" onChange={(e) => changeUserFieldHandler(e)} />
            </div>
          </div>
          <div className='row' style={styles.box}>
            <div className='col-md-2' style={styles.label}>
              <Label title="Email" />
            </div>
            <div className='col-md-4'>
              <Input placeholder='Enter email' name="email" id="email" onChange={(e) => changeUserFieldHandler(e)} />
            </div>
          </div>
          <div className='row' style={styles.box}>
            <div className='col-md-2' style={styles.label}>
              <Label title="Nid" required />
            </div>
            <div className='col-md-4'>
              <Input placeholder='Enter nid' name="nid" id="nid" onChange={(e) => changeUserFieldHandler(e)} />
            </div>
            <div className='col-md-1'></div>
            <div className='col-md-5' style={styles.buttonScope} onClick={submitMyForm} data-wow-delay=".65s">
              {iserror ? <BiError size={50} color='red' /> : msg != "" && <HiChatBubbleLeftRight size={50} color='orange' />}
              <div style={iserror ? styles.msg : styles.successMsg}>{msg}</div>
            </div>
          </div>
          <div className='row' style={styles.box}>
            <div className='col-md-2' style={styles.label}>
              <Label title="Address" required />
            </div>
            <div className='col-md-4'>
              <Textarea name="address" id="address" onChange={(e) => changeUserFieldHandler(e)} />
            </div>
  
          </div>
          <div className='row' style={styles.box}>
            <div className='col-md-2' style={styles.label}>
              <Label title="Salary" required />
            </div>
            <div className='col-md-4'>
              <Input placeholder='20000' name="salary" id="salary" onChange={(e) => changeUserFieldHandler(e)} />
            </div>
          </div>
  
  
  
          <div className='row' style={styles.box}>
            <div className='col-md-2' style={styles.label}>
              <Label title="Reference Name" required />
            </div>
            <div className='col-md-4'>
              <Input placeholder='Enter ref. name' name="ref_name" id="ref_name" onChange={(e) => changeUserFieldHandler(e)} />
            </div>
          </div>
          <div className='row' style={styles.box}>
            <div className='col-md-2' style={styles.label}>
              <Label title="Reference Phone" required />
            </div>
            <div className='col-md-4'>
              <Input placeholder='Enter ref. phone' name="ref_phone" id="ref_phone" onChange={(e) => changeUserFieldHandler(e)} />
            </div>
          </div>
          <div className='row' style={styles.box}>
            <div className='col-md-2' style={styles.label}>
              <Label title="Reference Nid" />
            </div>
            <div className='col-md-4'>
              <Input placeholder='Enter ref. nid' name="ref_nid" id="ref_nid" onChange={(e) => changeUserFieldHandler(e)} />
            </div>
          </div>
  
          <div className='row' style={styles.box}>
            <div className='col-md-2' style={styles.label}>
              <Label title="Relation" required />
            </div>
            <div className='col-md-4'>
              <Input placeholder='Relation with reference' name="ref_relation" id="ref_relation" onChange={(e) => changeUserFieldHandler(e)} />
            </div>
          </div>
  
          <div className='row' style={styles.box}>
            <div className='col-md-2' style={styles.label}>
              <Label title="Joining Date" required />
            </div>
            <div className='col-md-4'>
              <Input placeholder='date' type="date" name="date" id="date" onChange={(e) => changeUserFieldHandler(e)} />
            </div>
          </div>
  
          <div className='row' style={styles.box}>
            <div className='col-md-2' style={styles.label}>
              <Label title="Password" required />
            </div>
            <div className='col-md-4'>
              <Input type="password" placeholder='**********' name="password" id="password" onChange={(e) => changeUserFieldHandler(e)} />
            </div>
          </div>
  
          <div className='row' >
            <div className='col-md-2' style={styles.label}>
              {/* <Label title="Password" required /> */}
            </div>
            <div className='col-md-4' style={styles.boxButton}>
              <Button text="Add Pick !"
              classname="btn btn-user  btn-danger"
                icon=<RiAddCircleLine size={30} />
                onclick={submitMyForm}
              />
            </div>
          </div>
  
          <hr />
  
          </div>
          </div>
  
        </div>
  
      </main>
  )
}

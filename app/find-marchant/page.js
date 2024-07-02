"use client";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { createBulkOrder, findMarchantID } from '../redux/slices/marchantSlice';
import { setbreadcrumb } from '../redux/slices/breadcrumbSlice';
import Label from '../components/label/Label';
import Input from '../components/input/Input';
import Button from '../components/button/Button';
import { RiAddCircleLine } from "react-icons/ri";
import styles from '../marchant-bulk-order/page.style';

const re = /^(01[3-9])\d{8}$/
export default function Page() {
    const dispatch = useDispatch()
    const [msg, setMsg] = useState("")
    const [data, setData] = useState([])
    const [userField, setUserField] = useState({
        mobile: ""
    });
    const changeUserFieldHandler = (e) => {
        const { name, value } = e.target;
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
       



    }


    const _submit = () => {
        setMsg("")

        if (userField.mobile != "") {
            dispatch(findMarchantID(userField.mobile)).then(function (e) {
                if (e.payload && e.payload.success) {
                    setData(e.payload.data)
                    parallelJob("")
                }


                else if (e.payload && !e.payload.success)
                    parallelJob(e.payload.message)
                else
                    parallelJob("Something Went Wrong..")
            })
        }
        else {
            parallelJob("Enter Marchant Phone")
        }

    }

    const parallelJob = (msg) => {
        setMsg(msg)
        setUserField({
            mobile: ""
        })
    }
    useEffect(() => {
        dispatch(setbreadcrumb(["Marchant", "Find A Marchant"]));

    }, [dispatch]);
    return (
        <main className="wow fadeInUp" data-wow-delay="2.12s">
            <div className="container-fluid" >

                <div className='row' >
                    {/* <div className='col-md-2' ></div> */}
                    <div className='col-md-8' >

                        <div className='row' style={styles.box}>
                            <div className='col-md-2' style={styles.label}>
                                <Label title="Marchant Phone" required />
                            </div>
                            <div className='col-md-6' style={styles.inputBox}>
                                <Input
                                    style={{ width: 100 }}
                                    placeholder='Marchant Phone'
                                    name="mobile" id="name"
                                    onChange={(e) => changeUserFieldHandler(e)} />
                            </div>
                        </div>
                        <hr />

                        <div className='row' >
                            <div className='col-md-2' style={styles.label}>
                            </div>
                            <div className='col-md-4' style={styles.boxButton}>
                                <Button text="FInd Marchant "
                                    classname="btn btn-user  btn-danger"
                                    icon=<RiAddCircleLine size={30} />
                                    onclick={_submit}
                                />
                            </div>
                        </div>
                        <hr />
                        {
                            // data.length > 0 &&
                            <div>
                            <div className='row' style={styles.box}>
                                <div className='col-md-2' style={styles.label}>
                                    <Label title="Marchant Id"  />
                                </div>
                                <div className='col-md-4' style={styles.inputBox}>
                                    <Label title={data.length > 0 && data[0].id} />
                                </div>
                            </div>
                            <div className='row' style={styles.box}>
                                <div className='col-md-2' style={styles.label}>
                                    <Label title="Name"  />
                                </div>
                                <div className='col-md-4' style={styles.inputBox}>
                                    <Label title={data.length > 0 && data[0].name} />
                                </div>
                            </div>
                            <div className='row' style={styles.box}>
                                <div className='col-md-2' style={styles.label}>
                                    <Label title="Business category"  />
                                </div>
                                <div className='col-md-4' style={styles.inputBox}>
                                    <Label title={data.length > 0 && data[0].id} />
                                </div>
                            </div>
                            <div className='row' style={styles.box}>
                                <div className='col-md-2' style={styles.label}>
                                    <Label title="Shop"  />
                                </div>
                                <div className='col-md-4' style={styles.inputBox}>
                                    <Label title={data.length > 0 && data[0].shop} />
                                </div>
                            </div>
                            <div className='row' style={styles.box}>
                                <div className='col-md-2' style={styles.label}>
                                    <Label title="Area"  />
                                </div>
                                <div className='col-md-4' style={styles.inputBox}>
                                    <Label title={data.length > 0 && data[0].area.name} />
                                </div>
                            </div>
                            <div className='row' style={styles.box}>
                                <div className='col-md-2' style={styles.label}>
                                    <Label title="Address" required />
                                </div>
                                <div className='col-md-4' style={styles.inputBox}>
                                    <Label title={data.length > 0 && data[0].shop_address} />
                                </div>
                            </div>
                            <div className='row' style={styles.box}>
                                <div className='col-md-2' style={styles.label}>
                                    <Label title="Payment Method" required />
                                </div>
                                <div className='col-md-4' style={styles.inputBox}>
                                    {/* if no payment method 'add option' if yes then name */}
                                    {/* <Label title="Add " /> */}
                                  <div>  Add Method </div>
                                </div>
                            </div>
                            </div>

                        }


                        <div className='row' style={styles.box}>
                            {msg}
                        </div>
                    </div>
                    <div className='col-md-1'></div>
                    <div className='col-md-1' style={styles.box}>
                     {/* <div style={{
                        display : 'flex',
                        flexDirection : 'row'
                     }}> <Input type="radio" name="payment"/>Bkash
                     </div> 
                     <div style={{
                        display : 'flex',
                        flexDirection : 'row'
                     }}> <Input type="radio" name="payment"/>Bkash
                     </div>  */}
                    </div>
                </div>
            </div>
        </main>
    )
}

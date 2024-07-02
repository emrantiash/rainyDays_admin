"use client";
import React, { useState, useEffect } from 'react';
import {  useDispatch } from "react-redux";
import { createBulkOrder } from '../redux/slices/orderSlice';
import { setbreadcrumb } from '../redux/slices/breadcrumbSlice';
import Label from '../components/label/Label';
import Input from '../components/input/Input';
import Button from '../components/button/Button';
import { RiAddCircleLine } from "react-icons/ri";
import styles from './page.style';

export default function Page() {
    const dispatch = useDispatch()
    const [msg,setMsg] = useState("")
    const [userField, setUserField] = useState({
        marchant: "",
        quantity: 0
    });
    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });

    }

    const _submit = () => {
        const option = {
            merchant_id: userField.marchant,
            quantity: parseInt(userField.quantity),


        }
        setMsg("")

        if (userField.marchant != ""   && userField.quantity > 0) {
            dispatch(createBulkOrder(option)).then(function (e) {

                if(e.payload && e.payload.success)
                parallelJob("Order Id ="+e.payload.data.bulk_order_unique_id)
                
                else if(e.payload && !e.payload.success)
                parallelJob(e.payload.message)
                else
                parallelJob("Something Went Wrong..")
            })
        }
        else{
            parallelJob("Enter Marchant Id and Quantity")
        }

    }
    const parallelJob = (msg) => {
        setMsg(msg)
        setUserField({
            marchant: "",
            quantity: 0
        })
    }
    useEffect(() => {
        dispatch(setbreadcrumb(["Marchant", "Create Bulk Order"]));

    }, [dispatch]);
    return (
        <main className="wow fadeInUp" data-wow-delay="2.12s">
            <div className="container-fluid" >

                <div className='row' >
                {/* <div className='col-md-2' ></div> */}
                    <div className='col-md-12' >

                        <div className='row' style={styles.box}>
                            <div className='col-md-2' style={styles.label}>
                                <Label title="Marchant ID" required />
                            </div>
                            <div className='col-md-4' style={styles.inputBox}>
                                <Input
                                    style={{ width: 100 }}
                                    value={userField.marchant}
                                    placeholder='Marchant ID.'
                                    name="marchant" id="name"
                                    onChange={(e) => changeUserFieldHandler(e)} />
                            </div>
                        </div>
                        <hr/>
                        <div className='row' style={styles.box}>
                            <div className='col-md-2' style={styles.label}>
                                <Label title="Quantity" required />
                            </div>
                            <div className='col-md-4' style={styles.inputBox}>
                                <Input
                                    style={{ width: 100 }}
                                    value={userField.quantity}
                                    placeholder='10'
                                    name="quantity"
                                    onChange={(e) => changeUserFieldHandler(e)} />
                            </div>
                        </div>
                        <hr/>
                        <div className='row' >
                            <div className='col-md-2' style={styles.label}>
                            </div>
                            <div className='col-md-4' style={styles.boxButton}>
                                <Button text="Place Bulk Order !"
                                    classname="btn btn-user  btn-success"
                                    icon=<RiAddCircleLine size={30} />
                                    onclick={_submit}
                                />
                            </div>
                        </div>
<hr/>
                        <div className='row' >
                            <div className='col-md-2' style={styles.label}>
                            </div>
                            <div className='col-md-4' style={styles.successMsg}>
                                {msg}
                            </div>
                        </div>

                        <hr />
                    </div>
                </div>
            </div>
        </main>
    )
}

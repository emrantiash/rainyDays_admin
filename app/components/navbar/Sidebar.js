import React,{useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link' ;
import {useSelector} from 'react-redux';
import useIsLogin from '@/app/lib/hooks/isLogin';
import { getAllBulkOrder } from '@/app/redux/slices/orderSlice';
import { getMerchantGroup } from '@/app/redux/slices/paymentSlice';

export default function Sidebar() {
    const dispatch =  useDispatch()
    const [isLogin , setIsLogin] = useState(false)
    const data = useSelector((state) => state.loginReducer)

    const useLogin = useIsLogin()

    useEffect(() => {
        !data.Sidebar && setIsLogin(false)       
        setIsLogin(useLogin[0])
    },[data.Sidebar, useLogin]);

    const getBulkData = () =>{
        dispatch(getAllBulkOrder())
    }

    const _callMerchantPaymentGroup = () =>{
            dispatch(getMerchantGroup())
    }

    return (       
            isLogin &&        
        <div>
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            {
                // login && 
                <>

                <Link className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">
                        {/* SB Admin <sup>2</sup> */}
                        WeDeliver
                        </div>
                </Link>

                <hr className="sidebar-divider my-0" />


                <li className="nav-item active">
                    <Link className="nav-link" href="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></Link>
                </li>


                <hr className="sidebar-divider" />


                    <div className="sidebar-heading">
                        Interface
                    </div>


                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                            aria-expanded="true" aria-controls="collapseTwo">
                          <i className="fas fa-sharp fa-regular fa-user"></i>
                      
                            <span>Employee</span>
                        </a>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Employee Management:</h6>
                                <a className="collapse-item" href="/employee" >Employee List</a>
                                <a className="collapse-item" href="/employee/new">Add New</a>
                            </div>
                        </div>
                        
                    </li>
                    <li className="nav-item">
                        <a className="nav-link collapsed" style={{cursor:'pointer'}} data-toggle="collapse" data-target="#collapseTwoPick"
                            aria-expanded="true" aria-controls="collapseTwoPick">
                          <i className="fas fa-sharp fa-regular fa-user"></i>
                      
                            <span>Pick Up</span>
                        </a>
                        <div id="collapseTwoPick" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Pick Up Management:</h6>
                                <a className="collapse-item" href="/pickup">Employee List</a>
                                <Link className="collapse-item" href="/pickup/new">Add New</Link>
                            </div>
                        </div>
                        
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseAddress"
                            aria-expanded="true" aria-controls="collapseAddress">
                         
                         <i className="fas fa-solid fa-address-book"></i>
                            <span>Address</span>
                        </Link>
                        <div id="collapseAddress" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Address Management</h6>
                                <Link className="collapse-item" href="/parent"><i className="fas fa-solid fa-address-book"></i> Parent</Link>
                                <Link className="collapse-item" href="/branch"><i className="fas fa-solid fa-address-book"></i> Zone</Link>
                                <Link className="collapse-item" href="/branch"><i className="fas fa-solid fa-address-book"></i> Branch</Link>
                                <Link className="collapse-item" href="/area"><i className="fas fa-solid fa-address-book"></i> Area</Link>
                                
                            </div>
                        </div>
                        
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#merchantpayment"
                            aria-expanded="true" aria-controls="collapseUtilities">
                            <i className="fas fa-fw fa-wrench"></i>
                            <span>Finance</span>
                        </Link>
                        <div id="merchantpayment" className="collapse" aria-labelledby="headingUtilities"
                            data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Payment</h6>
                                <a className="collapse-item" href="/merchant-payment-group" onClick={_callMerchantPaymentGroup}>Merchant Group</a>
                                                             
                            </div>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                            aria-expanded="true" aria-controls="collapseUtilities">
                            <i className="fas fa-fw fa-wrench"></i>
                            <span>Marchant</span>
                        </Link>
                        <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                            data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Marchant Portal</h6>
                                <Link className="collapse-item" href="/signup">Sign Up</Link>
                                <Link className="collapse-item" href="/find-marchant">Find Marchant</Link>
                                <Link className="collapse-item" href="/marchant-order">Create Percel Order</Link>
                                {/* <Link className="collapse-item" href="/marchant-bulk-order">Create bulk Order</Link> */}
                                <a onClick={getBulkData} className="collapse-item" href="/upload-csv">Upload CSV</a>
                               
                            </div>
                        </div>
                    </li>


                    <hr className="sidebar-divider" />


                        <div className="sidebar-heading">
                            Addons
                        </div>


                        <li className="nav-item">
                            <Link className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                                aria-expanded="true" aria-controls="collapsePages">
                                <i className="fas fa-fw fa-folder"></i>
                                <span>Pages</span>
                            </Link>
                            <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Login Screens:</h6>
                                    <Link className="collapse-item" href="login.html">Login</Link>
                                    <Link className="collapse-item" href="register.html">Register</Link>
                                    <Link className="collapse-item" href="forgot-password.html">Forgot Password</Link>
                                    <div className="collapse-divider"></div>
                                    <h6 className="collapse-header">Other Pages:</h6>
                                    <Link className="collapse-item" href="404.html">404 Page</Link>
                                    <Link className="collapse-item" href="blank.html">Blank Page</Link>
                                </div>
                            </div>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href="charts.html">
                                <i className="fas fa-fw fa-chart-area"></i>
                                <span>Charts</span></Link>
                        </li>


                        <li className="nav-item">
                            <Link className="nav-link" href="tables.html">
                                <i className="fas fa-fw fa-table"></i>
                                <span>Tables</span></Link>
                        </li>
                         <hr className="sidebar-divider d-none d-md-block" />

                        </>
            }
            
                       
                            <div className="text-center d-none d-md-inline" >
                                <button className="rounded-circle border-0" id="sidebarToggle"></button>
                            </div>


                        </ul>
                    </div>
                    )
}

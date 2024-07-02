"use client";
import React, { useState, useEffect } from 'react';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { getAllBulkOrder } from '../redux/slices/orderSlice';
import { setbreadcrumb } from '../redux/slices/breadcrumbSlice';

export default function Page() {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.orderReducer.bulk)
   const datatable =  Array.isArray(data) && data.length > 0 ? data : []

   console.log(data)

    useEffect(() => {
        const getBulkOrder = async () => {
            dispatch(setbreadcrumb(["Marchant", "Upload CSV"]))
        };

        getBulkOrder()

    }, [dispatch]);
    return (
        <div className="container-fluid">
            <h1 className="h3 mb-2 text-gray-800">Bulk list</h1>
            <div className="card shadow mb-4">
                <div className="card-header py-3" >
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0" >
                                <thead>
                                    <tr>
                                        <th>SL.</th>
                                        <th>Order Id</th>
                                        <th>Merchant Name</th>
                                        <th>Merchant Mobile</th>
                                     
                                        <th>Time</th>
                                        <th>Action</th>

                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        
                                        data.map((data, index) =>
                                            <tr key={index} >
                                                <td>{index + 1}</td>
                                                <td>{data.bulk_order_unique_id}</td>
                                                <td>{data.merchant.name}</td>
                                                <td>{data.merchant.mobile}</td>
                                                
                                                <td>{data.updated_at}</td>
                                                <td>Upload CSV</td>
                                            </tr>

                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

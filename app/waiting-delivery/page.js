"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setbreadcrumb } from "../redux/slices/breadcrumbSlice";

export default function Page() {

    const dispatch = useDispatch()
    const data = useSelector((state) => state.orderDetailsReducer.receivedByDeleveruManData)
    console.log(data)
    useEffect(() => {
        dispatch(setbreadcrumb(["Dashboard", "Waiting for Delivery"]));   
    
      }, [dispatch]);
  return (
    <div>
      <div className="container-fluid">

        <div className="card shadow mb-4">
          <div className="card-header py-3" >
            <h6 className="m-0 font-weight-bold text-primary">Assigned Order</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                  <tr>
                    <th>SL.</th>
                    <th>Order ID</th>
                    <th>Reference</th>
                    <th>Invoice</th>
                    <th>Delivery Man</th>
                    <th>Work Area</th>
  
                  </tr>
                </thead>
              
                <tbody>
                  {
                    data.map((data, index) =>
                      <tr key={index}>
                          <td>{index+1}</td>
                        <td>{data.id}</td>
                        <td>{data.reference_id}</td>
                        <td>{data.invoice_id}</td>
                        <td>{data.delivery_officer_name}</td>
                        <td>{data.area_name}</td>

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

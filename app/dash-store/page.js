"use client";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { dashboardData } from '../redux/slices/dashboardSlice';
import { setbreadcrumb } from '../redux/slices/breadcrumbSlice';
import { storeOrderBranchWise } from '../redux/slices/orderDetailsSlice';
import Label from '../components/label/Label'
import Dashnav from '../components/navbar/Dashnav'


export default function Page() {
  const dispatch = useDispatch()
  const dashboardSlice = useSelector((state) => state.dashboardReducer)
  const data = dashboardSlice.dashboard.status_2_branch_wise


  useEffect(() => {
    dispatch(setbreadcrumb(["Dashboard", "Store"]));
  }, [dispatch])

  const getOrderDetails = (strid, data) => {
    dispatch(dashboardData([strid, data]));
    const option = "branch_id=" + data.id + "&status=2"
    dispatch(storeOrderBranchWise(option))

  };
  return (
    <main>
      <div className="container-fluid">

        <Dashnav />
        <div>
          {
            dashboardSlice.condition != "" &&
            <div style={{
              right: 10,
              width: 200,
              height: 100,
              margin: 10,
              padding: 10,
              borderTopLeftRadius: 20,
              backgroundColor: '#f6f6f6',
              // color:'white',

              position: 'fixed',
              zIndex: 10,
              fontSize: 11,
              letterSpacing: 1.0

            }}>
              <div style={{ fontSize: 11 }}> Status : {dashboardSlice.condition}</div>
              <div>  Branch :<span style={{ color: 'red' }}>{dashboardSlice.data.branch_name} </span> </div>
              <div>  Count : {dashboardSlice.data.count} </div>

              <a href="/dash-store-details" style={{ float: 'right' }}>Details </a>

            </div>
          }
          <div className="row">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <span
                className="h6 mb-0 text-gray-800"
                style={{ padding: 10 }}
              >
                <Label title="Store " size={12} />
              </span>
            </div>
          </div>
          <div className="row">
          {
            data.length == 0 && 
            <div className="col-xl-3 col-md-6 mb-4" >
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body" style={{ cursor: 'pointer' }}>
                  <div className="row no-gutters align-items-center">
                    No data found
                  </div>
                  <div className="col-auto">
                        <i className="fas fa-comments fa-2x text-gray-300"></i>
                      </div>
                </div>
              </div>
           
          </div>
          }
            
          {
            Array.isArray(data) &&
            data.length > 0 &&
            data.map((data, index) => (
              <div className="col-xl-3 col-md-6 mb-4" key={index}>
                <div className="card border-left-primary shadow h-100 py-2">
                  <div className="card-body" style={{ cursor: 'pointer' }}>
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2" onClick={() =>
                        getOrderDetails("Store", data)
                      }>

                        <div className="text-xs font-weight-bold text text-uppercase mb-1">
                          {data.branch_name}
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {/* {data.amount} */}
                          {data.count}
                        </div>

                      </div>
                      <div className="col-auto">
                        <i className="fas fa-comments fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
    </main >

  )
}

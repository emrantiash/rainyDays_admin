"use client"
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Dashnav from '../components/navbar/Dashnav';
import { getDashboardInfo,dashboardData } from '../redux/slices/dashboardSlice';
import { orderDetails } from '../redux/slices/orderDetailsSlice';
import { setbreadcrumb } from '../redux/slices/breadcrumbSlice';
import Label from '../components/label/Label'

export default function Page() {
    const dispatch = useDispatch()

    const [dashData, setDashData] = useState([]);
    const dashboardSlice = useSelector((state) => state.dashboardReducer)

    const data = dashData.status_3_branch_wise
    console.log(data)

    useEffect(() => {
        dispatch(setbreadcrumb(["Dashboard", "Way 2 Branch"]));
        dispatch(getDashboardInfo()).then(function (e) {
            if (e.payload && e.payload.success) {
                setDashData(e.payload.data);
            }
        });
    }, [dispatch])

    const getOrderDetails = (strid, data) => {
        const option = "branch_id="+data.id+"&status="+3
        dispatch(dashboardData([strid, data,"OnWay"])) 

        dispatch(orderDetails(option))
      };

    return (
        <main>
            <div className="container-fluid">
                <Dashnav />
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

              <a href="/way-to-details" style={{ float: 'right' }}>Details </a>

            </div>
          }
                <div className="row">
                    <div className="d-sm-flex align-items-center justify-content-between mb-8" style={{ width: '60%', backgroundColor: '#f6f6f' }}>
                        <span
                            className="h6 mb-0 text-gray-800"
                            style={{ padding: 10 }}
                        >
                            <Label title="On Way" size={12} />
                        </span>
                    </div>
                    
                </div>
                <div className="row">
                        {
                            Array.isArray(data) &&
                            data.length > 0 ?
                            data.map((data, index) => (
                                <div className="col-xl-3 col-md-6 mb-4" key={index}>
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body" style={{ cursor: 'pointer' }}>
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2" onClick={() =>
                                                    getOrderDetails("On Road", data)
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
                               

                            ))

                            :


                            <div className='col-sm-12' style={{
                                height : 300,
                                // backgroundColor : 'gray',
                                display : 'flex',
                                justifyContent : 'center',
                                alignItems : 'center'
                            }}>No Data Found</div>
                        
                        }
                    </div>
            </div>
        </main>
    )
}

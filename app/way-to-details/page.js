"use client"
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Dashnav from '../components/navbar/Dashnav';
import Label from '../components/label/Label';
import Input from '../components/input/Input';
import Button from '../components/button/Button';

export default function Page() {
    // const dispatch = useDispatch()
    const dashboardSlice = useSelector((state) => state.dashboardReducer.data)
    const dataset = useSelector((state)=>state.orderDetailsReducer.orderData)
    const title = useSelector((state)=>state.dashboardReducer.title)
    const [msg,setMsg] = useState("")
    console.log(dashboardSlice)


    return (
        <main>
            <div className="container-fluid">
                <Dashnav />
                <div>
          <div style={{
            // backgroundColor : '#FFEBBB',
            margin : 10 ,
            padding : 5,
            width : '60%',
            display : "flex",
            backgroundColor :'#e5e5e1',
            flexDirection : 'row',
            justifyContent : 'space-between',
            borderRadius : 8
          }}>
        <div style={{ width : '80%',}}>  <Input onChange={(e)=>_getBArcodeInput(e)}  placeholder="Scan Barcode"  width = {'50%'} /> </div>
          <Button text="Submit" width={'100%'}  classname="btn btn-user btn-block btn-danger" />

          
          </div>
          <div  style={{margin : 5 }}> {msg != "" &&  <Label title={msg} /> }</div>
          </div>
                {/* {
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
                } */}

                <div className="row">
                    <div className="d-sm-flex align-items-center justify-content-between mb-8" style={{ width: '60%', backgroundColor: '#f6f6f' }}>
                        <span
                            className="h6 mb-0 text-gray-800"
                            style={{ padding: 10 }}
                        >
                            <Label className='badge bg-success text-wrap' title={title+"->Details"} size={12} />
                        </span>
                        <Label title={dashboardSlice.branch_name} />
                    </div>

                </div>
                <div className="card shadow mb-4">
              <div className="card-header py-3" >
                <div style={{ width: '60%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <h6 className="m-0 font-weight-bold text-primary"  >
                    hello
                    {/* {selectAll ? <span onClick={_deSelectAllOrder}> Deselect All </span> : <span onClick={_selectAllOrder}>Select All</span>} */}
                  </h6>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                    <thead>
                      <tr>
                        <th>SL.</th>
                        <th>Reference</th>
                        <th>Invoice</th>
                        <th>Area</th>    
                        <th>Delivery Man</th>
                        <th>Price</th>
                        <td>Delivery</td>
                        <th>Collection</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        dataset.map((data, index) =>
                          <tr key={index} 
                        //   onClick={() => getThisData(data, index)}
                            style={{
                              cursor: "pointer",
                            //   backgroundColor: selectAll ? '#68da72' : cindex == index && "#68da72",
                            //   color: selectAll ? '#fff' : cindex == index && "#fff",
                            }}>
                            <td>{index + 1}</td>
                            <td>{data.reference_id}</td>
                            <td>{data.invoice_id}</td>
                            <td>{data.area_name}</td>
                            <td>{data.delivery_officer_name}</td>
                            <td>{data.product_price}</td>
                            <td>{data.delivery_charge}</td>
                            <td>{parseInt(data.product_price)+parseInt(data.delivery_charge)}</td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>


            </div>

        </main>
    )

}

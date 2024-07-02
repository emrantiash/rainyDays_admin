"use client";
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fixCount } from '../redux/slices/dashboardSlice';
import { setbreadcrumb } from '../redux/slices/breadcrumbSlice';
import { orderToWay } from '../redux/slices/orderSlice';
import { sendToHold ,setData} from '../redux/slices/orderDetailsSlice';
import { getTransport } from '../redux/slices/transportSlice';
import Label from '../components/label/Label'
import Dashnav from '../components/navbar/Dashnav'
import styles from './page.style'
import Select from '../components/select/Select';
import Button from '../components/button/Button';
// import { TfiAlignRight,TfiCar } from "react-icons/tfi";
// import { AiFillCar } from "react-icons/ai"


export default function Page() {
  const dispatch = useDispatch()
  const [cindex, setCindex] = useState(-1)
  const [thisdata, setThisdata] = useState("")
  const [msg, setMsg] = useState("")
  const dashboardSlice = useSelector((state) => state.dashboardReducer)
  const data = useSelector((state) => state.orderDetailsReducer)
  const vans = useSelector((state)=>state.transportReducer.data)
  const [selectAll, setSelectAll] = useState(false)
  const [orderId,setOrderId] = useState([])
  const [van,setVan] = useState(null)

  const dataset = data.data


  useEffect(() => {
    dispatch(setbreadcrumb(["Dashboard", "Store"]));
  },[dispatch])

  const getThisData = (data, index) => {
    console.log(data)
    if (!selectAll) {
      setMsg("")
      setThisdata(data)
      setCindex(index)
    }


  }

  const _sendToHideSection = () => {
    const decision = confirm(" Hold this order ?")
    if (decision) {
      let option = "id=" + thisdata.id + "&reference_id=" + thisdata.reference_id + "&status=9"
      dispatch(sendToHold(option)).then(function (e) {
        if (e.type == "send/rejected")
          setMsg("Thre is some error.contact with  administrator plz .")
        else
        {
          dispatch(fixCount())
          setMsg("Order hold.ReferenceId : "+thisdata.reference_id)
        }
          

      })
    }

  }

  const _deSelectAllOrder = () => {
    console.log(dataset)
    setSelectAll(false)
  }

  const setRererenceData = () =>{
    
    dataset.map((data,index)=>{
      setOrderId(orderId => [...orderId, data.id]);
    })
  }


  const _selectAllOrder = () => {


    setRererenceData()
    
    setSelectAll(true)
    setMsg("")
    setThisdata("")
    setCindex(-1)

    dispatch(getTransport())
  }

  const _getTransportData = (event) =>{
   
    const data = event.target.value
    const _str = data.split(",")
    const id = _str[1]
    console.log(id)
    setVan(id)
  }

  const _wayToBranch = () => {


    let option = {
      pickup_van_id : parseInt(van),
      order_id : orderId,
      status : 3 
    }

    dispatch(orderToWay(option)).then(function(e){
      console.log(e)
      if(e.payload.success){
        dispatch(setData())
      }
    })
  }

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
              <div>  Branch : <span style={{ color: 'red' }}> {dashboardSlice.data.branch_name} </span> </div>
              <div>  Count : {dashboardSlice.data.count} </div>

              {/* <a href="/order" style={{ float: 'right' }}>Details </a> */}

            </div>
          }
          <div className="row">
            <div className="d-sm-flex align-items-center justify-content-between mb-8" style={{ width: '60%', backgroundColor: '#f6f6f' }}>
              <span
                className="h6 mb-0 text-gray-800"
                style={{ padding: 10 }}
              >
                <Label title="Store Details" size={18} />




              </span>
              {
                thisdata != "" &&
                <>
                  {/* <TfiAlignRight color="green" size={30} style={styles.selectOption} onClick={_sendToHideSection} /> */}
                  <Button onClick={_sendToHideSection} text="Hold" />
                  <div>{msg}</div>
                </>
              }

              {
                selectAll &&
                <div style={styles.sendBox}>
                  <Select 
                  width = "400"
                  placement
                  data={vans}
                  onchange = {_getTransportData}
                  />
                  <Button 
                  text="GO!"  
                  classname="btn btn-user btn-block btn-danger"
                  onclick = {_wayToBranch}
                  //  icon = {<AiFillCar  size={20} />}
                  />
                  {/* <TfiAlignJustify color="orange" size={30} style={styles.selectOption} onClick={_wayToBranch} /> */}

                </div>
              }


            </div>


          </div>
          <div >
            <div className="card shadow mb-4">
              <div className="card-header py-3" >
                <div style={{ width: '60%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <h6 className="m-0 font-weight-bold text-primary" style={styles.selectOption} >
                    {selectAll ? <span onClick={_deSelectAllOrder}> Deselect All </span> : <span onClick={_selectAllOrder}>Select All</span>}
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
                        <th>Sac Code</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        dataset.map((data, index) =>
                          <tr key={index} onClick={() => getThisData(data, index)}
                            style={{
                              cursor: "pointer",
                              backgroundColor: selectAll ? '#68da72' : cindex == index && "#68da72",
                              color: selectAll ? '#fff' : cindex == index && "#fff",
                            }}>
                            <td>{index + 1}</td>
                            <td>{data.reference_id}</td>
                            <td>{data.invoice_id}</td>
                            <td>{data.area.name}</td>
                            <td>{data.sack_barcode}</td>
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
      </div>
    </main>

  )
}

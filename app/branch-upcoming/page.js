"use client"
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setbreadcrumb } from '../redux/slices/breadcrumbSlice'
import { receiveOrderUpcoming } from '../redux/slices/orderDetailsSlice'
import Input from '../components/input/Input';
import Label from '../components/label/Label';
import Button from '../components/button/Button';
import styles from './page.style';
import barLength from '../utils/barcode'

export default function Page() {
  const dispatch = useDispatch()
  const dataset = useSelector((state) => state.orderDetailsReducer.orderData)
  const [thisData, setThisData] = useState([])
  const [cindex, setCindex] = useState(-1)
  const [barcode, setBarcode] = useState("")
   console.log(dataset)

  useEffect(() => {
    dispatch(setbreadcrumb(["Dashboard", "Upcoming Order"]));
  },[dispatch])

  

  const __makeStatus = (__barcode,option) =>{
    if (__barcode.length == barLength)
      dispatch(receiveOrderUpcoming(option)).then(function (e) {
        
        setBarcode("")
        setCindex(-1)
      })
  }

  const _getBarCode = (e) => {
    let __barcode = e.target.value
    let tail = 4
    setBarcode(__barcode)
    let option = "barcode=" + __barcode + "&status=" + tail
    __makeStatus(__barcode,option)
  }

  const _getSingleBarCodeInput = (e) =>{
    let __barcode = e.target.value
    setBarcode(__barcode)
  }


  // const _getSingleBarCode = (e) => {   
  //   let tail = 4   
  //   const option = "reference_id=" + thisData.reference_id + "&barcode=" + barcode + "&status=" + tail
  //   __makeStatus(barcode,option)

  // }
  return (
    <div>
      <div className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Upcoming Orders</h1>
        <p className="mb-4"></p>

        <div className="card shadow mb-4">
          <div className="card-header py-3" style={{
            display : 'flex',
            flexDirection : 'row',
            justifyContent : 'space-around',
            width : '50%'
          }}>
            {/* <h6 className="m-0 font-weight-bold text-primary"> */}
         
              <Input
                placeholder='scan barcode here'
                value={barcode}
                // width='60%'
                onChange={_getBarCode}
              /> 
              <Button text="Submit" />
            

            {/* </h6> */}
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                  <tr>
                    <th>SL.</th>
                    <th>Reference ID</th>
                    <th>Barcode</th>
                    <th>Area</th>
                    <th>Status</th>


                  </tr>
                </thead>

                <tbody>
                  {
                    dataset.map((data, index) =>
                      <tr key={index} 
                      // onClick={() => _getThisRow(data, index)}
                        style={{
                          cursor: "pointer",
                          backgroundColor: cindex == index && "#68da72",
                          color: cindex == index && "#fff",
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>{data.reference_id}</td>
                        <td>{data.barcode}</td>
                        <td>{data.area_name}</td>
                        <td>Waiting to receive</td>

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

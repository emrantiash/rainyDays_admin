"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setbreadcrumb } from '../redux/slices/breadcrumbSlice';
import { fetchOrder, receiveOrder } from '../redux/slices/orderSlice';
import Label from '../components/label/Label';
import styles from './page.style';
import Button from '../components/button/Button';
import Input from '../components/input/Input';


export default function Page() {
  const dispatch = useDispatch()
  const dashboard = useSelector((state) => state.dashboardReducer)
  const condition = dashboard.condition
  const data = dashboard.data
  const [barcode, setBarcode] = useState("")
  const [thisdata, setThisdata] = useState("")
  const [cindex, setCindex] = useState(-1)
  const status = condition == "new-order" ? 0 : 1
  const datatable = useSelector((state) => state.orderReducer.data)
  const [msg, setMsg] = useState("")
  const [backColor, setBackColor] = useState("#E74A3B")

  console.log(datatable && datatable)

  useEffect(() => {
    const getZoneOrders = async () => {
      dispatch(setbreadcrumb(["Dashboard", "Order Details"]))
    };

    getZoneOrders()

  }, [dispatch, condition]);

  const getThisData = (data, index) => {
    setMsg("")
    console.log(data)
    setThisdata(data)
    setCindex(index)

  }

  // console.log(thisdata)

  const _getBarsode = (e) => {
    setThisMsg("")
    setBarcode(e.target.value)
  }

  const _getAutoBarsode = (e) => {
    setThisMsg("")
    let barcode = e.target.value
    let payload = "barcode=" + barcode + "&status=" + 2
    if (barcode.length == 15) {
      dispatch(receiveOrder(payload)).then(function (e) {
        console.log(e)
        if (e.payload == undefined) {
          setThisMsg(" No Barcode Found")

        }
        else {
          setThisMsg("Successfully Stored Order ", '#008400')

        }
      })
    }

  }

  const setThisMsg = (msg, color) => {
    setMsg(msg)
    color != undefined && setBackColor(color)
  }

  const _submit = () => {
    setThisMsg("")
    const tail = status == 0 ? 1 : status == 1 ? 2 : 0
    const option = "reference_id=" + thisdata.reference_id + "&barcode=" + barcode + "&status=" + tail
    let payload = status == 0 ? option : thisdata.bulk_order_id != null ? option : "barcode=" + barcode + "&status=" + tail
    console.log(payload)
    if (barcode != "") {
      dispatch(receiveOrder(payload)).then(function (e) {
        console.log(e)
        if (e.payload == undefined) {
          setThisMsg("Duplicate  Barcode or No Barcode Found")

        }
        else {
          setThisMsg("Operation Done ", '#008400')
          setCindex(-1)
          setThisdata("")
        }

      })
    }
    else {
      setThisMsg("Scan Barcode")
    }

  }



  return (
    <div>

      <div className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">{data.name}</h1>
        <div className="card shadow mb-4">
          <div className="card-header py-3" >
            <h6 className="m-0 font-weight-bold text-primary" style={styles.myfont}>
              <Label title={condition} size={20} />
            </h6>
          </div>
          <div style={{ ...styles.errorMsg, backgroundColor: backColor }}>{msg}</div>
          {

            status == 1 && thisdata == "" &&
            <div style={styles.box}>
              <div >
                BarCode:
              </div>
              <Input
                width={'40%'}
                placeholder=""
                name="barcode"
                onChange={(e) => _getAutoBarsode(e)}
              />


            </div>
          }
          {
            thisdata != "" &&
            <div style={styles.container}>
              <div className="card-header py-3" >
                <h6 className="m-0 font-weight-bold text-primary" style={styles.myfont}>
                  Reference ID :  <Label className="badge bg-success text-wrap" title={thisdata.reference_id} />
                  <br />
                  Customer :  <Label className="badge bg-success text-wrap" title={thisdata.customer_name} />
                  Mobile :  <Label className="badge bg-success text-wrap" title={thisdata.customer_mobile} />
                  <br />
                  Area : <Label className="badge bg-success text-wrap" title={thisdata.area_id} />
                  Address :  <Label className="badge bg-success text-wrap" title={thisdata.customer_address} />
                  <br />
                  Product price  : <Label className="badge bg-success text-wrap" title={thisdata.product_price} />
                  Delivery Charge : <Label className="badge bg-success text-wrap" title={thisdata.delivery_charge} />
                </h6>
              </div>
              <div style={styles.containerInside}>
              <div> BarCode :</div>  
                <Input
                  placeholder=""
                  name="barcode"
                  onChange={(e) => _getBarsode(e)}
                  width = {300}
                />

                <Button classname="status==0 ? btn btn-user btn-block btn-info : btn btn-user btn-block btn-danger" text={status == 0 ? "Picked UP" : "Go Store"} onclick={_submit} />

              </div>
            </div>

          }

          <div className="card-body">
            <div className="table-responsive">
              {
                Array.isArray(datatable) &&
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0" >
                  <thead>
                    <tr>
                      <th>SL.</th>
                      <th>Ref.ID</th>
                      <th>Barcode</th>
                      <th>Marchant Name</th>
                      <th>Mobile</th>
                      <th>Address</th>
                      <th>Area</th>
                      <th>Pickup-Officer</th>

                    </tr>
                  </thead>

                  <tbody>
                    {

                      datatable.map((data, index) =>
                        <tr key={index} onClick={() => getThisData(data, index)}
                          style={{
                            cursor: "pointer",
                            backgroundColor: cindex == index && "#68da72",
                            color: cindex == index && "#fff",
                          }}

                        >
                          <td>{index + 1}</td>
                          <td>{data.reference_id}</td>
                          <td>{data.barcode != null ? data.barcode : "---"}</td>
                          <td>{data.merchant.name}</td>
                          <td>{data.merchant.mobile}</td>
                          <td>{data.customer_address}</td>
                          <td>{data.orders_pickup_area_id?.name}</td>
                          <td>{data.pickup_officer_id}</td>
                        </tr>
                      )
                    }




                  </tbody>
                </table>
              }

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

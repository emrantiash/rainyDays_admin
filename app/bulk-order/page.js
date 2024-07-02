"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setbreadcrumb } from '../redux/slices/breadcrumbSlice';
import { fetchOrder, receiveBulkOrder } from '../redux/slices/orderSlice';
import Input from '../components/input/Input';
import Label from '../components/label/Label';
import styles from '../order/page.style';
import Button from '../components/button/Button';

export default function Page() {
    const dispatch = useDispatch()
    const dashboard = useSelector((state) => state.dashboardReducer)
    const condition = dashboard.condition
    const [barcode, setBarcode] = useState("")
    const data = dashboard.data
    const [thisdata, setThisdata] = useState("")
    const [cindex, setCindex] = useState(-1)
    const status = condition == "new-bulk-order" ? 0 : 1



    const datatable = useSelector((state) => state.orderReducer.bulkdata)


    useEffect(() => {
        dispatch(setbreadcrumb(["Dashboard", "New Bulk Order Details"]))

    }, [dispatch]);

    const getThisData = (data, index) => {
        setThisdata(data)
        setCindex(index)

    }

    const _getBarsode = (e) => {
        setBarcode(e.target.value)
    }

    const _submit = () => {
      console.log(thisdata)
        const tail = status == 0 ? 1 : status == 1 ? 2 : 0
        const option = "bulk_order_unique_id=" + thisdata.bulk_order_unique_id + "&barcode=" + barcode + "&status=" + tail
        console.log(option)
        dispatch(receiveBulkOrder(option)).then(function (e) {
            setCindex(-1)
            setThisdata("")
        })

    }

    const _upload = () =>{
        console.warn("upload herer")
    }


    return (
        <div>
            <div className="container-fluid">
                <h1 className="h3 mb-2 text-gray-800">{data.name}</h1>
                <div className="card shadow mb-4">
                    <div className="card-header py-3" >
                        <h6 className="m-0 font-weight-bold text-primary" style={styles.myfont}>
                            <Label title={condition} />
                        </h6>
                    </div>{
                        thisdata != "" &&
                        <div className="card-header py-3" style={styles.container}>
                            <h6 className="m-0 font-weight-bold text-primary" style={styles.myfont}>
                                Reference ID :  <Label title={thisdata.bulk_order_unique_id} />

                            </h6>
                            {
                                status == 0 ?
                                    <>
                                        <div style={styles.container}>
                                            BarCode:
                                            <Input
                                                placeholder=""
                                                name="barcode"
                                                onChange={(e) => _getBarsode(e)}
                                            />

                                        </div>
                                        <Button classname="btn btn-user btn-block btn-info" text="Picked Up" onclick={_submit} />
                                    </> :

                                    <Button classname="btn btn-user btn-block btn-danger" text="Upload CSV" onclick={_upload} />

                            }

                        </div>
                    }

                    <div className="card-body">
                        <div className="table-responsive">
                            {
                                Array.isArray(datatable) && datatable.length > 0 &&
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0" >
                                    <thead>
                                        <tr>
                                            <th>SL.</th>
                                            <th>Reference-id</th>
                                            <th>Merchant</th>
                                            <th>Phone</th>
                                            <th>Quantity</th>
                                            <th>Area</th>
                                            {/* <th>Address</th> */}

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
                                                    <td>{data.bulk_order_unique_id}</td>
                                                    <td>{data.merchant?.name}</td>
                                                    <td>{data.merchant?.mobile}</td>
                                                    <td>{data.quantity}</td>
                                                    <td>{data.bulk_orders_pickup_area_id?.name}</td>
                                                    {/* <td>{data.merchant.shop_address}</td> */}
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

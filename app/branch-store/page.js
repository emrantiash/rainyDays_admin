"use client"
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setbreadcrumb } from '../redux/slices/breadcrumbSlice'
import { assignToDeliveryMan, orderDetailsBranchStore } from '../redux/slices/orderDetailsSlice'
import Select from '../components/select/Select';
import styles from './page.style'
import { FiChevronsRight } from "react-icons/fi"


export default function Page() {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.loginReducer);
    const delivery = useSelector((state) => state.deliveryReducer.data)
    const dataset = useSelector((state) => state.orderDetailsReducer.storeOrderData)
    const _thisdata = useSelector((state) => state.orderDetailsReducer.thisdata)
    //    const [dataset, setDataset] = useState(data)
    const [rowData, setRowData] = useState([])
    const [thisData, setThisData] = useState([])
    const [cindex, setCindex] = useState([])
    const [flag, setFlag] = useState(true)
    const [deliveryManName, setDeliveryManName] = useState("")
    const [deliveryManId, setDeliveryManId] = useState("")
    // const [orderArray, setOrderArray] = useState([])
    const [success, setSuccess] = useState(false)

    const branchid = data.data.data.branch_id

    console.log(dataset)



    useEffect(() => {
        dispatch(setbreadcrumb(["Dashboard", "Store Order"]));

    }, [dispatch])

    const makeDicision = (array) => {
        let flag = false
        Array.isArray(thisData) && thisData.map((data, index) => {
            if (data.reference_id == array.reference_id) {
                flag = true
            }
        })

        return flag
    }

    const makeIndexDicision = (index) => {
        let flag = true
        cindex.map((data, i) => {
            if (data === index) {
                // setRowData(rowData.pop())
                flag = false

            }
        }

        )
        return flag

    }




    const _getThisRow = (data, index) => {
        setSuccess(false)
        setFlag(!flag)
        const found = makeDicision(data)
        const _index = makeIndexDicision(index)
        if (!_index) {
            setCindex(cindex.filter((item) => item !== index))
            data = ""
        }
        if (!found && _index) {
            //    const __vat = cindex.length > 0 &&  
            setRowData(prevArray => [...prevArray, data])
            setCindex(prevArray => [...prevArray, index]);

        }
        else {

        }

    }

    const _shiftRow = () => {
        setThisData(rowData)
    }

    const checkIndex = (index) => {
        let _val = false
        cindex.map((data, i) => {
            if (data == index)
                _val = true

        }
        )

        return _val
    }



    const _getDeliveryMan = (e) => {
        let _value = e.target.value
        let _name = _value.split(",")[0]
        let _id = _value.split(",")[1]
        setDeliveryManId(_id)
        setDeliveryManName(_name)
    }



    const _AssignOrders = () => {
        console.log(deliveryManId)
        let order_id = []
        rowData.map((data, index) => {
            order_id.push(data.id)
        })

        console.log(order_id)
        let options = {
            delivery_officer_id: deliveryManId,
            order_id: order_id,
            status: 5
        }

        if (deliveryManId != "") {
            dispatch(assignToDeliveryMan(options)).then(function (e) {
                if (e.payload && e.payload.success) {
                    setSuccess(true)
                    setCindex([])
                    setThisData([])
                }
            })

        }



    }

    const nextCall = () => {
        setRowData([])

        const optionNext = "branch_id=" + branchid + "&status=" + 4
        dispatch(orderDetailsBranchStore(optionNext)).then(function(){
            setSuccess(false)
        })

    }





    return (
        <div>
            <div className="container-fluid">
                <h1 className="h3 mb-2 text-gray-800">Store Orders</h1>
                <p className="mb-4"></p>

                <div className="card shadow mb-4">
                    <div className="card-header py-3" style={{}}>
                        <h6 className="m-0 font-weight-bold text-primary">

                            <div style={styles.deliveryBox}>
                                <Select
                                    placement
                                    data={delivery}
                                    onchange={_getDeliveryMan}
                                />
                            </div>

                        </h6>
                    </div>
                    <div className="card-body">
                        <div className='row'>

                            <div className='col-sm-4'>

                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th>SL.</th>
                                                <th>Reference ID</th>
                                                <th>Area</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                Array.isArray(dataset) && dataset.map((data, index) =>
                                                    <tr key={index} onClick={() => _getThisRow(data, index)}
                                                        style={{
                                                            cursor: "pointer",
                                                            backgroundColor: checkIndex(index) && "#68da72",
                                                            // color: cindex == index && "#fff",
                                                        }}
                                                    >
                                                        <td style={styles.compromise}>
                                                            <span> {index + 1}</span>
                                                            {/* <Input type="checkbox"
                                                                placeholder=''
                                                                onChange={_checkBoxInput}

                                                            /> */}
                                                        </td>
                                                        <td>{data.reference_id}</td>
                                                        <td>{data.area_name}</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='col-sm-1'>
                                <div style={styles.container}>
                                    <FiChevronsRight size={50} onClick={_shiftRow} style={styles.pointer} />
                                </div>
                            </div>
                            <div className='col-sm-2'>
                                {
                                    Array.isArray(thisData) && thisData.length > 0 &&
                                    <div style={{ margin: 10 }}>
                                        <table className="table" style={styles.box}>
                                            <tbody>

                                                {
                                                    !success &&
                                                    thisData.map((data, index) =>
                                                        <tr key={index}>
                                                            <td >{index + 1}</td>
                                                            <td >{data.reference_id}</td>
                                                            <td >{data.area_name}</td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                }


                            </div>
                            <div className='col-sm-1'></div>
                            <div className='col-sm-1'>
                                {/* {
                                    thisData.length > 0 && */}
                                <div style={styles.container}>
                                    <FiChevronsRight size={50} onClick={_AssignOrders} style={styles.pointer} />
                                </div>
                                {/* } */}

                            </div>
                            <div className='col-sm-3'>
                                <div style={styles.deliveryMan}>{deliveryManName}</div>
                                {
                                    Array.isArray(rowData) && rowData.length > 0 &&
                                    <div style={{ margin: 10 }}>

                                        <table className="table" style={styles.box}>
                                            <thead>

                                                <tr><th></th></tr>

                                            </thead>
                                            <tbody>
                                                {
                                                    success &&
                                                    rowData.map((data, index) =>
                                                        <tr key={index}>
                                                            <td >{index + 1}</td>
                                                            <td >{data.reference_id}</td>
                                                            <td >{data.area_name}</td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                }
                                {
                                    success &&
                                    <>
                                    <div onClick={nextCall} style={styles.successMsg}>Operation Done  </div>
                                    <div onClick={nextCall} style={styles.nextFont}>NEXT </div>
                                    </>
                                }



                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

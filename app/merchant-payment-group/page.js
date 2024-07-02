"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setbreadcrumb } from '../redux/slices/breadcrumbSlice';
import { getThisMerchant } from '../redux/slices/paymentSlice';
import Label from '../components/label/Label';
import Loading from '../components/loading/Loading';

export default function Page() {
    const dispatch = useDispatch()
    const [isLoading,setIsLoading] = useState(true)
    const datatable = useSelector((state) => state.paymentReducer.data)
    const [cindex, setCindex] = useState(-1)
    const [dindex, setDindex] = useState(-1)
    const [thisdata,setThisdata] = useState({})
    const [thisMerchantdata,setThisMerchantdata] = useState({})
    const [dataset,setDataset] = useState([])
    useEffect(() => {
        dispatch(setbreadcrumb(["Payment", "Merchant Group"]))

    }, [dispatch]);

    useEffect(()=>{
            datatable.length > 0 && setIsLoading(false)
    },[dispatch,datatable.length])

    const getThisData = (data, index) => {
        setIsLoading(true)
        setThisdata(data)
        setCindex(index)
       let  option = "merchant_id="+data.merchant_id
       dispatch(getThisMerchant(option)).then(function(e){
        if(e.payload.success)
        setDataset(e.payload.data)
        setIsLoading(false)
       })  
      }

      const getThisMerchantData = (data, index) => {
        setThisMerchantdata(data)
        setDindex(index) 
      }

    return (
        <div>
            <div className="container-fluid">

                {/* <!-- Page Heading --> */}
                <h1 className="h3 mb-2 text-gray-800">
                    <Label title="Due Payment" />
                </h1>
                <p className="mb-4"></p>

                {/* <!-- DataTales Example --> */}
                <div className='row'>
                    <div className='col-sm-6'>
                        <div className="card shadow mb-4">
                            <div className="card-header py-3" >
                                <h6 className="m-0 font-weight-bold text-primary">Merchant List</h6>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th>SL.</th>
                                                <th>Merchant</th>
                                                <th>Shop</th>
                                                <th>Payable Amount</th>
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
                                                    }}>
                                                        <td>{index + 1}</td>
                                                        <td>{data.merchant_name}</td>
                                                        <td>{data.payable_amount}</td>
                                                        <td>{data.payable_amount}</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div className='col-sm-6'>
                        {
                            isLoading && 
                            <Loading />
                        }
                        {
                            dataset.length > 0 && 
                        
                        <div className="card shadow mb-4">
                            <div className="card-header py-3" >
                                <h6 className="m-0 font-weight-bold text-primary">{thisdata.merchant_name}</h6>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable2" width="100%" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th>SL.</th>
                                                <th>Reference</th>
                                                <th>Amount</th>
                                                <th>Payment </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dataset.map((data, index) =>
                                                    <tr key={index} onClick={() => getThisMerchantData(data, index)}
                                                    style={{
                                                        // cursor: "pointer",
                                                        backgroundColor: dindex == index && "red",
                                                        color: dindex == index && "#fff",
                                                      }}
                                                    >
                                                        <td>{index + 1}</td>
                                                        <td>{data.reference_id}</td>
                                                        <td>{data.payable_amount}</td>
                                                        <td><div style={{cursor: "pointer"}}>Payment</div></td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div> 
                        }  
                    </div>

                </div>
            </div>
        </div>
    )
}

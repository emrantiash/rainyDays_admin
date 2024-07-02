"use client";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SiCheckmarx } from 'react-icons/si';
import { setbreadcrumb } from '../redux/slices/breadcrumbSlice';
import { getMarchant, approveMarchant } from '../redux/slices/marchantSlice';
import Loading from '../components/loading/Loading';



export default function Page() {
  const dispatch = useDispatch()

  const [data, setData] = useState([{}])
  const isLoading = useSelector((state)=>state.marchantReducer.isLoading)
  console.log(data.length)

  // useEffect(()=>{
  //   if(data.length <= 1  ){
  //     router.replace("/")
  //   }
  // },[])

  useEffect(() => {
    function fetchBusinesses(){
      dispatch(setbreadcrumb(["Dashboard", "Marchant Approve"]))
      dispatch(getMarchant(0)).then(function (e) {
        setData(e.payload.data)
      })
    }

    fetchBusinesses()
    
  }, [dispatch])

  

  const approveThisMarchant = (thisdata) => {
    console.log(thisdata)

    const check = confirm("Are you sure ?")
    if(check){
      const option =
      {
        merchant_id: thisdata.id,
        status: 1
  
  
      }
      dispatch(approveMarchant(option)).then(function (e) {
        if (e.payload.success) {
          const arr = data.filter((item) => item.id !== thisdata.id);
          setData(arr);
        }
      })
    }

   
   
  }

  console.log(data)


  return (
    <div><div className="container-fluid">

      <h1 className="h3 mb-2 text-gray-800">Tables</h1>
      <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below.
        For more information about DataTables, please visit the <a target="_blank"
          href="https://datatables.net">official DataTables documentation</a>.</p>
      <div className="card shadow mb-4">
        <div className="card-header py-3" >
          <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>
        </div>
        {
              isLoading &&
              <Loading />
            }
        <div className="card-body">
          <div className="table-responsive">
           


            {



              Array.isArray(data) && data.length > 0 ?
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">

                <thead>
                  <tr>
                    <th>SL.</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Category</th>
                    <th>Shop</th>
                    <th>Area</th>
                    <th>Address</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {


                    data.map((data, index) =>
                      <tr key={index} >
                        <td>{index + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.mobile}</td>
                        <td>{data.category}</td>
                        <td>{data.shop}</td>
                        <td>{data.area}</td>
                        <td>{data.shop_address}</td>
                        <td>{data.apply_date}</td>
                        <td
                          style={{ cursor: 'pointer' }}
                        >

                          <div
                            onClick={() => approveThisMarchant(data)}

                          ><SiCheckmarx />
                          </div>
                        </td>
                      </tr>
                    )
                  }




                </tbody>
              </table> :
            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
              </table>

            }

          </div>
        </div>
      </div>

    </div>
    </div>
  )
}

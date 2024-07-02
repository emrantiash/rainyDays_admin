"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { getDashboardInfo ,branchDashboard,branchDashboardScanData} from "./redux/slices/dashboardSlice";
import { fetchOrder, fetchBulkOrder } from "./redux/slices/orderSlice";
import { setData } from "./redux/slices/orderSlice";
import { setbreadcrumb } from "./redux/slices/breadcrumbSlice";
import { orderDetails, orderDetailsBranchStore, orderDetailsDataGeneral, assign2DeleveryData, receivedByDeleveruManData } from "./redux/slices/orderDetailsSlice";
import { getDeliveryEmployee } from "./redux/slices/deliverySlice";
import cookieCutter from "cookie-cutter";
import cookiesNames from "./utils/constant/Constant";
import { dashboardData } from "./redux/slices/dashboardSlice";
import { useRouter } from "next/navigation";
import Label from "./components/label/Label";
import Dashnav from "./components/navbar/Dashnav";
import Input from "./components/input/Input";
import Button from "./components/button/Button";


const __noneConstant = {
  textDecoration: 'none'
}
const order_hierarchy_running = [
  {
    id: 1,
    name: "Dhaka North",
    amount: 80,
  },
  {
    id: 2,
    name: "Dhaka South",
    amount: 10,
  },
  {
    id: 1,
    name: "Dhaka Periphery",
    amount: 0,
  },
  {
    id: 1,
    name: "Outside Dhaka",
    amount: 0,
  },
];

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const data = useSelector((state) => state.loginReducer);
  const [dashData, setDashData] = useState([]);
  const dashboardSlice = useSelector((state) => state.dashboardReducer)
  const [flag, setFlag] = useState("")
  const [assignToDeliveryMan, setAssignToDeliveryMan] = useState([])
  const [receivedByDeleveryMan, setReceivedByDeleveryMan] = useState([])
  const [branchData,setBranchData] = useState([]) //useSelector((state) => state.orderDetailsReducer.orderData)
  const br_store_data = useSelector((state) => state.orderDetailsReducer.storeOrderData)
  const [msg,setMsg] = useState("")
  const [priority,setPriority] = useState("")
  // const [branchid,setBranchid]  = useState("")


  // const priority = data.data.data.priority    // 1: admin:  2 : branch
  const branchid =data.data.data  && data.data.data.branch_id

  const option = "branch_id=" + branchid + "&status=" + 3
  const optionNext = "branch_id=" + branchid + "&status=" + 4
  const optionAssign = "branch_id=" + branchid + "&status=" + 5
  const optionDeliveryReceive = "branch_id=" + branchid + "&status=" + 6


  useEffect(()=>{
    if (data.data.success && Object.keys(data.data.data).length != 0) {
      setPriority(data.data.data.priority)
      // setBranchid(data.data.data.branch_id)
    }
  })

   console.log(dashData)

  useEffect(() => {
    const fetchUsers = async () => {
      setTheBranchData()
     
    }

    priority == 2 && fetchUsers()
  }, [priority])

  const setTheBranchData = () =>{
    dispatch(branchDashboard()).then(function(e){
      if(e.payload && e.payload.success)
      setBranchData(e.payload.data)

    })
  }

  useEffect(() => {
    const option = "branch_id=" + branchid
    const fetchDeliveryEmployee = async () => {
      dispatch(getDeliveryEmployee(option))

    }
    priority == 2 && fetchDeliveryEmployee()


  }, [dispatch,branchid,priority])


  useEffect(() => {
    const fetchStoreData = async () => {
      dispatch(orderDetailsBranchStore(optionNext)).then(function (e) {

      })
      dispatch(orderDetailsDataGeneral(optionAssign)).then(function (e) {
        setAssignToDeliveryMan(e.payload.data)
        dispatch(assign2DeleveryData(e.payload.data))

      })
      dispatch(orderDetailsDataGeneral(optionDeliveryReceive)).then(function (e) {
        setReceivedByDeleveryMan(e.payload.data)
        dispatch(receivedByDeleveruManData(e.payload.data))
      })


    }
    priority == 2 && fetchStoreData()
  }, [dispatch,priority,optionAssign,optionNext,optionDeliveryReceive])

  useEffect(() => {
    dispatch(setbreadcrumb(["Dashboard", ""]));

    dispatch(dashboardData(["", ""]));

    const fetDashInfo = async () => {
      dispatch(getDashboardInfo()).then(function (e) {
        if (e.payload && e.payload.success) {
          setDashData(e.payload.data);
        }
      });

    }

    priority == 1 && fetDashInfo()


  }, [dispatch,priority]);

  // console.log(dashData)

  


  useEffect(() => {
    if (setIsLogin(cookieCutter.get(cookiesNames.LOG_IN)) || data.login) {
      setIsLogin(true);
    }
  }, [isLogin,data.login]);


  const getOrderDetails = (strid, data) => {
    setFlag(1) //  route :: order
    dispatch(dashboardData([strid, data]));
    const status = strid == "new-order" ? 0 : 1
    const tail = "zone_id=" + data.id + "&status=" + status
    dispatch(fetchOrder(tail)).then(function (e) {
      dispatch(setData(e.payload))
    })
  };

  // const getOrderDetailsBulk = (strid, data) => {
  //   setFlag(2) // 2 :: route :: bulk-order
  //   dispatch(dashboardData([strid, data]));
  //   const status = strid == "new-bulk-order" ? 0 : 1
  //   const tail = "zone_id=" + data.id + "&status=" + status
  //   dispatch(fetchBulkOrder(tail))
  // };

  const _getBArcodeInput = (e)=>{
    console.log("enter our ")
    const _value = e.target.value 
    console.log(_value,branchData)
    // if(_value.length == 15 && _value==branchData.branch_sack_barcode){
      if(_value==branchData.branch_sack_barcode){
      console.log(e.target.value)
      let option = "branch_sack_barcode="+_value+"&status=4"
      dispatch(branchDashboardScanData(option)).then(function(e){
        console.log(e.payload.data)
        {
          if(e.payload.success){
            setTheBranchData()
            setMsg("Sac received successfully")
          }
          else
          {
            setMsg(e.payload.error)
          }
        }
      })

    }
  }


  return (
    <main>
      <div className="container-fluid">
        {
          priority == 2 &&
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
        }
        {
          priority == 1 ?
            <div>
              <Dashnav />

              {
                priority == 1 &&

                <div>


                  {/* Page Heading */}
                  <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">
                      <Label title="Status" />
                    </h1>
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
                        <div>  Zone : {dashboardSlice.data.name} </div>
                        <div>  Count : {dashboardSlice.data.count} </div>

                        <a href={flag == 1 ? "/order" : "/bulk-order"} style={{ float: 'right' }}>Details </a>

                      </div>
                    }
                    <a
                      href="#"
                      className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                    >
                      <i className="fas fa-download fa-sm text-white-50"></i>{" "}
                      Generate Report
                    </a>
                  </div>

                  {/* Content Row */}
                  <div className="row">
                    {/* Earnings (Monthly) Card Example */}
                    <div className="col-xl-3 col-md-6 mb-4">
                      <Link href="/order">
                        <div className="card border-left-primary shadow h-100 py-2">
                          <div className="card-body">
                            <div className="row no-gutters align-items-center">
                              <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                  {/* Earnings (Monthly) */}
                                  New Order
                                </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                  {/* $40,000 */}
                                  {dashData.total_0_status_orders}
                                </div>
                              </div>
                              <div className="col-auto">
                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>

                    {/* Earnings (Monthly) Card Example */}
                    <div className="col-xl-3 col-md-6 mb-4">
                      <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                {/* Earnings (Annual) */}
                                Running
                              </div>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {/* $215,000 */}
                                {dashData.status_1_to_8}
                              </div>
                            </div>
                            <div className="col-auto">
                              <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Earnings (Monthly) Card Example */}
                    <div className="col-xl-3 col-md-6 mb-4">
                      <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                {/* Tasks */}
                                Total User
                              </div>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {/* $215,000 */}
                                {dashData.status_1_merchants}
                              </div>

                            </div>
                            <div className="col-auto">
                              <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pending Requests Card Example */}
                    <div className="col-xl-3 col-md-6 mb-4">
                      <a
                        className="collapse-item"
                        href={
                          dashData.status_0_merchants > 0 ? "/approve-marchant" : "/"
                        }
                      >
                        <div className="card border-left-warning shadow h-100 py-2">
                          <div className="card-body" style={{ cursor: 'pointer' }}>
                            <div className="row no-gutters align-items-center">
                              <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                  Pending Requests
                                </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                  {dashData.status_0_merchants}
                                </div>
                              </div>
                              <div className="col-auto">
                                <i className="fas fa-comments fa-2x text-gray-300"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="row">
                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                      <span
                        className="h6 mb-0 text-gray-800"
                        style={{ padding: 10 }}
                      >
                        <Label title="New Order" />
                      </span>
                    </div>
                  </div>
                  {/* 2nd row  */}
                  {/* new order */}
                  <div className="row">
                    {
                      Array.isArray(dashData.new_orders_zone_wise) &&
                      dashData.new_orders_zone_wise.length > 0 &&
                      dashData.new_orders_zone_wise.map((data, index) => (
                        <div className="col-xl-3 col-md-6 mb-4" key={index} style={{ cursor: "pointer" }}>
                          <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body" style={{ cursor: 'pointer' }}>
                              <div className="row no-gutters align-items-center">
                                <div className="col mr-2" onClick={() =>
                                  getOrderDetails("new-order", data)
                                }>

                                  <div className="text-xs font-weight-bold text text-uppercase mb-1">
                                    {data.name}
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

                    <div className="col-xl-3 col-md-6 mb-4">
                      <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body" style={{ cursor: 'pointer' }}>
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text text-uppercase mb-1">
                                Dhaka Peripheri
                              </div>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {/* {data.amount} */}0
                              </div>
                            </div>
                            <div className="col-auto">
                              <i className="fas fa-comments fa-2x text-gray-300"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-6 mb-4">
                      <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body" style={{ cursor: 'pointer' }}>
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text text-uppercase mb-1">
                                Otside Dhaka
                              </div>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {/* {data.amount} */}0
                              </div>
                            </div>
                            <div className="col-auto">
                              <i className="fas fa-comments fa-2x text-gray-300"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
              

              <div className="row">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <span className="h6 mb-0 text-gray-800" style={{ padding: 10 }}>
                    <Label title="Running" />
                  </span>
                </div>
              </div>
              <div className="row">
                {
                  Array.isArray(dashData.running_orders_zone_wise) &&
                  dashData.running_orders_zone_wise.length > 0 &&
                  dashData.running_orders_zone_wise.map((data, index) => (
                    <div className="col-xl-3 col-md-6 mb-4" key={index}>
                      <div className="ard border-left-success shadow h-100 py-2">
                        <div className="card-body" style={{ cursor: 'pointer' }}>
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-2" onClick={() => getOrderDetails("running", data)}>

                              <div className="text-xs font-weight-bold text text-uppercase mb-1">
                                {data.name}
                              </div>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
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
             


            </div> :
            <div>
              <div className="row">
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">

                        <div className="col mr-2">
                          <a href="/branch-store" style={__noneConstant}>
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                              Store
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              {branchData.van_branch_sack_to_store}
                            </div>
                          </a>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2" >
                          <a href="/assign-to-delivery" style={__noneConstant}>
                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">

                              Assign  to delivery Man
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                              {assignToDeliveryMan.length}
                            </div>
                          </a>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-danger shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <a href="/waiting-delivery" style={__noneConstant}>
                          <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                            Waiting for delivery
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {receivedByDeleveryMan.length}
                          </div>
                        </a>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-info shadow h-500 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <a href="/branch-upcoming" className="decNone" style={__noneConstant}
                        >
                          <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                            Upcoming
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">

                            {branchData.van_branch_sack_order_count}
                          </div>
                        </a>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-truck fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>

              

              

            </div>
        }


    </div>
    </main >
  );
}


import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

export default function Dashnav() {
  // const [navC,setNavClass] = useState()
  const dashboard = useSelector((state)=>state.dashboardReducer.dashboard)

  console.log("dashnav===",dashboard)
  const _getTheNumber = (_value) =>{
    const _array = _value
    var count = 0
    // if(Array.isArray(_array))
    console.log("comess",_array)
    if(Array.isArray(_array) && _array.length > 0)
    {
      _array.map((data)=>
      count = count +  parseInt(data.count) 
      )
    }
   
    else{
      
      return 0
    }
    return count 
  }
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link className="nav-link" aria-current="page" href="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/dash-store">Store({_getTheNumber(dashboard.status_2_branch_wise)})</Link>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Hold</a>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/way-to-branch">On Way({_getTheNumber(dashboard.status_3_branch_wise)})</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/branch">Branch({_getTheNumber(dashboard.status_4_branch_wise)})</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/delivery-assign">Delivery-Assign({_getTheNumber(dashboard.status_5_branch_wise)})</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/delivery-waiting">Waiting4Delivery ({_getTheNumber(dashboard.status_6_branch_wise)})</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/delivered">Delivered({_getTheNumber(dashboard.status_7_branch_wise)})</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/delivery-assign">Close Order</Link>
      </li>
      {/*  <li className="nav-item">
              <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li> */}
    </ul>
  )
}

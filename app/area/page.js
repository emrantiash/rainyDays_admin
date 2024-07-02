"use client";
import React,{useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { setbreadcrumb } from '../redux/slices/breadcrumbSlice';
const data = [
    {
      id: 1,
      name: "Hasan Mahmud",
      placement: "Branch",
      work_area : "Dhanmondi",
      Phone: "01765889098",
      startdate: "2011/04/25",
      salary: '20,800'
    },
    {
      id: 2,
      name: "Taijul Islam",
      placement: "Branch",
      work_area : "Mirpur",
      phone: "01912390987",
      startdate: "2011/04/25",
      salary: '20,800'
    },
    {
      id: 3,
      name: "Moshiur Alam",
      placement: "Pickup",
      work_area : "Dhanmondi",
      Phone: "01765889098",
      startdate: "2011/04/25",
      salary: '20,800'
    },
    {
      id: 4,
      name: "Ripon Miya",
      placement: "Pickup",
      work_area : "Mirpur",
      phone: "01912390987",
      startdate: "2011/04/25",
      salary: '20,800'
    },
    {
      id: 5,
      name: "Ripon Miya",
      placement: "Pickup",
      work_area : "Mirpur",
      phone: "01912390987",
      startdate: "2011/04/25",
      salary: '20,800'
    },
    {
      id: 6,
      name: "Ripon Miya",
      placement: "Pickup",
      work_area : "Mirpur",
      phone: "01912390987",
      startdate: "2011/04/25",
      salary: '20,800'
    },
    {
      id: 7,
      name: "Ripon Miya",
      placement: "Pickup",
      work_area : "Mirpur",
      phone: "01912390987",
      startdate: "2011/04/25",
      salary: '20,800'
    },
   
  ]

export default function Page() {
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setbreadcrumb(["Address","Area "]))
  },[dispatch]);

  return (
    <div>
         <div className="container-fluid" >
            
         </div>
    </div>
  )
}

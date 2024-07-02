import React from 'react';
import Table from '../components/table/Table';
const thead = [
    {
        thname : "Sl"
    },
    {
        thname : "Name"
    },
    {
        thname : "Status"
    }
]
const data = [
    {
        id : 1 ,
        name : "Dhaka North",
        status : "active"
    },
    {
        id : 2 ,
        name : "Dhaka South",
        status : "active"
    },
    {
        id : 3 ,
        name : "Dhaka Periphery",
        status : "active"
    },
    {
        id : 4 ,
        name : "Outside",
        status : "active"
    }
]

export default function Page() {
  return (
    <div className="container-fluid" >
            <Table 
            thead = {thead}
            tbody = {data}
            />
    </div>
  )
}

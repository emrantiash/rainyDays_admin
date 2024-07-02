'use client';
import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
const data = [
    {
        id : 1,
        name : "Dhanmondi",
        amount : 20
    },
    {
        id : 2,
        name : "Bonani",
        amount : 10
    },
    {
        id : 3,
        name : "Mirpur",
        amount : 20
    }
]

export default function ZoneOrder({ params, searchParams }) {
    searchParams = useSearchParams();

    const name = searchParams.get('name');
    const amount = searchParams.get('amount');
    const id = searchParams.get('id')


    return (
        <main >
            <div className="container-fluid">
                {/* Page Heading */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                    <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                        className="fas fa-download fa-sm text-white-50"></i> Print Report</a>
                </div>

                {/* Content Row */}
                <div className="row">

                    {/* Earnings (Monthly) Card Example */}
                    <div className="col-xl-3 col-md-6 mb-4">
                    
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                               { name }
                                            </div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                               {amount}
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                       
                    </div>
                </div>

                <div className="row">

{
  data.map((data, index) =>
    <div className="col-xl-3 col-md-6 mb-4" key={index}>
      <div className="card border-left-primary shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <Link href={{
                pathname: '/order/area-order',
                query: {
                  name: (data.name),
                  amount : (data.amount),
                  id : (data.id)
                } 
              }}>
                <div className="text-xs font-weight-bold text text-uppercase mb-1">
                  {data.name}
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {data.amount}
                </div>
              </Link>
            </div>
            <div className="col-auto">
              <i className="fas fa-comments fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
</div>
            </div>
        </main>
    )
}
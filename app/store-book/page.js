"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setbreadcrumb } from "../redux/slices/breadcrumbSlice";
import { useRouter } from 'next/navigation';

const data = [
  {
    id: 1,
    name: "Hasan Mahmud",
    placement: "Branch",
    work_area: "Dhanmondi",
    Phone: "01765889098",
    startdate: "2011/04/25",
    salary: "20,800",
  },
  {
    id: 2,
    name: "Taijul Islam",
    placement: "Branch",
    work_area: "Mirpur",
    phone: "01912390987",
    startdate: "2011/04/25",
    salary: "20,800",
  },
  {
    id: 3,
    name: "Moshiur Alam",
    placement: "Pickup",
    work_area: "Dhanmondi",
    Phone: "01765889098",
    startdate: "2011/04/25",
    salary: "20,800",
  },
  {
    id: 4,
    name: "Ripon Miya",
    placement: "Pickup",
    work_area: "Mirpur",
    phone: "01912390987",
    startdate: "2011/04/25",
    salary: "20,800",
  },
  {
    id: 5,
    name: "Hasan Mahmud",
    placement: "Branch",
    work_area: "Dhanmondi",
    Phone: "01765889098",
    startdate: "2011/04/25",
    salary: "20,800",
  },
  {
    id: 6,
    name: "Taijul Islam",
    placement: "Branch",
    work_area: "Mirpur",
    phone: "01912390987",
    startdate: "2011/04/25",
    salary: "20,800",
  },
  {
    id: 7,
    name: "Moshiur Alam",
    placement: "Pickup",
    work_area: "Dhanmondi",
    Phone: "01765889098",
    startdate: "2011/04/25",
    salary: "20,800",
  },
  {
    id: 8,
    name: "Ripon Miya",
    placement: "Pickup",
    work_area: "Mirpur",
    phone: "01912390987",
    startdate: "2011/04/25",
    salary: "20,800",
  },
  {
    id: 9,
    name: "Taijul Islam",
    placement: "Branch",
    work_area: "Mirpur",
    phone: "01912390987",
    startdate: "2011/04/25",
    salary: "20,800",
  },
  {
    id: 10,
    name: "Moshiur Alam",
    placement: "Pickup",
    work_area: "Dhanmondi",
    Phone: "01765889098",
    startdate: "2011/04/25",
    salary: "20,800",
  },
  {
    id: 11,
    name: "Ripon Miya",
    placement: "Pickup",
    work_area: "Mirpur",
    phone: "01912390987",
    startdate: "2011/04/25",
    salary: "20,800",
  },
];

export default function Page() {
    const router = useRouter()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setbreadcrumb(["Dashboard", ""]));
    // window.location.reload(false);
  }, [dispatch]);



  return (
    <div >
      <div className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Running Order</h1>

        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Sum : {data.length}
            </h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              {Array.isArray(data) && data.length > 0 && (
                <table
                  className="table table-bordered"
                  id="dataTable"
                  width="100%"
                  cellSpacing="0"
                >
                  <thead>
                    <tr>
                      <th>SL.</th>
                      <th>Name</th>
                      <th>Placement</th>
                      <th>Work Area</th>

                      <th>Start date</th>
                      <th>Salary</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((data, index) => (
                      <tr key={index}>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>{data.placement}</td>
                        <td>{data.work_area}</td>
                        <td>{data.startdate}</td>
                        <td>{data.salary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

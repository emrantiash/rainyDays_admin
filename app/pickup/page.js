"use client";
import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { setbreadcrumb } from "../redux/slices/breadcrumbSlice";
import {
  getPickUpEmployee,
  setThisPickUpEmployee,
  getPickUpArea
} from "../redux/slices/pickupSlice";

import styles from "./page.style";
import Loading from "../components/loading/Loading";
import { useRouter } from "next/navigation";


export default function Page({ _data }) {
  const router = useRouter();
  const dispatch = useDispatch();
  // const [data, setData] = useState([{}]);
  const data = useSelector((state) => state.pickupReducer.data);
  const pickupman = useSelector((state) => state.pickupReducer.pickupman);
  const pickdata = useSelector((state) => state.pickupReducer.data);
  const [thisData, setThisData] = useState([]);

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setisLoading] = useState(true);

  console.log(pickdata)

  const setThisStatus = (flag, msg) => {
    setisLoading(flag);
    setErrorMsg(msg);
  };

  useEffect(() => {
    dispatch(setbreadcrumb(["Pick Up", "Employee List"]));
  }, [dispatch]);

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(getPickUpEmployee()).then(function (e) {
        dispatch(setThisPickUpEmployee(""))
        if (e.payload && e.payload.success) {
          setThisStatus(false, "");
          // setData(e.payload.data);
        } else {
          if (e.payload && e.payload.message != "undefined")
            setThisStatus(false, e.payload.message);
          else setThisStatus(false, "Network Error .Try Later");
        }
      });
    };

    fetchUsers();
  }, [dispatch]);

  const getThisData = (data) => {
     dispatch(setThisPickUpEmployee(data));
    setThisData(data);
    dispatch(getPickUpArea(data.id))
  };

  const assignArea = () => {
    // cookieCutter.set(cookiesNames.PICKUP_USER, JSON.stringify(thisData))
    // dispatch(setThisPickUpEmployee(thisData))
    // router.push('/pickup/posting')
  };

  return (
    <div className="container-fluid">
      <div>{errorMsg}</div>
      {/* <h1 className="h3 mb-2 text-gray-800">Tables</h1> */}

      <div className="card shadow mb-4">
        <div className="card-header py-3" style={styles.action}>
          <h6 className="m-0 font-weight-bold text-primary">
          Selected ::  {pickupman.length == 0 ? "All Pick up Employee" : pickupman.name}{" "}
          </h6>
          <h6
            className="m-0 font-weight-bold text-primary"
            style={styles.action}
          >
            {Object.keys(pickupman).length != 0 && (
              <>
                <div style={styles.common} onClick={() => giveMeDetails(data)}>
                  {/* <SiCachet /> */}
                  Details
                </div>
                ||
                <a onClick={() => assignArea()} href="/posting">
                  Assign Area
                </a>
              </>
            )}
          </h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            {isLoading && <Loading />}
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
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Nid</th>
                    <th>Start date</th>
                    <th>Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((data, index) => (
                    <tr
                      key={index}
                      onClick={() => getThisData(data, index)}
                      style={{
                        cursor: "pointer",
                        backgroundColor: pickupman.id == index + 1 && "#68da72",
                        color: pickupman.id == index + 1 && "#fff",
                      }}
                    >
                      <td>{index + 1}</td>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.mobile}</td>
                      <td>{data.nid}</td>
                      <td>22/03/09</td>
                      <td>20000</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

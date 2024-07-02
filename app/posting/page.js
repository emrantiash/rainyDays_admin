"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { fetchArea } from '@/app/redux/slices/areaSlice';
import { fetchZone } from '@/app/redux/slices/zoneSlice';
import { fetchBranch } from '@/app/redux/slices/branchSlice';
import cookieCutter from 'cookie-cutter';
import cookiesNames from '@/app/utils/constant/Constant';
import { setbreadcrumb } from '@/app/redux/slices/breadcrumbSlice';
import { assignArea, getPickUpArea, appendArea, appendAreaObject } from '@/app/redux/slices/pickupSlice';
import Loading from '@/app/components/loading/Loading';
import Select from '@/app/components/select/Select';
import Label from '@/app/components/label/Label';
import Button from '@/app/components/button/Button';
import { PiButterflyBold } from 'react-icons/pi';
import { FcCancel } from 'react-icons/fc';
import styles from './page.style';



export default function Page() {
  const searchParams = useSearchParams()
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false)
  const pickupdata = useSelector((state) => state.pickupReducer);
  const zones = useSelector((state) => state.zoneReducer.data);
  const business_area = useSelector((state) => state.areaReducer.data);
  const [inputName, setInputName] = useState([])
  const [inputValue, setInputValue] = useState([])
  const [addDone, setAddDone] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [msg, setMsg] = useState("")


  const myassign_areas = pickupdata.area

  const pickupman = pickupdata.pickupman

  console.log(pickupman)

  const id = searchParams.get("id")

  useEffect(() => {
    dispatch(setbreadcrumb(["Pick Up", "Assign Area :" + " "+pickupman.name]))
  }, [dispatch,pickupman.name]);

  useEffect(() => {
    
    const fetchPickAreas = async () => {
      // dispatch(getPickUpArea(pickupman.id))
      dispatch(fetchZone())
      // dispatch(fetchBranch())
      dispatch(fetchArea())

    }
    fetchPickAreas();

  }, [dispatch]);



  const handleInputChange = (e) => {
    const { value } = e.target
    const findValue = value.split(',')

    let object = {
      id: parseInt(findValue[1]),
      name: findValue[0]
    }

    dispatch(appendArea(object))


    setInputValue([
      ...inputValue,
      findValue[1]
    ])

    setInputName([
      ...inputName,
      { name: findValue[0] }
    ])

  };

  const manageAddOperation = () => {
    setAddDone(!addDone)
  }

  const MakeItAgain = () => {
    setInputName([])
    setInputValue([])
    setAddDone(false)
    setSuccess(false)
    setIsError(false)
    setMsg('')
  }

  const SubmitAreas = () => {

    const options = {
      pickup_officer_id: pickupman.id,
      area_id: inputValue
    }


    dispatch(assignArea(options)).then(function (e) {
      console.log(e)
      if (e.payload && e.payload.success) {
        setSuccess(e.payload.success)
        setMsg(e.payload.message)

      }
      else if (e.payload && !e.payload.success) {
        setSuccess(e.payload.success)
        setMsg(e.payload.message)
        setIsError(true)
      }
      else {
        setSuccess(false)
        setMsg("Something Went Wrong.Try Later")
        setIsError(true)
      }
    })
  }

  return (
    <div className="container-fluid">
          {/* {
        pickupdata.isLoading &&
        <Loading />
      } */}

      <div className='row'>
        <div className='col-md-6'>
          <div className="card shadow mb-4">
            
          <div className="card-body">
            <div className="table-responsive">
              {
                Array.isArray(myassign_areas) && myassign_areas.length  >0  &&               
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                  <tr>
                    <th>SL.</th>
                    <th>Name</th>
                    <th>Branch</th>
                    <th>Zone</th>
                  </tr>
                </thead>
              
                <tbody>
                  {
                    myassign_areas.map((data, index) =>
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{data.name}</td>
                        <td>{data.branch}</td>
                        <td>{data.zone}</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
              }
            </div>
          </div>
        </div>
        </div>
        <div className='col-md-3' style={{ backgroundColor: '' }}>
          <div style={styles.box}>
            <Label title="Select Zone" />
            <Select
              width={'100%'}
              data={zones}

            // onchange={(e) => handleInputChange(e)}
            />

          </div>
          <div style={styles.box}>
            <Label title="Select branch" />
            <Select
              placement={true}
              width={'100%'}
              data={business_area}
            // onchange={(e) => handleInputChange(e)}

            />
          </div>
          <div style={styles.box}>
            <Label title="Select Area" />
            <Select
              width={'100%'}
              data={business_area}
              placement
              onchange={(e) => handleInputChange(e)}
              disabled={addDone ? true : false}
            />
          </div>
          {
            !addDone && inputValue.length > 0 &&
            <div style={styles.button}>
              <Button
                classname="btn btn-user btn-block btn-danger"
                text="Continue !" onclick={manageAddOperation} />
            </div>
          }
        </div>
        <div className='col-md-3' >
          <div>
            {success ? <div style={{ cursor: 'pointer' }} onClick={() => MakeItAgain()}> 
            Continue
            </div> : isError && 
            "Error"
            }
            <div style={success ? styles.successMsg : styles.errorMsg}>
              {msg}
            </div>
          </div>
          {
            !success &&
            Array.isArray(inputName) && inputName.length > 0 && 
            <div className="card shadow mb-4">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                    <thead style={{ backgroundColor: '#4e73df', color: '#ffff' }}>
                      <tr>
                        <th>SL.</th>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        inputName.map((data, index) =>
                          <tr key={index} >
                            <td>{index + 1}</td>
                            <td>{data.name}</td>

                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
              {
                addDone &&
                <>
                  <div style={styles.button}>
                    <Button
                      classname="btn btn-user btn-block btn-light"
                      text="Add Area"
                      onclick={SubmitAreas}
                    />
                  </div>
                  <div style={styles.button}>
                    <Button
                      classname="btn btn-link"
                      text="cancel"
                      onclick={manageAddOperation}
                    />
                  </div>
                </>
              }
            </div>
            
          }
        </div>
        </div>
    </div>
  )
}

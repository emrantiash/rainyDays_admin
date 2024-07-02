"use client";
import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setbreadcrumb } from '../redux/slices/breadcrumbSlice';
import { getAllMarchant, createOrder,getWaightRange } from '../redux/slices/marchantSlice';
import {  fetchArea } from '../redux/slices/areaSlice';
import styles from './page.style';
import Input from '../components/input/Input';
import Label from '../components/label/Label';
import Button from '../components/button/Button';
import Select from '../components/select/Select';
import { RiAddCircleLine } from "react-icons/ri";
import Textarea from '../components/textarea/Textarea';
import Loading from '../components/loading/Loading';


export default function Page() {
  const dispatch = useDispatch()
  const [isLoading,setIsLoading] = useState(false)
  const [msg, setMsg] = useState("")
   const [data, setData] = useState({})
  const [dataset,setDataset] = useState([])
  const areas = useSelector((state)=>state.areaReducer.data)
  const [customerArea,setCustomerArea] = useState("")
  const [merchantid,setMerchantid] = useState("")
  const [waightRange,setWaightRange] = useState([])
  const [price,setPrice] = useState(0)
  const [waightRangeId,setWaightRangeId] = useState(0)
  const [userField, setUserField] = useState({
    merchant : "",
    name : "",
    mobile : "",
    address : "",
    note : "",
    price : 0
});

 
  useEffect(() => {
    dispatch(setbreadcrumb(["Marchant", "Create Parcel Order"]));
    dispatch(getAllMarchant()).then(function(e){
      console.log(e.payload)
      setDataset(e.payload && e.payload.data)
    })
    dispatch(fetchArea())
    dispatch(getWaightRange()).then(function(e){
      setWaightRange(e.payload.data)
    })

  }, [dispatch]);

  const changeUserFieldHandler = (e) =>{
    const { name, value } = e.target;
    setUserField({
        ...userField,
        [e.target.name]: e.target.value
    });

  }

  const _getMErchantId = (e) =>{
    const _id = e.target.value.split(",")
    setMerchantid(_id[1])
  }

  const _onAreaChange =(e) =>{
     console.log(e.target.value)
     const _area = e.target.value.split(",")
     setCustomerArea(_area[1])
  }

  const _onWaightRangeSelect =(e) =>{
    const data = e.target.value.split(",")
    setWaightRangeId(data[1])
    setPrice(data[2])
 }


  const _submitMyForm = () =>{
    setMsg("")
    setIsLoading(true)
    let option = {
      merchant_id : merchantid,
      customer_name : userField.name,
      customer_mobile : userField.mobile,
      customer_address : userField.address,
      area_id : parseInt(customerArea),
      weight_range_id : parseInt(waightRangeId),
      delivery_charge : parseInt(price),
      note : userField.note,
      product_price : parseFloat(userField.price)
    }

    console.log(option)
    if(option.product_price > 0.0 && option.merchant_id != "" && option.customer_mobile != "" && option.customer_address !=""
    && option.delivery_charge != "" && option.area_id != "" && option.customer_mobile.length != 11  
    ){
      dispatch(createOrder(option)).then(function(e){
        if(e.payload && e.payload.success){
          setIsLoading(false)
          setMsg("Order Created Successfully."+ "  Reference-id # "+ e.payload.order.reference_id)
          setData(e.payload.order)
        }
        if(e.payload && !e.payload.success){
          setIsLoading(false)
          setMsg(e.payload.message)
        }
      })
    }

    else{
      setIsLoading(false)
      setMsg("Please Update Fields")
    }

   
  }


  return (
    <div>
      <main className="wow fadeInUp" data-wow-delay="2.12s">
        <div className="container-fluid" >
          <div className='row'>
           
            <div className='col-md-4'>
            <div style={styles.colBox}>
            <Label title="Merchant Phone" required />
            <Select
            placement
            name="merchant"
            data = {dataset}
            mobile = {true}
            onchange = {_getMErchantId}
            />
            </div>
            <div style={styles.colBox}>
            <Label title="Customer name" required  />
            <Input  placeholder='name' name="name"
            onChange={(e) => changeUserFieldHandler(e)}
            />
            </div>
            <div style={styles.colBox}>
            <Label title="Customer Mobile" required />
            <Input  placeholder='01xxxxxxxx' name ="mobile"
            onChange={(e) => changeUserFieldHandler(e)}
            />
            </div>
            <div style={styles.colBox}>
            <Label title="Customer Area" required />
            <Select 
            placement
            data={areas}
            onchange = {_onAreaChange}
            />
            </div>
            <div style={styles.colBox}>
            <Label title="Merchant Address" required />
            <Textarea  placeholder='address' name ="address"
             onChange={(e) => changeUserFieldHandler(e)}
            />
            </div>
            <div style={styles.colBox}>
            <Label title="Product Price" required />
            <Input  placeholder='Price' name="price" type="number"
            min = "0"
             onChange={(e) => changeUserFieldHandler(e)}
            />
            </div>
            <div style={styles.colBox}>
            <Label title="Waight Range" required />
            <Select 
            placement
            data={waightRange}
            onchange={_onWaightRangeSelect}
            />
            
            </div>
            <div style={styles.colBox}>
            <Label title="Delivery Charge" required />
            <Input  placeholder='70.0' name="chanrge"
            value={price}
            
             onChange={(e) => changeUserFieldHandler(e)}
            />
            </div>
            <div style={styles.colBox}>
            <Label title="Note" required />
            <Textarea  placeholder='note' name="note"
            
             onChange={(e) => changeUserFieldHandler(e)}
            />
            </div>

            <div style={styles.boxButton}>
           <Button text="Create Order"
           classname="btn btn-user  btn-danger"
           icon=<RiAddCircleLine size={30} />
             onclick={_submitMyForm}
           />
            </div>
           
          </div>

          <div className='col-sm-6' style={{
            display : 'flex',
            // backgroundColor : 'red',
            justifyContent : 'center',
            alignItems : 'center'
          }}>
            {
              isLoading &&
              <Loading />
            }
            {
              msg 
            }
            
          </div>
        
           
          </div>
          </div>
       
      </main>
    </div>
  )
}

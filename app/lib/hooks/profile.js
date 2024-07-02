import {useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import cookieCutter from 'cookie-cutter';
import cookiesNames from '@/app/utils/constant/Constant';

export default function useProfile() {
    const [isLogin,setIsLogin] = useState(false)
    const data = useSelector((state) => state.loginReducer.data.data)
    // useEffect(() => {
    //     if(cookieCutter.get(cookiesNames.LOG_IN) ||  data){
    //         setIsLogin(true)
    //     }
    //     else
    //     setIsLogin(false) 
    // },[data]);

    return data;
}

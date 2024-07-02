import {useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import cookieCutter from 'cookie-cutter';
import cookiesNames from '@/app/utils/constant/Constant';

export default function useToken() {
    const [token,setToken] = useState(false)
    const data = useSelector((state) => state.loginReducer.token)
    useEffect(() => {
        
        setToken(data) 
    },[data]);

    return token;
}

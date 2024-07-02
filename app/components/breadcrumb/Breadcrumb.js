"use client";
import React,{useState,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import styles from './Breadcrumb.style';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import useIsLogin from '@/app/lib/hooks/isLogin';

const Breadcrumb = props => {
    const router = useRouter()
    const {parent,child} = useSelector((state)=>state.breadcrumbReducer);
    const [isLogin, setIsLogin] = useState(false)

    const useLogin = useIsLogin()

    useEffect(() => {     
        setIsLogin(useLogin[0])
    },[useLogin]);
    
    return (
        isLogin &&
        <div>

            <nav aria-label="breadcrumb" style={styles.container}>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#" onClick={()=>
                        router.back()
                    }>{parent}</a></li>
                    <li className="breadcrumb-item active" aria-current="page" onClick={()=>
                        router.back()
                    }>{child}</li>
                </ol>
            </nav>
        </div>
    )
}

Breadcrumb.propTypes = {}

export default Breadcrumb
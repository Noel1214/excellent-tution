'use client'
import { setAdmin, setLoginState } from '@/lib/features/user/userSlice'
import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

const GlobalStateSetter = ({children}) => {

    const dispatch = useDispatch();
    const hasFetched = useRef(false);

    useEffect(() => {

        // prevent multiple api calls during render
        if(hasFetched.current) return;
        hasFetched.current = true;
        const setUserStatus = async () => {
            try {
                const res = await axios.get('/api/authentication');
                // console.log(res);
                dispatch(setAdmin(res.data.isAdmin || false));                
                dispatch(setLoginState(res.data.isLoggedIn || false));                
                
            } catch (error) {
                dispatch(setAdmin(false));
                dispatch(setLoginState(false));
                console.log("error in globalstatesetter");
                console.log(error);                
            }
        }
        setUserStatus();

    }, [dispatch])
    

    return children;
}

export default GlobalStateSetter
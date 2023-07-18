import React,{ useEffect } from "react"
import { useDispatch } from "react-redux"
import { getAllFoldersThunk } from "../../store/folders"


export default function LandingPage(){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllFoldersThunk())
    },[dispatch])

    return (
        <h1>Welcome to Wizlet!</h1>
    )
}
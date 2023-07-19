import React,{ useEffect } from "react"
import { useDispatch } from "react-redux"
import { getAllFoldersThunk } from "../../store/folders"
import { getAllSetsThunk } from "../../store/sets"


export default function LandingPage(){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllFoldersThunk())
        .then(dispatch(getAllSetsThunk()))
    },[dispatch])

    return (
        <h1>Welcome to Wizlet!</h1>
    )
}
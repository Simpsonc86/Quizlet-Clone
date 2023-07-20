import React,{ useEffect } from "react"
import { useDispatch } from "react-redux"
import { getAllFoldersThunk } from "../../store/folders"
import { getAllSetsThunk } from "../../store/sets"
import { getAllQuestionsThunk } from "../../store/questions"


export default function LandingPage(){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllFoldersThunk())
        .then(dispatch(getAllSetsThunk()))
        .then(dispatch(getAllQuestionsThunk()))
    },[dispatch])

    return (
        <h1>Welcome to Wizlet!</h1>
    )
}
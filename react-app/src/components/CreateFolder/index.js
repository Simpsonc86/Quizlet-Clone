import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllFoldersThunk } from "../../store/folders"


export default function CreateFolder() {
    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(getAllFoldersThunk());
    }, [dispatch]);

    return (
        <>
            <h1>Create a Folder</h1>
        </>
    )
}
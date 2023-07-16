import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllFoldersThunk } from "../../store/folders"


export default function CreateFolder() {
    const dispatch = useDispatch()
    const allFolders = useSelector((state) => {
        // console.log("state from the store---->",state.folders.folders)
        return state.folders.folders ? Object.values(state.folders.folders) : []
    })

    useEffect(() => {
        dispatch(getAllFoldersThunk());
    }, [dispatch]);

    return (
        <>
            <h1>Create a Folder</h1>
        </>
    )
}
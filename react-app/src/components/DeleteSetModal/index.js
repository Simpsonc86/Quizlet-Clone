import React from "react";
import { useDispatch } from "react-redux";
import{useModal} from "../../context/Modal"
// import { deleteFolderThunk } from "../../store/folders";
// import { useHistory } from "react-router-dom";
// import { getAllFoldersThunk } from "../../store/folders";
import { deleteSetThunk, getAllSetsThunk } from "../../store/sets";

export default function DeleteSetModal({setId,folderId}){
    const dispatch = useDispatch();
    // const history = useHistory();
    const {closeModal}= useModal();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        dispatch(deleteSetThunk(setId))
        .then(dispatch(getAllSetsThunk()))
        .then(closeModal())
        // history.push(`/folders/${folderId}`)
    };

    return(
        <div>
            <h1>Confirm Delete?</h1>
            <p>Are you sure you want to delete this set?</p>
            <form onSubmit={handleSubmit}>
                <button type="submit">Yes (Delete Set)</button>
                <button onClick={closeModal}>No (Keep Set)</button>
            </form>
        </div>
    )
}
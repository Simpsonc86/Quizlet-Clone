import React from "react";
import { useDispatch } from "react-redux";
import{useModal} from "../../context/Modal"
// import { deleteFolderThunk } from "../../store/folders";
// import { useHistory } from "react-router-dom";
// import { getAllFoldersThunk } from "../../store/folders";
import {getAllSetsThunk } from "../../store/sets";
import { deleteQuestionThunk } from "../../store/questions";

export default function DeleteQuestionModal({question}){
    const dispatch = useDispatch();
    // const history = useHistory();
    const {closeModal}= useModal();

    // console.log("question id from prop", question.id);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        await dispatch(deleteQuestionThunk(question.id))
        .then(dispatch(getAllSetsThunk()))
        .then(closeModal())
        // history.push(`/folders/${folderId}/sets/${set.id}`)
    };

    return(
        <div className="create-form-container">
            <h1>Confirm Delete?</h1>
            <p className="form-label">Are you sure you want to delete this question?</p>
            <form className="create-form" onSubmit={handleSubmit}>
            <div className="flex-div">
                <button className="log_out_button nav-button" type="submit">Yes (Delete Question)</button>
                &nbsp;
                <button className="log_out_button nav-button" onClick={closeModal}>No (Keep Question)</button>
           </div>
            </form>
        </div>
    )
}
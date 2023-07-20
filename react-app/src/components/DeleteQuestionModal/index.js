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
        dispatch(deleteQuestionThunk(question.id))
        .then(dispatch(getAllSetsThunk()))
        .then(closeModal())
        // history.push(`/folders/${folderId}/sets/${set.id}`)
    };

    return(
        <div>
            <h1>Confirm Delete?</h1>
            <p>Are you sure you want to delete this question?</p>
            <form onSubmit={handleSubmit}>
                <button type="submit">Yes (Delete Question)</button>
                <button onClick={closeModal}>No (Keep Question)</button>
            </form>
        </div>
    )
}
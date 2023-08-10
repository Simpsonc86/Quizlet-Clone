import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteFolderThunk } from "../../store/folders";
import { useHistory } from "react-router-dom";
import { getAllFoldersThunk } from "../../store/folders";

export default function DeleteFormModal({ folderId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(deleteFolderThunk(folderId))
        // .then(dispatch(getAllFoldersThunk()))
        .then(closeModal())
        .then(history.push("/library"))
    };

    return (
        <div className="create-form-container">
            <h1>Confirm Delete?</h1>
            <p>Are you sure you want to delete this folder?</p>
            <form className="create-form" onSubmit={handleSubmit}>
                <button className="log_out_button nav-button" type="submit">Yes (Delete Folder)</button>
                &nbsp;
                <button className="log_out_button nav-button" onClick={closeModal}>No (Keep Folder)</button>
            </form>
        </div>
    )
}
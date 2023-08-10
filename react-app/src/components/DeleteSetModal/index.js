import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
// import { deleteFolderThunk } from "../../store/folders";
import { useHistory } from "react-router-dom";
// import { getAllFoldersThunk } from "../../store/folders";
import { deleteSetThunk, getAllSetsThunk } from "../../store/sets";

export default function DeleteSetModal({ setId, folderId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    // const {folder_id, set_id} = useParams();
    const { closeModal } = useModal();

    // console.log('objects from props and params SET:', setId, " FOLDER: ", folderId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(deleteSetThunk(setId))
            .then(dispatch(getAllSetsThunk()))
            .then(closeModal())
            .then(history.push(`/folders/${folderId}`))
    };

    return (
        <div className="create-form-container">
            <h1>Confirm Delete?</h1>
            <p className="form-label">Are you sure you want to delete this set?</p>
            <form className="create-form" onSubmit={handleSubmit}>
                <button className="log_out_button nav-button" type="submit">Yes (Delete Set)</button>
                <br />
                <button className="log_out_button nav-button" onClick={closeModal}>No (Keep Set)</button>
            </form>
        </div>
    )
}
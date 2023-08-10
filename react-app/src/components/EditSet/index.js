import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { editSetThunk } from "../../store/sets";
import { useModal } from "../../context/Modal"; 

export default function EditSet({set,folderId}) {
    const dispatch = useDispatch();
    // const history = useHistory();
    const {closeModal} = useModal()
    const sessionUser = useSelector((state) => state.session.user)
    // console.log("folder from the filter's title is =====>", oneFolder.title);
    const [title, setTitle] = useState(set.title);
    const [description, setDescription] = useState(set.description);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errObj = {};

        if (!title.length|| title.length<3) errObj.title = "Title length of 3 or more is required"
        if (title.length>49) errObj.title = "Title length less than 50 characters is required"
        if (!description.length || description.length < 10) errObj.description = "Description length of 10 or more is required"
        if (description.length>1999) errObj.description = "Description length less than 2000 characters is required"

        if (!Object.values(errObj).length) {
            const editSet = {
                id:set.id,
                user_id:sessionUser.id,
                folder_id:set.folder_id,
                title,
                description,
            
            }

            // console.log("This is the created folder", folder)
            await dispatch(editSetThunk(editSet))
            .then(closeModal())
            // .then(dispatch(getAllSetsThunk()))          
            // history.push(`/folders/${folderId}/`)
            
        } else setErrors(errObj)

    };

    return (
        <>
                      <div className="create-form-container">

<form className="create-form" onSubmit={handleSubmit}>
    <h1>Edit the Set: {title}</h1>
   { (errors.title || errors.description) &&
    <ul>
        {errors.title && <p className="validation-errors">{errors.title}</p>}
        {errors.description && <p className="validation-errors">{errors.description}</p>}
    </ul>}
    <div className="form-inputs">

        <label className="form-label">
            Title
        </label>
        <textarea
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
        />
    </div>
    <br />
    <div className="form-inputs">

        <label className="form-label">
            Description
        </label>
        <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
        />
    </div>
    {/* &nbsp; */}
    <div className="flex-div">

    <button className="log_out_button nav-button" type="submit">Submit (Edit Set)</button>
    <button className="log_out_button nav-button" onClick={()=>closeModal()}>Back to Set</button>
    </div>
</form>
</div>
        </>
    )
}
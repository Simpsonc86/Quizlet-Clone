import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFolderThunk } from "../../store/folders";
import { useHistory } from "react-router-dom";
import "./CreateFolder.css"


export default function CreateFolder() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [is_public, setIsPublic] = useState("no");
    const [errors, setErrors] = useState([]);


    // useEffect(() => {
    //     dispatch(getAllFoldersThunk());
    // }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errObj = {};
        if (!title.length || title.length < 3) errObj.title = "Title length of 3 or more is required"
        if (title.length > 49) errObj.title = "Title length less than 50 characters is required"
        if (!description.length || description.length < 10) errObj.description = "Description length of 10 or more is required"
        if (description.length > 1999) errObj.description = "Description length less than 2000 characters is required"

        if (!Object.values(errObj).length) {
            const folder = {
                user_id: sessionUser.id,
                title,
                description,
                is_public
            }

            // console.log("This is the created folder", folder)
            await dispatch(createFolderThunk(folder));



            history.push("/library")
        } else setErrors(errObj)
    };

    return (
        <>
            <div className="create-form-container">
                <form className="create-form" onSubmit={handleSubmit}>
                    <h1>Create a Folder</h1>
                    {errors.title || errors.description &&
                        <ul >
                            {errors.title && <p className="validation-errors">{errors.title}</p>}

                            {errors.description && <p className="validation-errors"   >{errors.description}</p>}
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
                    <br />
                    <div className="form-inputs-public">

                        <label className="form-label">
                            Public Folder?
                        </label>
                        <input
                            type="checkbox"
                            id="isPublicCheckbox"
                            name="isPublicCheckbox"
                            // defaultChecked
                            onClick={(e) => {
                                const checkbox = document.querySelector('#isPublicCheckbox')
                                checkbox.checked ? setIsPublic("yes") : setIsPublic("no")
                                // console.log("Value of checkbox variable",checkbox.checked);
                            }}
                        />
                    </div>
                    {/* {console.log("value of isPublic----->",is_public)} */}
                    <br />
                    <div className="flex-div">
                        <button className="log_out_button submit nav-link" type="submit">Submit (Create Folder))</button>
                        <button className="log_out_button nav-button" onClick={() => history.push(`/library`)}>Return to library</button>

                    </div>

                </form>
            </div>
        </>
    )
}
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editFolderThunk } from "../../store/folders";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";



export default function EditFolder() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user)
    const { folder_id } = useParams()
    const folders = useSelector((state) => {
        // console.log("all folder from the store:=========>", state.folders.allFolders);
        return state.folders.allFolders ? Object.values(state.folders.allFolders) : {}
    })

    const oneFolder = Object.values(folders).find((folder) => folder.id === Number(folder_id))

    // console.log("folder from the filter's title is =====>", oneFolder.title);
    const [title, setTitle] = useState(oneFolder?.title);
    const [description, setDescription] = useState(oneFolder?.description);
    const [is_public, setIsPublic] = useState(oneFolder?.is_public);
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
                id: oneFolder.id,
                user_id: sessionUser.id,
                title,
                description,
                is_public
            }

            // console.log("This is the created folder", folder)
            await dispatch(editFolderThunk(folder));



            history.push(`/library`)
        } else setErrors(errObj)

    };

    return (
        <>
            <div className="create-form-container">
                <form className="create-form" onSubmit={handleSubmit}>
                    <h1>Edit the Folder: {title}</h1>
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
                    {/* &nbsp; */}
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
                    {/* &nbsp; */}
                    <div className="flex-div">

                        <button className="log_out_button submit nav-button" type="submit">Submit (Edit Folder)</button>
                        <button className="log_out_button nav-button" onClick={() => history.push(`/folders/${folder_id}`)}>Return to Folder</button>
                    </div>

                </form>
            </div>
        </>
    )
}
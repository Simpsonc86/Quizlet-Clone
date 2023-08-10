import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createSetThunk } from "../../store/sets";
import { useHistory } from "react-router-dom";
import "./CreateSet.css"
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function CreateSet() {
    // const {folder_id}= useParams()
    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);
    const folder = useSelector((state) => state.folders.folder);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errObj = {};
        if (!title.length || title.length < 3) errObj.title = "Title length of 3 or more is required"
        if (title.length > 49) errObj.title = "Title must have less than 50 characters"
        if (!description.length || description.length < 10) errObj.description = "Description length of 10 or more is required"
        if (description.length > 1999) errObj.description = "Description must have less than 2000 characters"

        if (!Object.values(errObj).length) {
            const set = {
                user_id: sessionUser.id,
                folder_id: folder.id,
                title,
                description,

            }

            // console.log("This is the created folder", folder)
            await dispatch(createSetThunk(set));



            history.push(`/folders/${folder.id}`)
        } else setErrors(errObj)
    };

    return (
        <>
            <div className="create-form-container">

                <form className="create-form" onSubmit={handleSubmit}>
                    <h1>Create a Set</h1>
                 {   errors.title||errors.description&&<ul>
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

                        <button className="log_out_button nav-link" type="submit">Submit (Create Set)</button>
                        <button className="log_out_button nav-button" onClick={() => history.push(`/folders/${folder.id}`)}>Return to Folder</button>
                    </div>

                </form>
            </div>
        </>
    )
}
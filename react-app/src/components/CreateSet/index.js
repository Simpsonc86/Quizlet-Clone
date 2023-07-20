import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createSetThunk } from "../../store/sets";
import { useHistory } from "react-router-dom";

export default function CreateSet() {

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
            <h1>Create a Set</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.title && <p>3 characters required in title</p>}
                    {errors.description && <p>10 characters required in description</p>}
                </ul>
                <label>
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
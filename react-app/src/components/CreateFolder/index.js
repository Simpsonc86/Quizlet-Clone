import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFolderThunk, getAllFoldersThunk } from "../../store/folders";
import { useHistory } from "react-router-dom";


export default function CreateFolder() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [is_public, setIsPublic] = useState(true);
    const [errors, setErrors] = useState([]);


    // useEffect(() => {
    //     dispatch(getAllFoldersThunk());
    // }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errObj = {};
        if (!title.length|| title.length<3) errObj.title = "Title length of 3 or more is required"
        if (!description.length || description.length < 10) errObj.description = "Description length of 10 or more is required"

        if (!Object.values(errObj).length) {
            const folder = {
                user_id: sessionUser.id,
                title,
                description,
                is_public
            }

            console.log("This is the created folder", folder)
            const data = await dispatch(createFolderThunk(folder));


            if (data) {
                setErrors(data);
            }
        }
        history.push("/dashboard")
    };

    return (
        <>
            <h1>Create a Folder</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {!!errors.length && errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
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
                <label>
                    Public Folder?
                    <input
                        type="checkbox"
                        id="isPublicCheckbox"  
                        name="isPublicCheckbox"      
                        defaultChecked
                        onClick={(e) => {
                            const checkbox = document.querySelector('#isPublicCheckbox') 
                            if (checkbox.checked)setIsPublic(true)
                            else setIsPublic(false)
                            console.log("Value of checkbox variable",checkbox.checked);
                        }}
                    />
                </label>
                {/* {console.log("value of isPublic----->",isPublic)} */}
                
                <button type="submit">Submit</button>

            </form>
        </>
    )
}
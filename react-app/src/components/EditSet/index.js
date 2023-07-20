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
        if (!title.length || title.length < 3) errObj.title = "Title length of 3 or more is required"
        if (!description.length || description.length < 10) errObj.description = "Description length of 10 or more is required"

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
            // .then(dispatch(getAllSetsThunk()))          
            // history.push(`/folders/${folderId}/`)
            
        } else setErrors(errObj)
        closeModal()

    };

    return (
        <>
            <h1>Edit your Set</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.title&&<p>3 characters required in title</p>}
                    {errors.description&&<p>10 characters required in description</p>}
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
                <button type="submit" >Submit</button>

            </form>
        </>
    )
}
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editFolderThunk } from "../../store/folders";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";



export default function EditFolder() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user)
    const {folder_id} = useParams()
    const folders = useSelector((state) => {
        // console.log("all folder from the store:=========>", state.folders.allFolders);
        return state.folders.allFolders ? Object.values(state.folders.allFolders) : {}
    })

    const oneFolder = Object.values(folders).find((folder)=>folder.id===Number(folder_id))

    console.log("folder from the filter's title is =====>", oneFolder.title);
    const [title, setTitle] = useState(oneFolder.title);
    const [description, setDescription] = useState(oneFolder.description);
    const [is_public, setIsPublic] = useState(oneFolder.is_public);
    const [errors, setErrors] = useState([]);


    // useEffect(() => {
    //     dispatch(getAllFoldersThunk());
    // }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errObj = {};
        if (!title.length || title.length < 3) errObj.title = "Title length of 3 or more is required"
        if (!description.length || description.length < 10) errObj.description = "Description length of 10 or more is required"

        if (!Object.values(errObj).length) {
            const folder = {
                id:oneFolder.id,
                user_id:sessionUser.id,
                title,
                description,
                is_public
            }

            // console.log("This is the created folder", folder)
            await dispatch(editFolderThunk(folder));


           
            history.push(`/folders`)
        } else setErrors(errObj)

    };

    return (
        <>
            <h1>Edit your Folder</h1>
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
                <label>
                    Public Folder?
                    {(is_public==="yes")?(<input
                        type="checkbox"
                        id="isPublicCheckbox"
                        name="isPublicCheckbox"
                        defaultChecked                 
                        onClick={(e) => {
                            const checkbox = document.querySelector('#isPublicCheckbox')
                            checkbox.checked?setIsPublic("yes"):setIsPublic("no")
                            // console.log("Value of checkbox variable", checkbox.checked);
                        }}
                    />)
                     :(<input
                        type="checkbox"
                        id="isPublicCheckbox"
                        name="isPublicCheckbox"                                       
                        onClick={(e) => {
                            const checkbox = document.querySelector('#isPublicCheckbox')
                            checkbox.checked?setIsPublic("yes"):setIsPublic("no")
                            // console.log("Value of checkbox variable", checkbox.checked);
                        }}
                    />)}
                </label>
                {/* {console.log("value of isPublic----->",is_public)} */}

                <button type="submit">Submit</button>

            </form>
        </>
    )
}
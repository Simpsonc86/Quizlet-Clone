import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllFoldersThunk } from "../../store/folders"
import { NavLink, useHistory } from "react-router-dom"
import OpenModalButton from "../OpenModalButton"
import DeleteFormModal from "../DeleteFormModal"

export default function RecentFolders() {
    const sessionUser = useSelector((state)=>state.session.user)
    const allFolders = useSelector((state) => state.folders.allFolders ? Object.values(state.folders.allFolders) : [])
    const dispatch = useDispatch()
    const history = useHistory()

    const publicFolders = allFolders.filter((folder) => folder.is_public === "yes").slice(-3)

    useEffect(() => {
        dispatch(getAllFoldersThunk())
    }, [dispatch])

    if (!Object.values(publicFolders)) {
        return null
    }
    return (
        <>
            <h1>This is the Most Recent Folders</h1>

            <h2>Most recent Folders</h2>
            {publicFolders && publicFolders?.reverse().map((folder, idx) => (
                <NavLink key={idx} to={`/folders/${folder.id}`}>
                    <h2>{folder.title}</h2>
                    <p>{folder.description}</p>
                    <p>Number of sets in folder:{folder.sets.length}</p>
                    {sessionUser?.id===folder?.user_id&&<div>
                        <button onClick={() => history.push(`/edit-folder/${folder.id}`)}>Edit Folder</button>
                        <OpenModalButton id='delete-btn' buttonText='Delete' modalComponent={<DeleteFormModal folderId={folder.id} />} />
                    </div>}
                </NavLink>
            ))}
        </>
    )
}
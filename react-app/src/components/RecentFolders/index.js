import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllFoldersThunk } from "../../store/folders"
import { NavLink, useHistory } from "react-router-dom"
import OpenModalButton from "../OpenModalButton"
import DeleteFormModal from "../DeleteFormModal"

export default function RecentFolders() {
    const sessionUser = useSelector((state) => state.session.user)
    const allFolders = useSelector((state) => state.folders.allFolders ? Object.values(state.folders.allFolders) : [])
    const dispatch = useDispatch()
    const history = useHistory()

    const publicFolders = allFolders.filter((folder) => folder.is_public === "yes")
    const recent = publicFolders.slice(-3)

    useEffect(() => {
        dispatch(getAllFoldersThunk())
    }, [dispatch])

    if (!Object.values(allFolders)) {
        return <h1>Folders are loading...</h1>
    }
    return (
        <>
            <h1>This is the Most Recent Folders</h1>

            <h2>Most recent Folders</h2>
            {recent.reverse().map((folder, idx) => (
                <div key={idx} >
                    <NavLink to={`/folders/${folder.id}`}>
                        <h2>{folder.title}</h2>
                        <p>{folder.description}</p>
                        <p>Number of sets in folder:{folder.sets.length}</p>
                    </NavLink>
                    {(sessionUser?.id === folder?.user_id) && <div>
                        <button onClick={() => history.push(`/edit-folder/${folder.id}`)}>Edit Folder</button>
                        <OpenModalButton id='delete-btn' buttonText='Delete' modalComponent={<DeleteFormModal folderId={folder.id} />} />
                    </div>}
                </div>
            ))}
        </>
    )
}
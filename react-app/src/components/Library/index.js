import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { NavLink, useHistory } from "react-router-dom"
import { getAllFoldersThunk, getOneFolderThunk } from "../../store/folders"
import DeleteFormModal from "../DeleteFormModal"
import OpenModalButton from "../OpenModalButton"
import { getAllSetsThunk } from "../../store/sets"
import "./Library.css"



export default function Library() {

    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user ? state.session.user : [])
    const allFolders = useSelector((state) => {
        // console.log("state from the store---->",state.folders.folders)
        return state.folders.allFolders ? Object.values(state.folders.allFolders) : []
    })
    const allSets = useSelector((state) => state.sets.allSets)
    // sessionUser && console.log("Current user: ",sessionUser);

    useEffect(() => {
        dispatch(getAllFoldersThunk())
            .then(dispatch(getAllSetsThunk()))
    }, [dispatch, allFolders.length, allSets.length]);

    const userFolders = allFolders.filter(folder => folder.user_id === sessionUser.id)
    // userFolders && console.log("Current users folders: ",userFolders);

    if (!Object.values(allSets).length || !Object.values(allFolders).length) {
        return <h1> {sessionUser.first_name}'s' Library details are loading...</h1>
    }

    return (
        <>
            <div className="library-container-div">
                <div className="library-inner-div">

                    <div className="library-header">

                        <h1>Library</h1>
                        <NavLink className="nav-button"to="/new-folder">Create a new folder</NavLink>
                    </div>
                        <h2>{sessionUser.username}'s Folders</h2>
                    <div className="folder-user-details-div">
                        {userFolders.map((folder, index) => (
                            <div className="folder-card-container" key={index}>
                                <div className="folder-card-div">
                                    <NavLink className="nav-link"to={`/folders/${folder.id}`}>
                                        <h3>{folder?.title}</h3>
                                        <h4 >{folder?.description}</h4>
                                        <h4>Total Sets: {folder?.sets.length}</h4>
                                    </NavLink>
                                    
                                    <br/>
                                    <button className="log_out_button nav-buttons"onClick={() => history.push(`/edit-folder/${folder.id}`)}>Edit Folder</button>
                                    <br/>
                                    <button className="log_out_button nav-buttons"onClick={() => dispatch(getOneFolderThunk(folder.id)).then(history.push(`/new-set`))}>Create a Set</button>
                                    <br/>
                                    <button className="log_out_button nav-buttons">
                                    <br/>
                                    <OpenModalButton className="nav-link" id='delete-btn' buttonText='Delete Folder' modalComponent={<DeleteFormModal folderId={folder.id} />} />

                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </>
    )
}
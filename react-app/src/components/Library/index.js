import { useSelector,useDispatch } from "react-redux"
import { useEffect } from "react"
import { NavLink, useHistory } from "react-router-dom"
import { getAllFoldersThunk,getOneFolderThunk} from "../../store/folders"
import DeleteFormModal from "../DeleteFormModal"
import OpenModalButton from "../OpenModalButton"
import { getAllSetsThunk } from "../../store/sets"



export default function Library() {

    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user ? state.session.user : [])
    const allFolders = useSelector((state) => {
        // console.log("state from the store---->",state.folders.folders)
        return state.folders.allFolders ? Object.values(state.folders.allFolders) : []
    })
    const allSets = useSelector((state)=>state.sets.allSets)
    // sessionUser && console.log("Current user: ",sessionUser);
    
    useEffect(() => {
        dispatch(getAllFoldersThunk())
        .then(dispatch(getAllSetsThunk()))
    }, [dispatch, allFolders.length, allSets.length]);
  
    const userFolders = allFolders.filter(folder => folder.user_id === sessionUser.id)
    // userFolders && console.log("Current users folders: ",userFolders);

    return (
        <>
            <h1>Library</h1>
            <NavLink to="/new-folder">Create a new folder</NavLink>
            <div>
                <h2>{sessionUser.username}'s Folders</h2>
                {userFolders.map((folder, index) => (
                    <div key={index}>
                        <div>
                            <NavLink to={`/folders/${folder.id}`}><h3>{folder.title}</h3></NavLink>
                            <button onClick={()=>history.push(`/edit-folder/${folder.id}`)}>Edit Folder</button>
                            <OpenModalButton id='delete-btn' buttonText='Delete Folder' modalComponent={<DeleteFormModal folderId={folder.id}/>}/>
                            <button onClick={()=>dispatch(getOneFolderThunk(folder.id)).then(history.push(`/new-set`))}>Create a Set</button>
                        </div>
                    </div>
                ))}
            </div>


        </>
    )
}
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getOneFolderThunk } from "../../store/folders"
import { useEffect } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import DeleteFormModal from "../DeleteFormModal"
import EditSet from "../EditSet"
import { getAllSetsThunk } from "../../store/sets"
import DeleteSetModal from "../DeleteSetModal"
import "./FolderPage.css"


export default function FolderPage() {

    const { folder_id } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user ? state.session.user : null)
    const folder = useSelector((state) => state.folders.folder ? state.folders.folder : null)
    const sets = useSelector((state) => Object.values(state.sets.allSets))
    // console.log("sets from store ",sets);
    const filteredSets = sets.filter((set) => set.folder_id === Number(folder_id))

    const history = useHistory();

    // console.log("this is the folder from the store", folder);

    useEffect(() => {
        // console.log("Hitting useEffect here");
        // dispatch(getAllFoldersThunk())
        dispatch(getOneFolderThunk(folder_id))
            .then(dispatch(getAllSetsThunk()))
    }, [dispatch, folder_id, sets.length])

    if (!Object.values(folder).length) {
        return <h3>Loading...</h3>
    }

    return (
        <>
            <div className="folder-page-container-div">
                <div className="folder-page-inner-div">
                    <div className="folder-page-header">
                        <h1>{folder.title} Sets</h1>
                        <h2>Folder Description: {folder.description}</h2>
                        {/* {console.log("folder from above",folder)} */}
                        {sessionUser?.id === folder?.user_id && <div className="folder-btns-div">
                            <div className="folder-page-header-info">
                                {/* <NavLink to="/new-set">Create a Set</NavLink> */}
                                <button className="log_out_button nav-button" onClick={() => history.push(`/edit-folder/${folder.id}`)}>Edit Folder</button>
                                <OpenModalButton id='delete-btn' buttonText='Delete Folder' modalComponent={<DeleteFormModal folderId={folder.id} />} />
                                <button className="log_out_button nav-button" onClick={() => dispatch(getOneFolderThunk(folder.id)).then(history.push(`/new-set`))}>Create a Set</button>
                                <button className="log_out_button nav-button" onClick={() => history.push(`/library`)}>Return to library</button>
                            </div>

                        </div>}
                        <hr />
                    </div>
                </div>
                <div className="set-cards-container-div">
                    <p className="set-text-small">
                        {folder?.sets.length && folder?.sets.length !== 0 ? `Total sets in folder: ${folder?.sets.length}` :

                            <>
                                <span className="no-sets">
                                    There are no sets in this folder...
                                </span>
                                <button className="log_out_button nav-button" onClick={() => dispatch(getOneFolderThunk(folder.id)).then(history.push(`/new-set`))}>Create a Set</button>
                            </>
                        }


                    </p>
                    <div className="set-cards-inner-div">
                        {filteredSets.reverse().map((set, idx) => (
                            <div className="set-card-container" key={idx}>
                                <div className="set-card-div">
                                    <Link className="nav-link-green bigger" to={`/folders/${folder_id}/sets/${set.id}`}>
                                        {set.title}
                                    </Link>
                                    <p className="set-text-small">{set.description}</p>
                                    <p className="set-text-small">Total Questions: {set?.questions.length===0?<span className="no-sets">&nbsp;None</span>:set?.questions.length}</p>
                                    {/* Created by {folder.user.username} */}
                                    {sessionUser?.id === folder?.user_id &&
                                        <>

                                            <div className="set-btns">
                                                <OpenModalButton id='edit-set-btn' buttonText='Edit Set' modalComponent={<EditSet folderId={folder.id} set={set} />} />

                                                <OpenModalButton id='delete-set-btn' buttonText='Delete Set' modalComponent={<DeleteSetModal folderId={folder.id} setId={set.id} />} />
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </>
    )
}
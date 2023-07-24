import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getAllFoldersThunk, getOneFolderThunk } from "../../store/folders"
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
        dispatch(getAllFoldersThunk())
            .then(dispatch(getOneFolderThunk(folder_id)))
            .then(dispatch(getAllSetsThunk()))
    }, [dispatch, folder_id])

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
                            {/* <NavLink to="/new-set">Create a Set</NavLink> */}
                            <button className="log_out_button nav-button" onClick={() => history.push(`/edit-folder/${folder.id}`)}>Edit Folder</button>
                            <button className="log_out_button nav-button"><OpenModalButton id='delete-btn' buttonText='Delete Folder' modalComponent={<DeleteFormModal folderId={folder.id} />} /></button>
                            <button className="log_out_button nav-button" onClick={() => dispatch(getOneFolderThunk(folder.id)).then(history.push(`/new-set`))}>Create a Set</button>
                            <button className="log_out_button nav-button" onClick={() => history.push(`/library`)}>Return to library</button>

                        </div>}
                        <hr />
                    </div>
                </div>
                <div className="set-cards-container-div">
                    {folder?.sets.length && `Total sets in folder: ${folder.sets.length}`}
                    <div className="set-cards-inner-div">
                        {filteredSets.map((set, idx) => (
                            <div className="set-card-container" key={idx}>
                                <div className="set-card-div">
                                    <Link className="nav-link-green bigger" exact to={`/folders/${folder_id}/sets/${set.id}`}>
                                        {set.title}
                                    </Link>
                                    <p>{set.description}</p>
                                    <p>Total Questions: {set.questions.length}</p>
                                    {/* Created by {folder.user.username} */}
                                    {sessionUser?.id === folder?.user_id &&
                                        <>
                                            {/* <br /> */}
                                            <br />
                                            <div className="set-btns">
                                                <button className="log_out_button nav-button" ><OpenModalButton id='edit-set-btn' buttonText='Edit Set' modalComponent={<EditSet folderId={folder.id} set={set} />} /></button>
                                                &nbsp;
                                                <button className="log_out_button nav-button" ><OpenModalButton id='delete-set-btn' buttonText='Delete Set' modalComponent={<DeleteSetModal folderId={folder.id} setId={set.id} />} /></button>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
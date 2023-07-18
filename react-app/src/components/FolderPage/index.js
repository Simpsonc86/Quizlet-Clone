import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getOneFolderThunk } from "../../store/folders"
import { useEffect } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import DeleteFormModal from "../DeleteFormModal"


export default function FolderPage() {

    const { folder_id } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state)=>state.session.user?state.session.user:null)
    const folder = useSelector((state) => state.folders.folder ? state.folders.folder : null)
    const history = useHistory();

    // console.log("this is the folder from the store", folder);

    useEffect(() => {
        // console.log("Hitting useEffect here");
        dispatch(getOneFolderThunk(folder_id))
    }, [dispatch, folder_id])

    if (!Object.values(folder)) {
        return null
    }

    return (
        <>
            <h1>{folder.title} Sets</h1>
            {/* {console.log("folder from above",folder)} */}
            {sessionUser?.id===folder?.user_id&&<div>
                <button onClick={() => history.push(`/edit-folder/${folder.id}`)}>Edit Folder</button>
                <OpenModalButton id='delete-btn' buttonText='Delete Folder' modalComponent={<DeleteFormModal folderId={folder.id} />} />
                <button onClick={()=>dispatch(getOneFolderThunk(folder.id)).then(history.push(`/new-set`))}>Create a Set</button>
            </div>}
            <ul>
                {folder?.sets?.map((set, idx) => (
                    <li key={idx}>
                        <p><Link exact to={`folders/${folder_id}/sets/${set.id}`}>{set.title}</Link> Created by {folder.user.username}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}
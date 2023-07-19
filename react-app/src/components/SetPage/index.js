import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
// import { getAllFoldersThunk, getOneFolderThunk } from "../../store/folders"
import { useEffect } from "react"
// import { Link } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import DeleteSetModal from "../DeleteSetModal"
// import EditSet from "../EditSet"
import { getAllSetsThunk, getOneSetThunk } from "../../store/sets"
import { getOneFolderThunk } from "../../store/folders";


export default function SetPage(){

    const { folder_id,set_id } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user ? state.session.user : null)
    const folders = useSelector((state) => state.folders.allFolders)
    const folder = folders[folder_id]
    const sets = useSelector((state) => state.sets.allSets)
    const set = sets[set_id]
    // console.log("Set from the store",set);
    const history = useHistory();

    useEffect(() => {
        // console.log("Hitting useEffect here");
        dispatch(getAllSetsThunk())
        .then(dispatch(getAllSetsThunk()))
        .then(dispatch(getOneFolderThunk(folder_id)))
        .then(dispatch(getOneSetThunk(set_id)))
    }, [dispatch, folder_id,set_id])

    return(
        <>
            <h1>{set.title} Set</h1>
            {/* {console.log("folder from above",folder)} */}
            {sessionUser?.id === set?.user_id && <div>
                <button onClick={() => history.push(`/edit-set/${set.id}`)}>Edit Set</button>
                <OpenModalButton id='delete-set-btn' buttonText='Delete Set' modalComponent={<DeleteSetModal folderId={folder.id} setId={set.id} />} />
                <button onClick={() => history.push(`/folders/${folder.id}`)}>Back to folder</button>
                {/* <button onClick={() => dispatch(getOneSetThunk(set.id)).then(history.push(`/new-set`))}>Create a Set</button> */}
            </div>}

        </>
    )
}

{/* <ul>
{set?.questions?.map((question, idx) => (
    <li key={idx}>
        <p>
            <span>Question: {question.description} </span>

            {console.log("question object",question.answer.description)}
            <span>Answer: {question.answer.description}</span>
        </p>
    </li>
))}
</ul> */}
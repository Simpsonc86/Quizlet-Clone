import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
// import { getAllFoldersThunk, getOneFolderThunk } from "../../store/folders"
import { useEffect } from "react"
// import { Link } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import DeleteSetModal from "../DeleteSetModal"
import EditSet from "../EditSet"
import { getAllSetsThunk, getOneSetThunk } from "../../store/sets"
import { getAllFoldersThunk, getOneFolderThunk } from "../../store/folders";
import CreateQuestionModal from "../CreateQuestionModal";
import EditQuestionModal from "../EditQuestionModal";
import DeleteQuestionModal from "../DeleteQuestionModal";
import { getAllQuestionsThunk } from "../../store/questions";


export default function SetPage() {

    const { folder_id, set_id } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user ? state.session.user : null)
    const folders = useSelector((state) => state.folders.allFolders)
    const folder = folders[folder_id]
    const sets = useSelector((state) => state.sets.allSets)
    const set = sets[set_id]
    const questions = useSelector((state) => Object.values(state.questions.allQuestions))
    // console.log("Set from the store",set);
    const history = useHistory();

    useEffect(() => {
        // console.log("Hitting useEffect here");
        dispatch(getAllFoldersThunk())
            .then(dispatch(getAllSetsThunk()))
            .then(dispatch(getOneFolderThunk(folder_id)))
            .then(dispatch(getOneSetThunk(set_id)))
            .then(dispatch(getAllQuestionsThunk()))
    }, [dispatch, folder_id, set_id])

    if (!Object.values(sets).length || !Object.values(folders).length) {
        return <h1>Set details are loading...</h1>
    }

    return (
        <>
            <h1>{set.title} Set</h1>
            {/* {console.log("folder from above",folder)} */}
            {sessionUser?.id === set?.user_id && <div>
                <OpenModalButton id='edit-set-btn' buttonText='Edit Set' modalComponent={<EditSet folderId={folder.id} set={set} />} />
                <OpenModalButton id='delete-set-btn' buttonText='Delete Set' modalComponent={<DeleteSetModal folderId={folder.id} setId={set.id} />} />
                <button onClick={() => history.push(`/folders/${folder.id}`)}>Back to folder</button>
                {/* <button onClick={() => dispatch(getOneSetThunk(set.id)).then(history.push(`/new-set`))}>Create a Set</button> */}
            </div>}
            <ul>
                {questions?.map((question, idx) => {
                    if (question.set_id === set.id) {

                        return (

                            <li key={idx}>
                                <p>
                                    <span>Question: {question.description} </span>

                                    {/* {console.log("question object", question.answer)} */}
                                    <span>Answer: {question.answer}</span>
                                    {(sessionUser?.id === set?.user_id) &&
                                        <>
                                            <span>
                                                <OpenModalButton id='edit-question-btn' buttonText='Edit Question' modalComponent={<EditQuestionModal question={question} folderId={folder.id} set={set} />} />
                                            </span>
                                            <span>
                                                <OpenModalButton id='delete-question-btn' buttonText='Delete Question' modalComponent={<DeleteQuestionModal question={question} folderId={folder.id} set={set} />} />
                                            </span>
                                        </>
                                    }
                                </p>
                            </li>
                        )
                    }
                })}
            </ul>
            {sessionUser?.id === set?.user_id &&
                <div>
                    <OpenModalButton id='add-question-btn' buttonText='Add a Question' modalComponent={<CreateQuestionModal folderId={folder.id} setId={set.id} />} />
                </div>}

        </>
    )
}


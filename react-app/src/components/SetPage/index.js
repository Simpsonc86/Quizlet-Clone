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
import "./SetPage.css"
import { useState } from "react";


export default function SetPage() {

    const { folder_id, set_id } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user ? state.session.user : null)
    const folders = useSelector((state) => state.folders.allFolders)
    const folder = folders[Number(folder_id)]
    const sets = useSelector((state) => state.sets.allSets)
    console.log(sets);
    const set = sets[Number(set_id)]
    const questions = useSelector((state) => Object.values(state.questions.allQuestions))
    const setQuestions = questions.filter((question) => question.set_id === Number(set_id))
    console.log('questions array', setQuestions[0], ":    set id from params", set_id);
    // console.log("Set from the store",set);
    const history = useHistory();
    const [questionArrayIndex, setQuestionArrayIndex] = useState(0);

    useEffect(() => {
        console.log("Hitting useEffect here");
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
            <div className="set-page-container-div">

                <div className="set-page-inner-div">

                    <div className="set-page-header">

                        <h1>{set.title} Set</h1>
                        {/* {console.log("folder from above",folder)} */}
                        {sessionUser?.id === set?.user_id && <div className="set-btns-div">
                            <OpenModalButton id='edit-set-btn' buttonText='Edit Set' modalComponent={<EditSet folderId={folder.id} set={set} />} />
                            <OpenModalButton id='delete-set-btn' buttonText='Delete Set' modalComponent={<DeleteSetModal folderId={folder.id} setId={set.id} />} />
                            <button className="log_out_button nav-button" onClick={() => history.push(`/folders/${folder.id}`)}>Back to folder</button>
                            {/* <button onClick={() => dispatch(getOneSetThunk(set.id)).then(history.push(`/new-set`))}>Create a Set</button> */}
                        </div>}
                    </div>
                    <hr />
                    {set.questions.length && `Total Questions in Set: ${set.questions.length}`}
                    <div className="card-carousel-container">

                            <div className="card-counter">
                                {`Question ${questionArrayIndex + 1} of ${setQuestions.length}`}
                            </div>
                        <div className="card-flip-carosel-div">
                            <div className="card-flip-carosel">
                                <div className="card-text question">
                                    Question {questionArrayIndex+1}: {setQuestions[questionArrayIndex] && setQuestions[questionArrayIndex].description}
                                </div>
                                <div className="card-text answer">
                                    Answer: {setQuestions[questionArrayIndex] && setQuestions[questionArrayIndex].answer}
                                </div>
                            </div>
                        </div>
                            <span className="carousel-btns">

                                <button className="carousel-btn-left" onClick={() => {
                                    console.log("value of questionArrayIndex:", questionArrayIndex);
                                    questionArrayIndex <= 0 ? setQuestionArrayIndex(0) : setQuestionArrayIndex(questionArrayIndex - 1)
                                }}>{"<"}</button>
                                &nbsp;
                                <button className="carousel-btn-right" onClick={() => {
                                    console.log("value of questionArrayIndex:", questionArrayIndex);
                                    questionArrayIndex >= setQuestions.length - 1 ? setQuestionArrayIndex(setQuestions.length - 1) : setQuestionArrayIndex(questionArrayIndex + 1)
                                }}>{">"}</button>
                            </span>
                    </div>
                    <hr />
                    <ol className="questions-inner-div">
                        {questions?.map((question, idx) => {
                            if (question.set_id === set.id) {

                                return (

                                    <li key={idx}>
                                        <p className="question-card-div">
                                            <div className="question-text-div">
                                                <div className="question-info-div">


                                                    <span className="question-text">Question: {question.description} </span>

                                                    {/* {console.log("question object", question.answer)} */}
                                                    {/* <br /> */}
                                                    &nbsp;
                                                    <div>

                                                        <span >{"Hover to Reveal Answer --->"}</span>
                                                        <span className="answer-text" >{"     "}{"   " + question.answer + "   "} </span>
                                                        <span>{"<---"}</span>
                                                    </div>
                                                </div>

                                                <div className="question-btns">
                                                    {(sessionUser?.id === set?.user_id) &&
                                                        <>
                                                            <span>
                                                                <OpenModalButton id='edit-question-btn' buttonText='Edit' modalComponent={<EditQuestionModal question={question} folderId={folder.id} set={set} />} />
                                                            </span>
                                                            <span>
                                                                <OpenModalButton id='delete-question-btn' buttonText='Delete' modalComponent={<DeleteQuestionModal question={question} folderId={folder.id} set={set} />} />
                                                            </span>
                                                        </>
                                                    }
                                                </div>
                                            </div>

                                        </p>
                                    </li>
                                )
                            } else return null
                        })}
                    </ol>
                    {sessionUser?.id === set?.user_id &&
                        <div className="add-question-btn">
                            <OpenModalButton id='add-question-btn' buttonText='Add a Question' modalComponent={<CreateQuestionModal folderId={folder.id} setId={set.id} />} />
                        </div>}

                </div>
            </div>
        </>
    )
}


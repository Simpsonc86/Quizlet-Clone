import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
// import { useHistory } from "react-router-dom";
// import {  getAllSetsThunk, getOneSetThunk } from "../../store/sets";
import { editQuestionThunk,getOneQuestionThunk } from "../../store/questions";
// import { getAllSetsThunk, getOneSetThunk } from "../../store/sets";


export default function EditQuestionModal({ question,set, folderId }) {
    const dispatch = useDispatch();
    // const history = useHistory();
    const { closeModal } = useModal();
    const [description, setDescription] = useState(question.description);
    const [answer, setAnswer] = useState(question.answer);
    // const [favorite, setFavorite] = useState("no");
    const [errors, setErrors] = useState([]);
    const favorite = "no"

    // useEffect(()=>{
    //     dispatch(getOneQuestiontThunk(set.id))
    //     },[dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errObj = {};
        if (!description.length || description.length < 3) errObj.description = "Description length of 3 or more is required"
        if (description.length > 2000) errObj.description = "Description length of 2000 or less is required"
        if (!answer.length || answer.length < 1) errObj.answer = "Answer length of 1 or more is required"
        if (answer.length > 2000) errObj.answer = "Answer length of 2000 or less is required"

       
        if (!Object.values(errObj).length) {
            const editQuestion = {
                id:question.id,
                set_id: set.id,
                description,
                answer,
                favorite,

            }

            // console.log("This is the created folder", folder)
            await dispatch(editQuestionThunk(editQuestion))
            await (dispatch(getOneQuestionThunk(editQuestion.set_id)))
            .then(closeModal())

            // history.push(`/folders/${folderId}/set/${set.id}`)
        } else setErrors(errObj)
    };

    return (
        <div>
            <h1>Type your question and answer</h1>
            {/* <p>Are you sure you want to delete this folder?</p> */}
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.description && <p>{errors.description}</p>}
                    {errors.answer && <p>{errors.answer}</p>}
                </ul>
                <label>
                    Question
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Answer
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        required
                    />
                </label>
                <div>
                    <button type="submit">Edit (Modify Question)</button>
                    <button onClick={closeModal}>Cancel (Back to Set)</button>

                </div>
            </form>
        </div>
    )
}
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
            <div className="create-form-container">

             
                <form className="create-form" onSubmit={handleSubmit}>
                    <h1>Type a Question and Answer</h1>
                    <ul>
                        {errors.description && <p className="validation-errors">{errors.description}</p>}
                        {errors.answer && <p className="validation-errors">{errors.answer}</p>}
                    </ul>
                    <div className="form-inputs">
                        <label>
                            Question
                        </label>

                        <textarea
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <br />
                    <div className="form-inputs">

                        <label>
                            Answer
                        </label>
                        <textarea
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            required
                        />
                    </div>
                    &nbsp;
                    <button className="log_out_button nav-button" type="submit">Yes (Create Question)</button>
                    &nbsp;
                    <br />
                    <button className="log_out_button nav-button" onClick={closeModal}>No (Back to Set)</button>
                    &nbsp;
                    <br />

                    {/* </div> */}
                </form>
            </div>
        </div>
    )
}
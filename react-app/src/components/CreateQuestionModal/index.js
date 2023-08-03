import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
// import { useHistory } from "react-router-dom";
// import {getAllSetsThunk } from "../../store/sets";
import { createQuestionThunk } from "../../store/questions";
import "./CreateQuestionModal.css"


export default function CreateQuestionModal({ setId, folderId }) {
    const dispatch = useDispatch();
    // const history = useHistory();
    const { closeModal } = useModal();
    const [description, setDescription] = useState("");
    const [answer, setAnswer] = useState("");
    // const [favorite, setFavorite] = useState("no");
    const [errors, setErrors] = useState([]);
    const favorite = "no";

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errObj = {};
        if (!description.length || description.length < 3) errObj.description = "Description length of 3 or more is required"
        if (description.length > 2000) errObj.description = "Description length of 2000 or less is required"
        if (!answer.length || answer.length < 1) errObj.answer = "Answer length of 1 or more is required"
        if (answer.length > 2000) errObj.answer = "Answer length of 2000 or less is required"

        if (!Object.values(errObj).length) {
            const question = {
                set_id: setId,
                description,
                answer,
                favorite,

            }

            // console.log("This is the created folder", folder)
            await dispatch(createQuestionThunk(question))
                // .then(await dispatch(getAllSetsThunk()))
                .then(closeModal())

            // history.push(`/folders/${folderId}/set/${setId}`)
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
                        <label className="form-label">
                            Question
                        </label>

                        <textarea
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows={2}
                        />
                    </div>
                    <br />
                    <div className="form-inputs">

                        <label className="form-label">
                            Answer
                        </label>
                        <textarea
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            required
                            rows={2}
                        />
                    </div>
                    <br />
                    <button className="log_out_button nav-link" type="submit">Yes (Create Question)</button>
                    <br />
                    <button className="log_out_button nav-link" onClick={closeModal}>No (Back to Set)</button>
                    <br />

                    {/* </div> */}
                </form>
            </div>
        </div>
    )
}
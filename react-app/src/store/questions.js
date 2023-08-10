const GET_ALL_QUESTIONS = "GET_ALL_QUESTIONS"
const GET_ONE_QUESTION = "GET_ONE_QUESTION"
const CREATE_QUESTION = "CREATE_QUESTION"
const EDIT_QUESTION = "EDIT_QUESTION"
const DELETE_QUESTION = "DELETE_QUESTION"

const getAllQuestions = (questions) => ({
    type: GET_ALL_QUESTIONS,
    payload: questions
})
const getOneQuestion = (question) => ({
    type: GET_ONE_QUESTION,
    payload: question
})
const createQuestion = (question) => ({
    type: CREATE_QUESTION,
    payload: question
})
const editQuestion = (question) => ({
    type: EDIT_QUESTION,
    payload: question
})
const deleteQuestion = (question_id) => ({
    type: DELETE_QUESTION,
    payload:question_id

})

export const getAllQuestionsThunk = () => async (dispatch) => {
    const res = await fetch("/api/questions/", {
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.ok) {
        const questions = await res.json()
        dispatch(getAllQuestions(questions))
    }
}

export const getOneQuestionThunk = (question_id) => async (dispatch) => {
    const res = await fetch(`/api/questions/${question_id}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.ok) {
        const question = await res.json()
        dispatch(getOneQuestion(question))
    }
}

export const createQuestionThunk = (question) => async (dispatch) => {
    const res = await fetch(`/api/questions/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(question)
    });
    const resBody = await res.json();
    // console.log("resBody inside of the thunk=====>", resBody);
    if (res.ok) {
        const question = resBody;
        dispatch(createQuestion(question))
        return question;
    } else if (res.status < 500) {
        if (resBody.errors) {
            return { errors: resBody.errors }
        }
    } else {
        return { errors: ['Something bad happened!'] }
    }
}
export const deleteQuestionThunk = (question_id) => async (dispatch) => {
    const res = await fetch(`/api/questions/${question_id}/delete`, {
        method: "DELETE"
    })
    if (res.ok) {
        return dispatch(deleteQuestion(question_id))
    } else {
        // const error = await res.json();
        // console.log("bad data======>", error);
    }
}
export const editQuestionThunk = (question) => async (dispatch) => {
    const res = await fetch(`/api/questions/${question.id}/edit`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(question)
    });
    const resBody = await res.json();
    // console.log("resBody inside of the thunk=====>", resBody);
    if (res.ok) {
        const question = resBody;
        dispatch(editQuestion(question))
        return question;
    } else if (res.status < 500) {
        if (resBody.errors) {
            return { errors: resBody.errors }
        }
    } else {
        return { errors: ['Something bad happened!'] }
    }
}

const initialState = { allQuestions: {}, question: {} }

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_QUESTIONS:
            return { ...state, allQuestions: { ...action.payload } };
        case GET_ONE_QUESTION:
            return { ...state, question: { ...action.payload } };
        case CREATE_QUESTION:
            return { ...state, allQuestions:{...state.allQuestions,[action.payload.id]:action.payload},question: { ...action.payload } };
        case EDIT_QUESTION:
            return { ...state, allQuestions:{...state.allQuestions,[action.payload.id]:action.payload},question: { ...action.payload } };
            
        case DELETE_QUESTION:
            const currQuestion = state.allQuestions;
            delete currQuestion[action.payload]
            return { ...state, allQuestions:{...currQuestion}, question: {} };
        default:
            return state;
    }
}

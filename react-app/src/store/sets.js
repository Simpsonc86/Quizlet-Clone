const GET_ALL_SETS = "GET_ALL_SETS"
const GET_ONE_SET = "GET_ONE_SET"
const CREATE_SET = "CREATE_SET"
const EDIT_SET = "EDIT_SET"
const DELETE_SET = "DELETE_SET"

const getAllSets = (sets) => ({
    type: GET_ALL_SETS,
    payload: sets
})
const getOneSet = (set) => ({
    type: GET_ONE_SET,
    payload: set
})
const createSet = (set) => ({
    type: CREATE_SET,
    payload: set
})

const editSet = (set) => ({
    type: EDIT_SET,
    payload: set
})

const deleteSet = (set_id) => ({
    type: DELETE_SET,
    payload: set_id

})


export const getAllSetsThunk = () => async (dispatch) => {
    const res = await fetch("/api/sets/", {
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.ok) {
        const sets = await res.json()
        dispatch(getAllSets(sets))
    }
}

export const getOneSetThunk = (set_id) => async (dispatch) => {
    const res = await fetch(`/api/sets/${set_id}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.ok) {
        const set = await res.json()
        dispatch(getOneSet(set))
    }
}

export const createSetThunk = (set) => async (dispatch) => {
    const res = await fetch(`/api/sets/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(set)
    });
    const resBody = await res.json();
    // console.log("resBody inside of the thunk=====>", resBody);
    if (res.ok) {
        const set = resBody;
        dispatch(createSet(set))
        return set;
    } else if (res.status < 500) {
        if (resBody.errors) {
            return { errors: resBody.errors }
        }
    } else {
        return { errors: ['Something bad happened!'] }
    }
}
export const editSetThunk = (set) => async (dispatch) => {
    const res = await fetch(`/api/sets/${set.id}/edit`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(set)
    });
    const resBody = await res.json();
    // console.log("resBody inside of the thunk=====>", resBody);
    if (res.ok) {
        const set = resBody;
        dispatch(editSet(set))
        return set;
    } else if (res.status < 500) {
        if (resBody.errors) {
            return { errors: resBody.errors }
        }
    } else {
        return { errors: ['Something bad happened!'] }
    }
}
export const deleteSetThunk = (set_id) => async (dispatch) => {
    const res = await fetch(`/api/sets/${set_id}/delete`, {
        method: "DELETE"
    })
    if (res.ok) {
        return dispatch(deleteSet(set_id))
    } else {
        const error = await res.json();
        console.log("bad data======>", error);
    }
}

const initialState = { allSets: {}, set: {} }

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_SETS:
            return { ...state, allSets: { ...action.payload } };
        case GET_ONE_SET:
            return { ...state, set: { ...action.payload } };
        case CREATE_SET:
            return { ...state, set: { ...action.payload } };
        case EDIT_SET:
            return { ...state, allSets:{...state.allSets,[action.payload.id]:action.payload},set: { ...action.payload } };
        case DELETE_SET:
            const currSet = state.allSets;
            delete currSet[action.payload];
            return { ...state, allSets:{...currSet}, set: {} };
        default:
            return state;
    }
}
const GET_ALL_FOLDERS = "GET_ALL_FOLDERS"
const GET_ONE_FOLDER = "GET_ONE_FOLDER"

const getAllFolders = (folders) => ({
    type: GET_ALL_FOLDERS,
    payload: folders
})
const getOneFolder = (folders) => ({
    type: GET_ONE_FOLDER,
    payload: folders
})

export const getAllFoldersThunk = () => async(dispatch)=>{
    const res = await fetch("api/folders/", {
        headers: {
            "Content-Type":"application/json",
        },
    });
    if (res.ok){
        const folders = await res.json()
        dispatch(getAllFolders(folders))
    }
}
const initialState = {folders:{}, folder:{}}

export default function reducer(state = initialState, action){
    switch (action.type){
        case GET_ALL_FOLDERS:
            return {folders:{...action.payload},folder: {}};
        default:
            return state;
    }
}
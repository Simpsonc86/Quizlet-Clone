const GET_ALL_FOLDERS = "GET_ALL_FOLDERS"
const GET_ONE_FOLDER = "GET_ONE_FOLDER"

const getAllFolders = (folders) => ({
    type: GET_ALL_FOLDERS,
    payload: folders
})
const getOneFolder = (folder) => ({
    type: GET_ONE_FOLDER,
    payload: folder
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
export const getOneFolderThunk = (folder_id) => async(dispatch)=>{
    const res = await fetch(`api/folders/${folder_id}`, {
        headers: {
            "Content-Type":"application/json",
        },
    });
    if (res.ok){
        const folder = await res.json()
        dispatch(getOneFolder(folder))
    }
}
const initialState = {folders:{}, folder:{}}

export default function reducer(state = initialState, action){
    switch (action.type){
        case GET_ALL_FOLDERS:
            return {folders:{...action.payload},folder: {}};
        case GET_ONE_FOLDER:
            return {folders:{},folder: {...action.payload}};
        default:
            return state;
    }
}
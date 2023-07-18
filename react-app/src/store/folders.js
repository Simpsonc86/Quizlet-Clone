const GET_ALL_FOLDERS = "GET_ALL_FOLDERS"
const GET_ONE_FOLDER = "GET_ONE_FOLDER"
const CREATE_FOLDER = "CREATE_FOLDER"
const EDIT_FOLDER = "EDIT_FOLDER"
const DELETE_FOLDER = "DELETE_FOLDER"

const getAllFolders = (folders) => ({
    type: GET_ALL_FOLDERS,
    payload: folders
})
const getOneFolder = (folder) => ({
    type: GET_ONE_FOLDER,
    payload: folder
})
const createFolder = (folder) => ({
    type: CREATE_FOLDER,
    payload: folder
})
const editFolder = (folder) => ({
    type: EDIT_FOLDER,
    payload: folder
})
const deleteFolder = () => ({
    type: DELETE_FOLDER,
    
})

export const getAllFoldersThunk = () => async(dispatch)=>{
    const res = await fetch("/api/folders/", {
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
    const res = await fetch(`/api/folders/${folder_id}`, {
        headers: {
            "Content-Type":"application/json",
        },
    });
    if (res.ok){
        const folder = await res.json()
        dispatch(getOneFolder(folder))
    }
}

export const createFolderThunk = (folder) => async(dispatch)=>{
    const res = await fetch(`/api/folders/create`, {
        method:'POST',
        headers: {
            "Content-Type":"application/json",
        },
        body:JSON.stringify(folder)
    });
    const resBody = await res.json();
    console.log("resBody inside of the thunk=====>", resBody);
    if (res.ok){
        const folder = resBody;
        dispatch(createFolder(folder))
        return folder;
    } else if (res.status < 500){
        if(resBody.errors){
            return {errors:resBody.errors}
        }
    } else{
        return {errors: ['Something bad happened!']}
    }
}
export const editFolderThunk = (folder) => async(dispatch)=>{
    const res = await fetch(`/api/folders/${folder.id}/edit`, {
        method:'PUT',
        headers: {
            "Content-Type":"application/json",
        },
        body:JSON.stringify(folder)
    });
    const resBody = await res.json();
    console.log("resBody inside of the thunk=====>", resBody);
    if (res.ok){
        const folder = resBody;
        dispatch(editFolder(folder))
        return folder;
    } else if (res.status < 500){
        if(resBody.errors){
            return {errors:resBody.errors}
        }
    } else{
        return {errors: ['Something bad happened!']}, 400
    }
}
export const deleteFolderThunk = (folder)

const initialState = {allFolders:{}, folder:{}}

export default function reducer(state = initialState, action){
    switch (action.type){
        case GET_ALL_FOLDERS:
            return {...state,allFolders:{...action.payload}};
        case GET_ONE_FOLDER:
            return {...state,folder: {...action.payload}};
        case CREATE_FOLDER:
            return {...state,folder: {...action.payload}};
        case EDIT_FOLDER:
            return {...state,folder: {...action.payload}};
        default:
            return state;
    }
}
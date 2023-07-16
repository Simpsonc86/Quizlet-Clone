import { useSelector,useDispatch } from "react-redux"
import { useEffect } from "react"
import { NavLink } from "react-router-dom/cjs/react-router-dom"
import { getAllFoldersThunk } from "../../store/folders"

export default function Dashboard() {

    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user ? state.session.user : [])
    const allFolders = useSelector((state) => {
        // console.log("state from the store---->",state.folders.folders)
        return state.folders.allFolders ? Object.values(state.folders.allFolders) : []
    })
    allFolders && console.log("Current users folders",allFolders);

    useEffect(() => {
        dispatch(getAllFoldersThunk());
    }, [dispatch]);


    const userFolders = allFolders.filter(folder => folder.user_id === sessionUser.id)
    return (
        <>
            <h1>Dashboard</h1>
            <NavLink to="/new_folder">Create a new folder</NavLink>
            <div>
                {userFolders.map((folder, index) => (
                    <NavLink key={index} to={`/folder/${folder.id}`}>
                        <div>
                            <h2>{folder.title}</h2>
                        </div>
                    </NavLink>
                ))}
            </div>


        </>
    )
}
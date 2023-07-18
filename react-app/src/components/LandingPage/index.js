import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllFoldersThunk } from "../../store/folders"
import { NavLink } from "react-router-dom"

export default function LandingPage() {
    const allFolders = useSelector((state) => state.folders.allFolders ? Object.values(state.folders.allFolders) : [])
    const dispatch = useDispatch()

    const publicFolders = allFolders.filter((folder) => folder.is_public === true).slice(-3)

    useEffect(() => {
        dispatch(getAllFoldersThunk())
    }, [dispatch])
    return (
        <>
            <h1>This is the LandingPage</h1>

            <h2>Most recent Folders</h2>
            {publicFolders.reverse().map((folder,idx)=>(
                <NavLink key={idx} to={`/folders/${folder.id}`}> 
                    <h2>{folder.title}</h2>
                    <p>{folder.description}</p>
                    <p>Number of sets in folder:{folder.sets.length}</p>
                </NavLink>
            ))}
        </>
    )
}
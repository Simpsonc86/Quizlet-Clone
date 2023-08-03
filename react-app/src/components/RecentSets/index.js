import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { getAllFoldersThunk, getOneFolderThunk } from "../../store/folders"
import { NavLink } from "react-router-dom"
import OpenModalButton from "../OpenModalButton"
// import DeleteFormModal from "../DeleteFormModal"
import { getAllSetsThunk } from "../../store/sets"
import "../Library/Library.css"
import DeleteSetModal from "../DeleteSetModal"
import EditSet from "../EditSet"

export default function RecentSets() {
    const sessionUser = useSelector((state) => state.session.user)
    const allSets = useSelector((state) => Object.values(state.sets.allSets))
    const dispatch = useDispatch()
    // const history = useHistory()


    const recent = allSets.slice(-6)

    useEffect(() => {
        dispatch(getAllSetsThunk())
    }, [dispatch])

    if (!Object.values(allSets).length) {
        return <h1>Sets are loading...</h1>
    }
    const manageSet = (set) => {
        return ((sessionUser?.id === set.user_id) &&
            <div className="folder-card-div">
                    <OpenModalButton id='edit-set-btn' buttonText='Edit Set' modalComponent={<EditSet folderId={set.folder_id} set={set} />} />
                
                <OpenModalButton id='delete-btn' buttonText='Delete set' modalComponent={<DeleteSetModal setId={set.id} />} />
                {/* <button onClick={()=>dispatch(getOneSetThunk(set.id)).then(history.push(`/new-set`))}>Create a Set</button> */}
            </div>
        )
    }

    const renderMap = () => {
        return (
            <div className="folder-user-details-div">
                {recent.reverse().map((set, idx) => (
                    <div className="folder-card-container" key={idx} >
                        <div className="folder-card-div">
                            <NavLink className="nav-link " to={`/folders/${set.folder_id}/sets/${set.id}`}>
                                <h2>{set.title}</h2>
                                <p>{set.description}</p>
                                <p>Total Questions: {set.questions.length}</p>
                            </NavLink>
                            {manageSet(set)}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <>
            <div className="library-container-div">
                <div className="library-inner-div">
                    <h1>Most Recent Sets</h1>
                    <div className="header">
                        {renderMap()}
                    </div>
                </div>
            </div>
        </>
    )

}
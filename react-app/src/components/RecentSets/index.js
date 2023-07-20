import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { getAllFoldersThunk, getOneFolderThunk } from "../../store/folders"
import { NavLink, useHistory } from "react-router-dom"
import OpenModalButton from "../OpenModalButton"
import DeleteFormModal from "../DeleteFormModal"
import { getAllSetsThunk,getOneSetThunk } from "../../store/sets"

export default function RecentSets(){
    const sessionUser = useSelector((state) => state.session.user)
    const allSets = useSelector((state) => Object.values(state.sets.allSets))
    const dispatch = useDispatch()
    const history = useHistory()

    
    const recent = allSets.slice(-6)

    useEffect(() => {
        dispatch(getAllSetsThunk())
    }, [dispatch])

    if (!Object.values(allSets).length) {
        return <h1>Sets are loading...</h1>
    }
    const manageSet = (set) => {
        return ((sessionUser?.id === set.user_id) &&
            <div>
                
                <button onClick={() => history.push(`/edit-set/${set.id}`)}>Edit set</button>
                <OpenModalButton id='delete-btn' buttonText='Delete set' modalComponent={<DeleteFormModal setId={set.id} />} />
                <button onClick={()=>dispatch(getOneSetThunk(set.id)).then(history.push(`/new-set`))}>Create a Set</button>
            </div>
        )
    }

    const renderMap = () => {
        return (
            recent.reverse().map((set, idx) => (
                <div key={idx} >
                    <NavLink to={`/sets/${set.id}`}>
                        <h2>{set.title}</h2>
                        <p>{set.description}</p>
                        <p>Number of questions in set:{set.questions.length}</p>
                    </NavLink>
                    {manageSet(set)}
                </div>
            )))
    }

    return (
        <>
            <h1>Most Recent Sets</h1>
            {renderMap()}
        </>
    )

}
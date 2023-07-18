import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getOneFolderThunk } from "../../store/folders"
import { useEffect } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function FolderPage() {

    const { folder_id } = useParams();
    const dispatch = useDispatch();
    const folder = useSelector((state) => state.folders.folder?state.folders.folder:null)
    // const history = useHistory();
    
    // console.log("this is the folder from the store", folder);

    useEffect(() => {    
        // console.log("Hitting useEffect here");
        dispatch(getOneFolderThunk(folder_id))
    }, [dispatch, folder_id])
    
    if(!Object.values(folder)){
        return null
    }

    return (
        <>
            <h1>{folder.title} Sets</h1>
            {/* {console.log("folder from above",folder)} */}
           <ul>
                {folder?.sets?.map((set, idx) => (
                    <li key={idx}>                        
                        <p><Link to={`folders/${folder_id}/sets/${set.id}`}>{set.title}</Link> Created by {folder.user.username}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { getAllFoldersThunk, getOneFolderThunk } from "../../store/folders"
import { useEffect } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min";


export default function FolderPage() {

    const { folder_id } = useParams();
    // const history = useHistory();
    const dispatch = useDispatch();

    const folder = useSelector((state) => state.folders.folder)

    console.log(folder);
    useEffect(() => {
        dispatch(getAllFoldersThunk())
            .then(dispatch(getOneFolderThunk(folder_id)))

    }, [dispatch, folder_id])

    return (
        <>
            <h1>{folder.title} Sets</h1>
            <ul>
                {folder.sets.map((set, idx) => (
                    <div key={idx}>
                        <Link to={`folders/${folder_id}/sets/${set.id}`}>{set.title}</Link>
                        <p>Created by {folder.user.username}</p>
                    </div>
                ))}
            </ul>

        </>
    )
}
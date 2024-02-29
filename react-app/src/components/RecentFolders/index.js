import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFoldersThunk, getOneFolderThunk } from "../../store/folders";
import { NavLink, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteFormModal from "../DeleteFormModal";
import "../Library/Library.css";

export default function RecentFolders() {
  const sessionUser = useSelector((state) => state.session.user);
  const allFolders = useSelector((state) =>
    state.folders.allFolders ? Object.values(state.folders.allFolders) : []
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const publicFolders = allFolders.filter(
    (folder) => folder.is_public === "yes"
  );
  const recent = publicFolders.slice(-3);

  useEffect(() => {
    dispatch(getAllFoldersThunk());
  }, [dispatch]);

  if (!Object.values(allFolders).length) {
    return <h1>Folders are loading...</h1>;
  }
  const manageFolder = (folder) => {
    return (
      sessionUser?.id === folder.user_id && (
        <div className="folder-card-div">
          <button
            className="log_out_button nav-button"
            onClick={() => history.push(`/edit-folder/${folder.id}`)}
          >
            Edit Folder
          </button>

          <button
            className="log_out_button nav-button"
            onClick={() =>
              dispatch(getOneFolderThunk(folder.id)).then(
                history.push(`/new-set`)
              )
            }
          >
            Create a Set
          </button>

          <br />
          <OpenModalButton
            id="delete-btn"
            buttonText="Delete Folder"
            modalComponent={<DeleteFormModal folderId={folder.id} />}
          />
        </div>
      )
    );
  };

  const renderMap = () => {
    return (
      <div className="folder-user-details-div">
        {recent.reverse().map((folder, idx) => (
          <div className="folder-card-container" key={idx}>
            <div className="folder-card-div">
              <NavLink className="nav-link" to={`/folders/${folder.id}`}>
                <h2>{folder.title}</h2>
                <p>{folder.description}</p>
                <p>
                  Sets in Folder:
                  {folder?.sets.length === 0 ? (
                    <span className="no-sets">&nbsp;None</span>
                  ) : (
                    folder?.sets.length
                  )}
                </p>
              </NavLink>
              <br />
              {manageFolder(folder)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="library-container-div">
        <div className="library-inner-div">
          <h1>
            <b>3</b> Most Recent Folders{" "}
          </h1>
          <div className="header">
            {/* <h2>Most recent Folders</h2> */}
            {renderMap()}
          </div>
        </div>
      </div>
    </>
  );
}

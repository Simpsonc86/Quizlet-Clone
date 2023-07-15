from flask import Blueprint,request
from flask_login import login_required, current_user
from app.models import Folder, db
from app.forms import FolderForm

folder_routes = Blueprint('folders', __name__)

@folder_routes.route("/")
def all_folders():
    '''
    Query for all folders and returns them in a list of dictionaries
    '''
    folders = Folder.query.all()
    folders_to_dict = [folder.to_dict() for folder in folders]
    return {folder["id"]:folder for folder in folders_to_dict}

@folder_routes.route("/<int:id>")
def get_folder_by_id(id):
    '''
    Query for one folder by id and return it in a dictionary 
    '''
    folder = Folder.query.get(id)
    return folder.to_dict()

@folder_routes.route("/new", methods=['POST'])
@login_required
def create_folder():
    '''
    Create a folder from the form 
    '''
    form = FolderForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    form.data["user_id"] = current_user.id
    if form.validate_on_submit():
        folder = Folder(
            user_id = current_user.to_dict()['id'],
            title = form.data['title'],
            description = form.data['description'],
            is_public = form.data['is_public'],
        )
         
        db.session.add(folder)
        db.session.commit()

        return folder.to_dict()
    return {'errors': ['Unauthorized']}, 401


from flask import Blueprint,request
from flask_login import login_required, current_user
from app.models import Folder, User, db
from app.forms.folder_form import FolderForm
from .auth_routes import validation_errors_to_error_messages

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

@folder_routes.route("/create", methods=['POST'])
@login_required
def create_folder():
    '''
    Create a folder from the form 
    '''    
    form = FolderForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    # print("form:  ",form.data)
    # print("form csrf", form["csrf_token"].data)
    if form.validate_on_submit():
        # print("Inside the validate on submit")

        # form.data["user_id"] = current_user.id
        folder = Folder(
            user_id = form.data["user_id"],
            title = form.data['title'],
            description = form.data['description'],
            is_public = form.data['is_public']
        )
            
        db.session.add(folder)
        db.session.commit()

        return folder.to_dict_without_sets_or_user()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    

@folder_routes.route("/<int:id>/edit", methods=["PUT"])
@login_required
def edit_folder(id):
    '''
    Edit a folder based on Id if user is authenticated
    '''
    form = FolderForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if current_user.is_authenticated:
        if form.valdate_on_submit():
            folder = Folder.query.get(id)
            if current_user.id == folder.user_id:
                folder.title = form.data["title"]
                folder.description = form.data["description"]
                folder.is_public = form.data["is_public"]

                db.session.commit()
                return folder.to_dict()
        return {'errors':['Unauthorized']}
    return{'errors':['Unauthenticated']}




@folder_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_folder(id):
    '''
    Delete a folder based on Id if user is authenticated
    '''
    if current_user.is_authenticated:
        folder = Folder.query.get(id)

        if folder:
            db.session.delete(folder)
            db.session.commit()
            return {"message":"folder deleted successfully"}
        else:{'errors':['Unauthorized']}
    
    else:{'errors':['Unauthenticated']}


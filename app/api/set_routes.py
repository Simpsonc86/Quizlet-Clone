from flask import Blueprint,request
from flask_login import login_required, current_user
from app.models import Set, User, db
from app.forms.folder_form import FolderForm
from app.forms.edit_folder_form import EditFolderForm
from .auth_routes import validation_errors_to_error_messages

set_routes = Blueprint('sets', __name__)

@set_routes.route("/")
def all_sets():
    '''
    Query for all sets and returns them in a list of dictionaries
    '''
    sets = Set.query.all()
    sets_to_dict = [set.to_dict() for set in sets]
    return {set["id"]:set for set in sets_to_dict}

@set_routes.route("/<int:id>")
def get_set_by_id(id):
    '''
    Query for one set by id and return it in a dictionary 
    '''
    set = Set.query.get(id)
    return set.to_dict()

@set_routes.route("/create", methods=['POST'])
@login_required
def create_folder():
    '''
    Create a set from the form 
    '''    
    form = FolderForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    # print("form:  ",form.data)
    # print("form csrf", form["csrf_token"].data)
    if form.validate_on_submit():
        # print("Inside the validate on submit")

        # form.data["user_id"] = current_user.id
        set = Set(
            user_id = form.data["user_id"],
            folder_id = form.data["folder_id"],
            title = form.data['title'],
            description = form.data['description'],
          
        )
            
        db.session.add(set)
        db.session.commit()

        return set.to_dict_without_sets_or_user()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    

@set_routes.route("/<int:id>/edit", methods=["PUT"])
@login_required
def edit_folder(id):
    '''
    Edit a set based on Id if user is authenticated
    '''
    form = EditFolderForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        set = Set.query.get(id)
        if current_user.id == set.user_id:
            set.title = form.data["title"]
            set.description = form.data["description"]
            set.is_public = form.data["is_public"]

            db.session.commit()
            return set.to_dict()
    return {'errors':['Unauthorized']}
    # return{'errors':['Unauthenticated']}


@set_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_folder(id):
    '''
    Delete a folder based on Id if user is authenticated
    '''
    if current_user.is_authenticated:
        set = Set.query.get(id)

        if set:
            db.session.delete(set)
            db.session.commit()
            return {"message":"set deleted successfully"}
        else:{'errors':['Unauthorized']}
    
    else:{'errors':['Unauthenticated']}


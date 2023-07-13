from flask import Blueprint
# from flask_login import login_required, current_user
from app.models import Folder

folder_routes = Blueprint('folders', __name__)

@folder_routes.route("/")
def all_folders():
    folders = Folder.query.all()    
    folders_to_dict = [folder.to_dict() for folder in folders]
    return {folder["id"]:folder for folder in folders_to_dict}
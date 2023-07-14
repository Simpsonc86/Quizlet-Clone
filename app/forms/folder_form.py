from flask_wtf import FlaskForm
from wtforms import StringField , BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Folder

class FolderForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    is_public = BooleanField('Public', )
from flask_wtf import FlaskForm
from wtforms import StringField , BooleanField, SubmitField
from wtforms.validators import DataRequired
from app.models import Folder

class FolderForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    is_public = BooleanField('Public', validators=[DataRequired()] )
    submit = SubmitField("Submit")
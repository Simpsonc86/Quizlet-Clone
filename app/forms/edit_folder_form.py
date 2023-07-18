from flask_wtf import FlaskForm
from wtforms import StringField 
from wtforms.validators import DataRequired


class EditFolderForm(FlaskForm):
    # user_id = IntegerField("user_id")
    title = StringField('Title', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    is_public = StringField('Public', validators=[DataRequired()])
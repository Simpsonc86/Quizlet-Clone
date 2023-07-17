from flask_wtf import FlaskForm
from wtforms import StringField , BooleanField, SubmitField, IntegerField
from wtforms.validators import DataRequired


class FolderForm(FlaskForm):
    user_id = IntegerField("user_id")
    title = StringField('Title', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    is_public = BooleanField('Public', validators=[DataRequired()])
    # submit = SubmitField("Submit")
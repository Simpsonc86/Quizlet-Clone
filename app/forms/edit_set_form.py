from flask_wtf import FlaskForm
from wtforms import StringField , IntegerField
from wtforms.validators import DataRequired


class EditSetForm(FlaskForm):
    # user_id = IntegerField("user_id")
    # folder_id = IntegerField("user_id")
    title = StringField('Title', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    
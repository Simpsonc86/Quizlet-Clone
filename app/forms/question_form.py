from flask_wtf import FlaskForm
from wtforms import StringField , IntegerField
from wtforms.validators import DataRequired


class QuestionForm(FlaskForm):
    set_id = IntegerField("set_id")
    description = StringField('Description', validators=[DataRequired()])
    favorite = StringField('Favorite', validators=[DataRequired()])

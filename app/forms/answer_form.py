from flask_wtf import FlaskForm
from wtforms import StringField , IntegerField
from wtforms.validators import DataRequired


class AnswerForm(FlaskForm):
    question_id = IntegerField("question_id")
    description = StringField('Description', validators=[DataRequired()])
    
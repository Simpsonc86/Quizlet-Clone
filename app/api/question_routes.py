from flask import Blueprint,request
from flask_login import login_required, current_user
from app.models import Question, db
from app.forms.question_form import QuestionForm
from app.forms.edit_question_form import EditQuestionForm

from .auth_routes import validation_errors_to_error_messages

question_routes = Blueprint('question', __name__)

@question_routes.route("/")
def all_questions():
    '''
    Query for all questions and returns them in a list of dictionaries
    '''
    questions = Question.query.all()
    questions_to_dict = [question.to_dict() for question in questions]
    return {question["id"]:question for question in questions_to_dict}

@question_routes.route("/<int:id>")
def get_question_by_id(id):
    '''
    Query for one question by id and return it in a dictionary 
    '''
    question = Question.query.get(id)
    return question.to_dict()

@question_routes.route("/create", methods=['POST'])
@login_required
def create_question():
    '''
    Create a question from the form 
    '''    
    form = QuestionForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    # print("form:  ",form.data)
    # print("form csrf", form["csrf_token"].data)
    if form.validate_on_submit():
        # print("Inside the validate on submit")

        # form.data["user_id"] = current_user.id
        question = Question(
          
            set_id = form.data['set_id'],
            description = form.data['description'],
            answer = form.data['answer'],
            favorite = form.data['favorite'],
          
        )        
            
        db.session.add(question)       
        db.session.commit()

        return question.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@question_routes.route("/<int:id>/edit", methods=["PUT"])
@login_required
def edit_questions(id):
    '''
    Edit a question based on Id if user is authenticated
    '''
    form = EditQuestionForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        question = Question.query.get(id)
        
        question.description = form.data["description"]
        question.answer = form.data["answer"]
        db.session.commit()
        return question.to_dict()
    return {'errors':['Unauthorized']}

@question_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_question(id):
    '''
    Delete a Question based on Id if user is authenticated
    '''
    if current_user.is_authenticated:
        question = Question.query.get(id)

        if question:
            db.session.delete(question)
            db.session.commit()
            return {"message":"Question deleted successfully"}
        else:{'errors':['Unauthorized']}
    
    else:{'errors':['Unauthenticated']}
    
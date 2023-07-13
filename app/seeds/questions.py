from app.models import db, Question, environment, SCHEMA
from sqlalchemy.sql import text

def seed_questions():

    algq1= Question(set_id=1, description="Solve for x: 2x + 5 = 11")
    algq2= Question(set_id=1, description="Solve for x: 3x + 2 = 17")
    algq3= Question(set_id=1, description="Solve for x: 8x + 1 = 65")
    per1= Question(set_id=2, description="Which element has a symbol of O")
    per2= Question(set_id=2, description="Which element has a symbol o X")
    per3= Question(set_id=2, description="Which element has a symbol of Au")
    sl1= Question(set_id=3, description="Who won 6 titles and Finals MVP in the NBA with the Chicago Bulls")
    sl2= Question(set_id=3, description="Which team did Magic Johnson retire from the NBA with in 1992?")
    sl3= Question(set_id=3, description="Who won the 1999 world series?")
    st1= Question(set_id=4, description="What was the first state in the USA?")
    st2= Question(set_id=4, description="What was the last state in the USA?")
    st3= Question(set_id=4, description="What is the biggest state in the USA?")
    js1= Question(set_id=5, description="What is an array?")
    js2= Question(set_id=5, description="What is OOP?")
    js3= Question(set_id=5, description="How many primative data types are there in JS?")
    
    questions = [algq1, algq2, algq3, per1,per2,per3,sl1,sl2,sl3,st1,st2,st3,js1,js2,js3]

    _ = [db.session.add(question) for question in questions]
    db.session.commit()

def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM Questions"))
        
    db.session.commit()
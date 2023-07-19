from app.models import db, Question, environment, SCHEMA
from sqlalchemy.sql import text

def seed_questions():

    algq1= Question(set_id=1, description="Solve for x: 2x + 5 = 11", answer="3")
    algq2= Question(set_id=1, description="Solve for x: 3x + 2 = 17",answer="5")
    algq3= Question(set_id=1, description="Solve for x: 8x + 1 = 65",answer="8")
    per1= Question(set_id=2, description="Which element has a symbol of O",answer="Oxygen")
    per2= Question(set_id=2, description="Which element has a symbol o X", answer="Xenon")
    per3= Question(set_id=2, description="Which element has a symbol of Au", answer="Gold")
    sl1= Question(set_id=3, description="Who won 6 titles and Finals MVP in the NBA with the Chicago Bulls", answer="Michael Jordan")
    sl2= Question(set_id=3, description="Which team did Magic Johnson retire from the NBA with in 1992?",answer="Los Angeles Laker")
    sl3= Question(set_id=3, description="Who won the 1999 world series?",answer="New York Yankees")
    st1= Question(set_id=4, description="What was the first state in the USA?",answer="Virginia")
    st2= Question(set_id=4, description="What was the last state in the USA?",answer="Hawaii")
    st3= Question(set_id=4, description="What is the biggest state in the USA?",answer="Alaska")
    js1= Question(set_id=5, description="What is an array?",answer="An indexed collection of primatives or object")
    js2= Question(set_id=5, description="What is OOP?",answer="Object oriented programming")
    js3= Question(set_id=5, description="How many primative data types are there in JavaScript?",answer="8")
    
    questions = [algq1, algq2, algq3, per1,per2,per3,sl1,sl2,sl3,st1,st2,st3,js1,js2,js3]

    _ = [db.session.add(question) for question in questions]
    db.session.commit()

def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))
        
    db.session.commit()
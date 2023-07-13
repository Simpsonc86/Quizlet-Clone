from app.models import db, Answer, environment, SCHEMA
from sqlalchemy.sql import text

def seed_answers():

    algq1= Answer(question_id=1, description="3")
    algq2= Answer(question_id=2, description="5")
    algq3= Answer(question_id=3, description="8")
    per1= Answer(question_id=4, description="Oxygen")
    per2= Answer(question_id=5, description="Xenon")
    per3= Answer(question_id=6, description="Gold")
    sl1= Answer(question_id=7, description="Michael Jordan")
    sl2= Answer(question_id=8, description="Los Angeles Lakers")
    sl3= Answer(question_id=9, description="New York Yankees")
    st1= Answer(question_id=10, description="Virginia")
    st2= Answer(question_id=11, description="Hawaii")
    st3= Answer(question_id=12, description="Alaska")
    js1= Answer(question_id=13, description="a collection of primatives or objects")
    js2= Answer(question_id=14, description="Object oriented programming")
    js3= Answer(question_id=15, description="8")
    
    answers = [algq1, algq2, algq3, per1,per2,per3,sl1,sl2,sl3,st1,st2,st3,js1,js2,js3]

    _ = [db.session.add(answer) for answer in answers]
    db.session.commit()

def undo_answers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM Answers"))
        
    db.session.commit()
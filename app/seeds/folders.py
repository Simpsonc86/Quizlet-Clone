from app.models import db, Folder, environment, SCHEMA
from sqlalchemy.sql import text



def seed_folders():
    math = Folder(
        user_id=1, title="Math", description="A folder of math sets for everyone", is_public = True
    )
    science = Folder(
        user_id=1, title="Science", description="Science is the way. Study hard", is_public = True
    )
    sports = Folder(
        user_id=3, title="Sports", description="Trivia, trivia, trivia", is_public = True
    )
    history = Folder(
        user_id=2, title="History", description="All the knowledge of antiquity", is_public = True
    )
    computer_science = Folder(
        user_id=2, title="Computer Science", description="Coding terminalogy", is_public = True
    )

    db.session.add(math)
    db.session.add(science)
    db.session.add(sports)
    db.session.add(history)
    db.session.add(computer_science)
    db.session.commit()

def undo_folders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.folders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM folders"))
        
    db.session.commit()
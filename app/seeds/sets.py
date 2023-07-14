from app.models import db, Set, environment, SCHEMA
from sqlalchemy.sql import text

def seed_sets():
    algebra = Set(
        user_id=1, folder_id=1, title="Algebra - Variables", description="Prepare for the quiz on Monday"
    )
    periodic_table = Set(
        user_id=1, folder_id=2, title="Common Perodic Table Elements", description="Most common elements on earth"
    )
    sports_legends = Set(
        user_id=3, folder_id=3, title="90's Legends", description="Famous Sports Legends from the 90's"
    )
    states = Set(
        user_id=2, folder_id=4, title="US States", description="Quiz for all 50 states in the USA"
    )
    js = Set(
        user_id=2, folder_id=5, title="JavaScript", description="Beginner JavaScript"
    )

    db.session.add(algebra)
    db.session.add(periodic_table)
    db.session.add(sports_legends)
    db.session.add(states)
    db.session.add(js)
    db.session.commit()

def undo_sets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.sets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM sets"))
        
    db.session.commit()
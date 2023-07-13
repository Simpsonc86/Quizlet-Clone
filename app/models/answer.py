from .db import db, environment, SCHEMA, add_prefix_for_prod

class Answer(db.Model):
    __tablename__ = 'answers'

    if environment == "production":
        __table_args__ = {'schema':SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("questions.id")))
    description = db.Column(db.String(2000), nullable = False)
    

    def to_dict(self):
        return {
            "id":self.id,
            "question_id":self.question_id,
            "description":self.description,          
        }
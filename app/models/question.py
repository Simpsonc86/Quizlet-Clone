from .db import db, environment, SCHEMA, add_prefix_for_prod

class Question(db.Model):
    __tablename__ = 'questions'

    if environment == "production":
        __table_args__ = {'schema':SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    set_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("sets.id")))
    description = db.Column(db.String(2000), nullable = False)
    favorite = db.Column(db.String,nullable=False,default="no")

    #Relationship attributes
    set = db.relationship("Set", back_populates="questions")
    answer = db.relationship("Answer", back_populates="question", cascade="all, delete-orphan", uselist=False)
   


    def to_dict(self):
        return {
            "id":self.id,
            "set_id":self.set_id,
            "description":self.description,          
            "favorite":self.favorite,
            "answer":self.answer.to_dict()          
        }
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Question(db.Model):
    __tablename__ = 'Questions'

    if environment == "production":
        __table_args__ = {'schema':SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    set_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("Sets.id")))
    description = db.Column(db.String(2000), nullable = False)
    favorite = db.Column(db.Boolean,nullable=False,default=False)

    #Relationship attributes
    set = db.relationship("Set", backref=db.backref("questions", lazy=True))
    answer = db.relationship("Answer", backref="question", uselist=False)
   


    def to_dict(self):
        return {
            "id":self.id,
            "set_id":self.set_id,
            "description":self.description,          
            "favorite":self.favorite,          
        }